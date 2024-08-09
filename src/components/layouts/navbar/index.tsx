import { Button } from "@/components/ui/button";
import { ChevronDownIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ButtoNavIcon from "@/components/ui/icons/buttonnav";
import ShoppingCartIcon from "@/components/ui/icons/shoppingcart";

const Navbar = () => {
  const [view, setView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (view) {
      if (ref) {
        ref.current?.classList.remove("hidden");
      }
    } else {
      setTimeout(() => {
        if (ref) {
          ref.current?.classList.add("hidden");
        }
      }, 300);
    }
  }, [view]);

  return (
    <div className="w-full flex flex-col lg:flex-row py-5 relative px-6 lg:justify-between">
      <div className="font-bold text-lg flex items-center justify-between w-full gap-5 lg:w-fit">
        <Link href={"/"}>E-Shop DBIX</Link>
        <div className="flex gap-4 lg:hidden">
          <Link
            href={"/shopping"}
            className="lg:hidden font-semibold hover:opacity-80"
          >
            <ShoppingCartIcon />
          </Link>
          <button onClick={() => setView(!view)} className="lg:hidden block">
            {view ? (
              <CrossCircledIcon width={20} height={20} />
            ) : (
              <ButtoNavIcon />
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-center lg:w-fit">
        <div
          className={`lg:hidden flex lg:flex-row flex-col lg:items-center px-6 gap-5 absolute lg:static top-16 lg:h-full ${
            view ? "h-screen opacity-100" : "h-0 opacity-0"
          } transition-all duration-300 bg-white lg:w-fit w-full pt-3`}
          ref={ref}
        >
          <Link href={"/"} className="font-medium hover:opacity-80">
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2">
                Company
                <ChevronDownIcon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href={"/aboutus"}>About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/team"}>Our Team</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/#faqs"}>Faq's</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={"/#service"} className="font-medium hover:opacity-80">
            Services
          </Link>
          <Link href={"/contact"} className="font-medium hover:opacity-80">
            Contact
          </Link>
          <div className="lg:hidden flex items-center gap-3">
            <Link href={"/user/login"}>
              <Button size={"sm"} variant={"secondary"}>
                Login
              </Button>
            </Link>
            <Link href={"/user/login"}>
              <Button size={"sm"}>Signup</Button>
            </Link>
          </div>
        </div>

        <div className="lg:flex hidden lg:flex-row items-center lg:justify-between gap-10">
          <Link href={"/"} className="hover:opacity-80 font-semibold">
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2 font-semibold">
                Company
                <ChevronDownIcon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="font-semibold">
                <Link href={"/aboutus"}>About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-semibold">
                <Link href={"/team"}>Our Team</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-semibold">
                <Link href={"/#faqs"}>Faq's</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={"/#services"} className="font-semibold hover:opacity-80">
            Service
          </Link>
          <Link href={"/contact"} className="font-semibold hover:opacity-80">
            Contact
          </Link>
          <Link href={"/shopping"} className="font-semibold hover:opacity-80">
            <ShoppingCartIcon />
          </Link>
        </div>
      </div>
      <div className="lg:flex items-center gap-3 hidden">
        <Link href={"/user/login"}>
          <Button size={"sm"} variant={"secondary"}>
            Login
          </Button>
        </Link>
        <Link href={"/user/login"}>
          <Button size={"sm"}>Signup</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
