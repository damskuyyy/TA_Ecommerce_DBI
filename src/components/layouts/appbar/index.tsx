import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Bell, CircleUser, Home, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Appbar = () => {

  const { pathname } = useRouter()

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">E-Shop DBIX</span>
            </Link>
            <Link
              href="/admin/dashboard"
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${pathname === '/admin/dashboard' ? 'text-foreground bg-muted' : 'text-muted-foreground'} hover:text-foreground`}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/product"
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${pathname === '/admin/product' ? 'text-foreground bg-muted' : 'text-muted-foreground'} hover:text-foreground`}
            >
              <ShoppingCart className="h-5 w-5" />
              Product
            </Link>
            <Link
              href="/admin/order"
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${pathname === '/admin/order' ? 'text-foreground bg-muted' : 'text-muted-foreground'} hover:text-foreground`}
            >
              <Package className="h-5 w-5" />
              Order
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              href="/admin/transaction"
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${pathname === '/admin/transaction' ? 'text-foreground bg-muted' : 'text-muted-foreground'} hover:text-foreground`}
            >
              <Users className="h-5 w-5" />
              Transactions
            </Link>
            <Link
              href="/admin/discussion"
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${pathname === '/admin/discussion' ? 'text-foreground bg-muted' : 'text-muted-foreground'} hover:text-foreground`}
            >
              <LineChart className="h-5 w-5" />
              Disscussion
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Appbar;