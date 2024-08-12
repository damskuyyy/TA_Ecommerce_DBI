import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import callcenter from '../../../../public/animations/call-center.json'

const Discussion = () => {
  return (
    <section className="lg:max-h-screen lg:flex lg:items-center">
      <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-[115px] lg:h-max ">
        <div className="w-2/3 h-full mb-8 md:mb-0">
          <Lottie animationData={callcenter} />
        </div>
        <div className="w-full h-fit ">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold mb-4 lg:text-5xl">
              Turn your dreams into reality!
            </h1>
            <p className="lg:text-lg mb-5 text-gray-600">
            Share your project ideas with us, and our team will be ready to discuss and help bring them to life.
            </p>
          </div>
          <Link href={"/contact"}>
            <Button size={"default"}>Discuss Now!</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Discussion;
