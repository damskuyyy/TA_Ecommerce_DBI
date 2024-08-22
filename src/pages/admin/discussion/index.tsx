import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Discussion = () => {
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-stretch">
        <h1 className="text-lg font-semibold md:text-2xl">Discussion</h1>
      </div>

      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="border rounded-md shadow-sm">
            <CardHeader className="flex items-stretch">
              <div className="flex items-center">
                <Avatar className="mr-4">
                  <AvatarImage
                    src="/admin/discussion/avatar.png.jpg"
                    alt="product"
                    width={24}
                    height={24}
                  />
                  <AvatarFallback>Product</AvatarFallback>
                </Avatar>
                <CardTitle>SEPATU ADIDAS GAZALLE NEW CASUAL SPORT</CardTitle>
              </div>
            </CardHeader>
            <hr className="border-gray-300 mx-1" />
            <CardContent className="flex items-start">
              <Avatar className="mr-4 mt-2">
                {" "}
                {/* Shift the avatar down using margin */}
                <AvatarImage
                  src="/admin/discussion/avatar1.png"
                  alt="user"
                  width={24}
                  height={24}
                />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Oleh Lukas, 40 menit lalu
                </p>
                <p className="font-semibold">Kak tuker barang bisa ga?</p>
                <Input placeholder="Balas Diskusi...." className="mt-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Discussion;
