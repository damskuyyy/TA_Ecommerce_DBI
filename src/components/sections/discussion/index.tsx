import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

const Discussion = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-8 gap-[115px]">
      <div className="w-full  flex justify-center mb-8 md:mb-0">
        <img src="/bghero.png" alt="" className="lg:w-5/6 w-full h-full" />
      </div>
      <div className="w-full">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold mb-4 lg:text-5xl">
            Wujudkan impian Anda menjadi kenyataan!
          </h1>
          <p className="text-lg mb-5 text-gray-600">
            Sampaikan ide proyek anda kepada kami, tim kami siap berdiskusi dan
            membantu untuk mewujudkannya
          </p>
        </div>

        <Button size={"default"}>Diskusi Sekarang</Button>
      </div>
    </div>
  );
};

export default Discussion;
