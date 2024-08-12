import React from "react";
import { StatsDataType } from "@/types/statsDataTypes";

const CardStats = ({ icon, title, value }: StatsDataType) => {
  return (
    <div className="flex items-center gap-[26px] py-[35px] bg-white rounded-lg md:rounded-sm md:px-[26px] px-[17px] w-full h-[131px] md:h-[90px] md:w-full">
      <div className="flex items-center gap-[26px]">
        {icon}
        <div className="flex flex-col">
          <span className="text-[28px] font-semibold">{value}</span>
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardStats;
