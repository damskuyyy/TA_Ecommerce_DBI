import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreVertical, Send, Upload } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";

const users = [
  { name: "Nama Pengguna", message: "Isi chat" },
  { name: "Nama Pengguna", message: "Isi chat" },
  { name: "Nama Pengguna", message: "Isi chat" },
  { name: "Nama Pengguna", message: "Isi chat" },
];

const messages = [
  { sender: "user", text: "Lorem ipsum dolor sit amet consectetur. Quisque a mauris neque" },
  { sender: "user", text: "Lorem ipsum dolor sit amet consectetur. Quisque a mauris neque commodo convallis nisi suspendisse pellentesque." },
  { sender: "admin", text: "Semper nisi orci integer rhoncus purus massa interdum sed. Magna dui purus neque tempus dolor. Turpis quis maecenas" },
  { sender: "admin", text: "Semper nisi orci integer rhoncus purus massa interdum." },
  { sender: "admin", text: "Semper nisi orci integer rhoncus purus massa interdum." },
  { sender: "admin", text: "Semper nisi orci integer rhoncus purus massa interdum." },
  { sender: "admin", text: "Semper nisi orci integer rhoncus purus massa interdum." },
  { sender: "admin", text: "Semper nisi orci integer rhoncus purus massa interdum." },
  { sender: "admin", text: "Semper nisi orci integer rhoncus purus massa interdum." },
  { sender: "admin", text: "Semper nisi orci integer rhoncus purus massa interdum." },
];

export default function Discussion() {
  const [chat, setChat] = useState(""); //state management

  const sendMessage = () => { //state chat
    if (chat.trim() !== "") {
      console.log("Message Sent:", chat);
      setChat("");
    }
  };

  return (
    <div className="flex h-screen flex-col p-5 gap-6"> 
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Discussions</h1> 
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">DBI</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold">Discussions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex flex-1 rounded-lg overflow-hidden border">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white p-4 border-r">
          <ScrollArea className="space-y-2">
            {users.map((user, index) => (
              <div key={index} className="flex items-center p-2 rounded-lg hover:bg-gray-900 cursor-pointer text-gray-900 hover:text-white mb-2 gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-300">{user.message}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="font-semibold bg-gray-100">Delete</DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-500">Unread Message</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </ScrollArea>
        </aside>

        {/* Chat Section */}
        <main className="flex-1 flex flex-col bg-gray-200 p-2 gap-1">
          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Nama Produk</p>
                <p className="text-sm text-gray-500">Variant</p>
              </div>
            </div>
          </Card>
          <ScrollArea className="overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"} mb-2`}>
                <div className={`max-w-md px-4 py-2 rounded-lg ${msg.sender === "admin" ? "bg-gray-900 text-white rounded-br-none" : "bg-white text-gray-900 rounded-bl-none"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex items-center bg-transparent">
            <div className="h-14 flex gap-2 rounded-full flex-1 items-center bg-white px-6 ">
              <Input
                type="text"
                placeholder="Tulis Pesan"
                className="flex-1 p-2 border-none focus:stroke-none rounded-full shadow-none"
                value={chat}
                onChange={(e) => setChat(e.target.value)}
              />
              <Input id="uploadfile" type="file" className="hidden" />

              {/* label untuk upload */}
              <Label htmlFor="uploadfile">
                <Upload className="h-5 w-5" />
              </Label>
            </div>
            <Button className="ml-2 p-2 bg-gray-900 text-white rounded-full" onClick={sendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
