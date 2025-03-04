import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useProductStore } from "@/store/product";
import io from "socket.io-client";

const socket = io("https://7191-103-124-138-188.ngrok-free.app/", {
  path: "/api/socket",
});

interface User {
  id: string;
  name?: string;
}

interface Message {
  id: string;
  content: string;
  user: User;
  createdAt: string;
  status?: "pending" | "sent" | "failed";
}

interface Discussion {
  id: string;
  product: { id: string; name: string; variants: string[]; image: string[] };
  messages: Message[];
}

export default function Discuss() {
  const [selectedDiscussion, setSelectedDiscussion] =
    useState<Discussion | null>(null);
  const { data: session } = useSession();
  const { selectedProduct } = useProductStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedDiscussion?.messages]);

  const fetchDiscussion = async () => {
    if (!session?.user?.id || !selectedProduct?.id) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `/api/discuss/get?userId=${session.user.id}&productId=${selectedProduct.id}`
      );
      setSelectedDiscussion(response.data[0] || null);
    } catch (error) {
      console.error("Gagal mengambil diskusi:", error);
      setSelectedDiscussion(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussion();
  }, [session?.user?.id, selectedProduct?.id]);

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      setSelectedDiscussion((prev) => {
        if (!prev) return prev;
        if (prev.messages.some((msg) => msg.id === newMessage.id)) return prev;
        return { ...prev, messages: [...prev.messages, newMessage] };
      });
    };

    socket.on("chatMessage", handleNewMessage);
    return () => socket.off("chatMessage", handleNewMessage);
  }, []);

  const sendMessage = async () => {
    if (!message.trim() || !selectedProduct || !session?.user?.id) return;

    const tempId = `temp-${Date.now()}`;
    const tempMessage: Message = {
      id: tempId,
      content: message,
      user: { id: session.user.id, name: session.user.name || "Anda" },
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    // ✅ Tambahkan pesan sementara agar langsung muncul di UI
    setSelectedDiscussion((prev) => {
      if (!prev) {
        return {
          id: `temp-discussion-${Date.now()}`,
          product: selectedProduct,
          messages: [tempMessage],
        };
      }
      return { ...prev, messages: [...prev.messages, tempMessage] };
    });

    setMessage(""); // Kosongkan input setelah mengirim

    try {
      const response = await axios.post("/api/discuss/post/user", {
        userId: session.user.id,
        productId: selectedProduct.id,
        content: message,
      });

      if (!response.data) {
        console.error("Data API tidak valid:", response.data);
        return;
      }

      const newMessage = {
        ...response.data.messages[response.data.messages.length - 1],
        user: { id: session.user.id, name: session.user.name },
      };

      // ✅ Tunggu 500ms agar "Mengirim..." terlihat sebelum fetch data
      setTimeout(() => {
        fetchDiscussion(); // Refresh diskusi setelah pesan berhasil dikirim
        socket.emit("chatMessage", newMessage);
      }, 500);
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);

      // ✅ Tandai sebagai failed jika gagal
      setSelectedDiscussion((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: prev.messages.map((msg) =>
            msg.id === tempId ? { ...msg, status: "failed" } : msg
          ),
        };
      });
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-gray-200 p-2 gap-1">
      {selectedProduct ? (
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={selectedProduct.image?.[0] || ""}
                alt="Produk"
              />
              <AvatarFallback>PD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">
                {selectedProduct.name || "Nama Produk"}
              </p>
              <p className="text-sm text-gray-500">
                {selectedProduct.variant || "Variant"}
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <p>Loading...</p>
      )}

      <ScrollArea className="flex-1 overflow-y-auto p-2">
        {selectedDiscussion?.messages?.length ? (
          selectedDiscussion.messages
            .filter((msg) => msg.content)
            .map((msg) => {
              const isUserMessage = msg?.user?.id === session?.user?.id;

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isUserMessage ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`max-w-md px-4 py-2 rounded-lg ${
                      isUserMessage
                        ? "bg-gray-900 text-white rounded-br-none"
                        : "bg-white text-gray-900 rounded-bl-none"
                    }`}
                  >
                    {msg.status === "pending" ? "Mengirim..." : msg.content}
                  </div>
                </div>
              );
            })
        ) : (
          <p className="text-center text-gray-500">Belum ada pesan.</p>
        )}

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
        </div>
        <Button
          className="ml-2 p-3 bg-gray-900 text-white rounded-full"
          onClick={sendMessage}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </main>
  );
}
