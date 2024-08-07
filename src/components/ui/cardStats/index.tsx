import React from "react";
import { StatsDataType } from "@/types/statsDataTypes";

const CardStats = ({icon, title, value}: StatsDataType) => {
  return (
    <div className="flex items-center gap-[26px] py-[35px] bg-white rounded-lg px-[17px] w-full h-[131px]">
      <div className="flex flex-col ">
        {icon}
        <span className="text-[28px] font-semibold">{value}</span>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default CardStats;
