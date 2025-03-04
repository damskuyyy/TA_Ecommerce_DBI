import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Upload } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import io from "socket.io-client";
import UploadImageDiscuss from "@/components/ui/modals/uploadImageDiscuss";

const socket = io("https://7191-103-124-138-188.ngrok-free.app/", {
  path: "/api/socket",
});

interface User {
  id: string;
  name?: string;
}

interface Admin {
  id: string;
  username: string;
}

interface Message {
  id: string;
  content: string | undefined;
  user?: User;
  admin?: Admin;
  image: string | undefined;
  createdAt: string;
  status?: "pending" | "sent" | "failed";
}
interface Discussion {
  id: string;
  product: { id: string; name: string; variants: string[]; image: string[] };
  user: User;
  admin: Admin;
  messages: Message[];
}

export default function Discussion() {
  const [message, setMessage] = useState("");
  const [discussion, setDiscussion] = useState<Discussion[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] =
    useState<Discussion | null>(null);
  const [sendingMessages, setSendingMessages] = useState<string[]>([]); // Track sending messages by ID
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedDiscussion?.messages]);

  const fetchDiscussion = async () => {
    try {
      const response = await axios.get(`/api/discuss/get`);
      setDiscussion(response.data);
    } catch (error) {
      console.error("Gagal mengambil diskusi:", error);
    }
  };

  useEffect(() => {
    fetchDiscussion();
  }, []);

  useEffect(() => {
    if (selectedDiscussion) {
      const updatedDiscussion = discussion.find(
        (d) => d.id === selectedDiscussion.id
      );
      if (updatedDiscussion) {
        setSelectedDiscussion(updatedDiscussion);
      }
    }
  }, [discussion]);

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      setSelectedDiscussion((prev) => {
        console.log("prev: ", prev);
        if (!prev || prev.id !== newMessage.id) return prev;
        if (prev.messages.some((msg) => msg.id === newMessage.id)) return prev;
        return { ...prev, messages: [...prev.messages, newMessage] };
      });
      fetchDiscussion();
    };

    socket.on("chatMessage", handleNewMessage);
    return () => socket.off("chatMessage", handleNewMessage);
  }, []);

  const sendMessage = async () => {
    if (
      (!message.trim() && image.length === 0) ||
      !selectedDiscussion ||
      !session?.user?.id
    )
      return;

    const tempId = `temp-${Date.now()}`;
    let base64Image: string | null = null;

    if (image.length > 0) {
      base64Image = await convertFileToBase64(image[0]);
    }

    const tempMessage: Message = {
      id: tempId,
      content: message || (base64Image ? "[Gambar]" : undefined),
      image: base64Image || undefined,
      admin: session.user.id,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    setSendingMessages((prev) => [...prev, tempId]); // Add the message ID to the sending list

    setSelectedDiscussion((prev) =>
      prev ? { ...prev, messages: [...prev.messages, tempMessage] } : prev
    );
    setMessage("");
    setImage([]); // Kosongkan gambar setelah mengirim

    try {
      const response = await axios.post("/api/discuss/post/admin", {
        discussionId: selectedDiscussion.id,
        adminId: session.user.id,
        content: message.trim() ? message : null,
        image: base64Image ? base64Image : null,
      });

      if (!response.data || !response.data.messages) return;

      const newMessage = {
        ...response.data.messages[response.data.messages.length - 1],
        admin: { id: session.user.id, username: session.user.name },
      };

      setSelectedDiscussion((prev) =>
        prev
          ? {
              ...prev,
              messages: prev.messages.map((msg) =>
                msg.id === tempId ? { ...newMessage, status: "sent" } : msg
              ),
            }
          : prev
      );

      setTimeout(() => {
        fetchDiscussion();
        socket.emit("chatMessage", newMessage);
      }, 500);
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      setSelectedDiscussion((prev) =>
        prev
          ? {
              ...prev,
              messages: prev.messages.map((msg) =>
                msg.id === tempId ? { ...msg, status: "failed" } : msg
              ),
            }
          : prev
      );
    } finally {
      setSendingMessages((prev) => prev.filter((id) => id !== tempId)); // Remove message from sending list
    }
  };

  const handleUploadImage = async () => {
    if (image.length > 0) {
      setIsModalOpen(false);
      sendMessage();
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="flex h-screen flex-col p-5 gap-6">
      <h1 className="text-4xl font-bold">Discussions</h1>
      <div className="flex-1 flex border rounded-lg overflow-hidden">
        <aside className="w-1/4 bg-white p-4 border-r">
          <ScrollArea className="space-y-2">
            {discussion.map((d) => (
              <div
                key={d.id}
                onClick={() => setSelectedDiscussion(d)}
                className="p-2 rounded-lg cursor-pointer hover:bg-gray-200"
              >
                <p className="font-medium">{d.user.name}</p>
                <p className="text-sm text-gray-500">
                  {d.messages[d.messages.length - 1]?.content ||
                    "Belum ada pesan"}
                </p>
              </div>
            ))}
          </ScrollArea>
        </aside>

        <main className="flex-1 flex flex-col bg-gray-200 p-2">
          {selectedDiscussion ? (
            <>
              <Card className="p-4 flex items-center">
                <p className="font-semibold">
                  {selectedDiscussion.product.name}
                </p>
              </Card>
              <ScrollArea className="flex-1 overflow-y-auto p-2">
                {selectedDiscussion.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg?.admin ? "justify-end" : "justify-start"
                    } mb-2`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        msg?.admin
                          ? "bg-gray-900 text-white rounded-br-none"
                          : "bg-white text-gray-900 rounded-bl-none"
                      }`}
                    >
                      {msg.image ? (
                        <img
                          src={msg.image}
                          alt="Gambar"
                          className="rounded-lg max-w-xs"
                        />
                      ) : (
                        msg.content
                      )}
                      {msg.status === "pending" && (
                        <p className="text-sm text-gray-400">Mengirim...</p>
                      )}
                      {sendingMessages.includes(msg.id) && "Mengirim..."}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </ScrollArea>
              <div className="flex items-center bg-transparent px-2 py-1">
                <div className="h-14 flex gap-3 rounded-full flex-1 items-center bg-white px-6 shadow-md">
                  <Input
                    type="text"
                    placeholder="Tulis Pesan..."
                    className="flex-1 border-none focus:ring-0 rounded-full text-gray-900"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button
                    size={"sm"}
                    variant={"ghost"}
                    className="bg-transparent"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    <Upload />
                  </Button>
                </div>
                <Button
                  className="ml-2 p-3 bg-gray-900 text-white rounded-full"
                  onClick={sendMessage}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">
              Pilih diskusi untuk melihat pesan
            </p>
          )}

          <UploadImageDiscuss
            handleUploadImage={handleUploadImage}
            image={image}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            setImage={setImage}
          />
        </main>
      </div>
    </div>
  );
}
