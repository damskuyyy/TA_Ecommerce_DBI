import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Upload } from "lucide-react";
import React, { useState } from "react";

const messages = [
    { sender: "user", text: "Lorem ipsum dolor sit amet consectetur. Quisque a mauris neque" },
    { sender: "user", text: "Lorem ipsum dolor sit amet consectetur. Quisque a mauris neque commodo convallis nisi suspendisse pellentesque." },
    { sender: "admin", text: "Semper nisi orci integer rhoncus purus massa interdum sed. Magna dui purus neque tempus dolor. Turpis quis maecenas" },
    { sender: "admin", text: "Semper nisi orci integer rhoncus purus massa interdum." },
];

export default function Discuss() {
    const [chat, setChat] = useState(""); // State management

    const sendMessage = () => { // State chat
        if (chat.trim() !== "") {
            console.log("Message Sent:", chat);
            setChat("");
        }
    };

    return (
        <main className="flex-1 flex flex-col bg-gray-200 p-2 gap-1">
            {/* Header */}
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

            {/* Chat Messages */}
            <ScrollArea className="flex-1 overflow-y-auto p-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"} mb-2`}>
                        <div className={`max-w-md px-4 py-2 rounded-lg ${msg.sender === "admin" ? "bg-gray-900 text-white rounded-br-none" : "bg-white text-gray-900 rounded-bl-none"}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </ScrollArea>

            {/* Input Chat */}
            <div className="flex items-center bg-transparent">
                <div className="h-14 flex gap-2 rounded-full flex-1 items-center bg-white px-6">
                    <Input
                        type="text"
                        placeholder="Tulis Pesan"
                        className="flex-1 p-2 border-none focus:ring-0 focus:outline-none rounded-full shadow-none"
                        value={chat}
                        onChange={(e) => setChat(e.target.value)}
                    />
                    <Input id="uploadfile" type="file" className="hidden" />

                    {/* Label untuk Upload */}
                    <Label htmlFor="uploadfile">
                        <Upload className="h-5 w-5 cursor-pointer" />
                    </Label>
                </div>
                <Button className="ml-2 p-2 bg-gray-900 text-white rounded-full" onClick={sendMessage}>
                    <Send className="h-5 w-5" />
                </Button>
            </div>
        </main>
    );
}
