import CardStats from "@/components/ui/cardStats";
import ListIcon from "@/components/ui/icons/list";
import UserIcon from "@/components/ui/icons/user";
import UsercircleIcon from "@/components/ui/icons/usercircle";
import React from "react";

const Stats = () => {
  return (
    <div className="flex flex-col lg:flex-row md:flex-row gap-5 lg:gap-[50px] rounded-xl justify-center py-[35px] bg-black px-[30px] lg:px-[222px]">
      <CardStats icon={<UserIcon />} title="Klien" value="20+" />
      <CardStats icon={<ListIcon />} title="Proyek Sukses" value="20+" />
      <CardStats icon={<UsercircleIcon />} title="Tenaga Ahli" value="20+" />
    </div>
  );
};

export default Stats;
