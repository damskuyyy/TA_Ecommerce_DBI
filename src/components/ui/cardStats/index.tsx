import React from "react";
import CountUp from "react-countup";
import { StatsDataType } from "@/types/statsDataTypes";

const CardStats = ({ icon, title, value }: StatsDataType) => {

  const numericValue = typeof value === 'number' ? value : Number(value);

  return (
    <div className="flex items-center gap-[26px] py-[35px] bg-white rounded-lg md:rounded-sm md:px-[26px] px-[17px] w-full h-[131px] md:h-[90px] md:w-full">
      <div className="flex items-center gap-[26px]">
        {icon}
        <div className="flex flex-col">
          <span className="text-[28px] font-semibold">
            <CountUp end={numericValue} duration={5}/>
            +
          </span>
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardStats;
