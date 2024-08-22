import Link from "next/link";
import {
  CircleUser,
  Home,
  LineChart, Package,
  Package2, ShoppingCart,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { pathname } = useRouter()

  return (
    <div className="hidden border-r bg-muted/40 md:block w-full h-full">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">E-Shop DBIX</span>
          </Link>

        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname === '/admin/dashboard' ? 'text-foreground bg-muted': 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/product"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname === '/admin/product' || pathname === '/admin/addProduct' ?  'text-foreground bg-muted': 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <ShoppingCart className="h-4 w-4" />
              Product
            </Link>
            <Link
              href="/admin/order"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname === '/admin/order' ? 'text-foreground bg-muted': 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <Package className="h-4 w-4" />
              Order
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              href="/admin/transaction"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname === '/admin/transaction' ? 'text-foreground bg-muted': 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <Users className="h-4 w-4" />
              Transactions
            </Link>
            <Link
              href="/admin/discussion"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname === '/admin/discussion' ? 'text-foreground bg-muted': 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <LineChart className="h-4 w-4" />
              Disscusion
            </Link>
          </nav>
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
