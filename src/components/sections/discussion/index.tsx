import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

const Discussion = () => {
  return (
    <section className="lg:max-h-screen lg:flex lg:items-center">
      <div className="flex flex-col md:flex-row items-center p-8 gap-[115px] lg:h-max ">
        <div className="w-full h-full mb-8 md:mb-0">
          <img src="/bghero.png" alt="" className="h-full object-cover" />
        </div>
        <div className="w-full h-fit ">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl font-bold mb-4 lg:text-5xl">
              Wujudkan impian Anda menjadi kenyataan!
            </h1>
            <p className="text-lg mb-5 text-gray-600">
              Sampaikan ide proyek anda kepada kami, tim kami siap berdiskusi
              dan membantu untuk mewujudkannya
            </p>
          </div>
          <Link href={"/contact"}>
            <Button size={"default"}>Diskusi Sekarang</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Discussion;
