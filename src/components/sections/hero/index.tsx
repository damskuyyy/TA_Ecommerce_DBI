import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-5">
      <div className="w-full flex justify-start items-center">
        <div className="flex flex-col gap-8">
          <h1 className="lg:text-6xl text-5xl font-semibold lg:text-left text-center">
            Software E-Shop DBIX
          </h1>
          <p className="lg:text-lg text-sm lg:text-left text-center leading-normal">
            PT. Digital Blockchain Indonesia adalah Perusahaan yang bergerak di
            Bidang Software Development dan Aplication IOS Android Mobile
            Berbasis blockchain. Kami bergerak berkolaborasi dengan Team
            Perusahaan Dari Mudapedia membangun platform E-commerce berbasis
            web.
          </p>
          <div className="flex justify-center gap-3 lg:justify-normal ">
            <Link href={"/#bestProduct"}>
            <Button size={"default"}>Products</Button>
            </Link>
            <Link href={"/aboutus"}>
              <Button size={"default"}>About Us</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex lg:justify-end justify-center items-center">
        <img src="/bghero.png" alt="" className="lg:w-5/6 w-full h-full" />
      </div>
    </div>
  );
};

export default Hero;
