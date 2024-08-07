import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  CrossCircledIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

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
    <div className="w-full flex justify-between items-center py-5 relative">
      <h1 className="font-bold text-lg flex items-center gap-5">
        <button onClick={() => setView(!view)} className="lg:hidden block">
          {view ? (
            <CrossCircledIcon width={20} height={20} />
          ) : (
            <HamburgerMenuIcon width={20} height={20} />
          )}
        </button>
        <Link href={"/"}>E-Shop DBIX</Link>
      </h1>

      <div className="flex-1 flex justify-center">
        <div
          className={`lg:hidden flex lg:flex-row flex-col lg:items-center gap-5 absolute lg:static top-16 lg:h-full ${
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
                <Link href={"/ourteam"}>Our Team</Link>
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
        </div>

        <div className="lg:flex hidden lg:flex-row items-center gap-10">
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
                <Link href={"/ourteam"}>Our Team</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/#faqs"}>Faq's</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={"/#services"} className="font-medium hover:opacity-80">
            Service
          </Link>
          <Link href={"/contact"} className="font-medium hover:opacity-80">
            Contact
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-3">
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
