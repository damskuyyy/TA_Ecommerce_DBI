import { useState } from "react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Sidebar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("profile");

  return (
    <div className="w-full bg-white shadow-md h-full rounded-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">My Profile</h2>
      </div>
      <div className="block md:hidden p-4 rounded-lg">
        <div className="flex space-x-2">
          <Button
            className={`py-2 px-4 font-semibold ${
              selectedTab === "profile"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            } rounded`}
            onClick={() => setSelectedTab("profile")}
          >
            My Profile
          </Button>
          <Button
            className={`py-2 px-4 font-semibold ${
              selectedTab === "security"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            } rounded`}
            onClick={() => setSelectedTab("security")}
          >
            Security
          </Button>
          <Button
            className={`py-2 px-4 font-semibold ${
              selectedTab === "delete"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500 hover:bg-red-500 hover:text-white"
            } rounded`}
            onClick={() => setSelectedTab("delete")}
          >
            Delete Profile
          </Button>
        </div>
      </div>
      <div className="hidden md:block p-4 space-y-4">
        <div>
          <Link href={"/"} className="hover:opacity-80 font-semibold">
            My Profile
          </Link>
        </div>
        <div>
          <Link href={"/"} className="hover:opacity-80 font-semibold">
            Security
          </Link>
        </div>
        <div>
          <Link
            href={"/"}
            className="hover:opacity-80 font-semibold text-red-500"
          >
            Delete Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
