import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 rounded-lg animate-pulse" />
  ),
});

interface BusinessAnimationData {
  // Define the structure of your animation data if needed
  // This helps with TypeScript typing
}

const Hero = () => {
  // Move animation data import inside component or keep as is
  const bussinessAnimation: BusinessAnimationData = require("../../../../public/animations/business-team.json");

  return (
    <div className="w-full justify-between flex items-center lg:gap-10 gap-3 lg:flex-row flex-col-reverse lg:pb-0 pb-10">
      <div className="lg:w-1/2 w-full flex justify-start items-center">
        <div className="flex flex-col gap-6 py-10">
          <h1 className="text-6xl font-semibold lg:text-left text-center lg:py-4">
            E-Shop DBI
          </h1>
          <p className="lg:text-left text-center leading-normal text-gray-500">
            PT. Digital Blockchain Indonesia focuses on developing
            state-of-the-art mobile applications for iOS and Android that
            utilize blockchain technology. Working together with the
            knowledgeable staff at Mudapedia, we are excited to develop a potent
            web-based e-commerce platform. Our creative method creates safe,
            effective, and scalable solutions that spur development and digital
            transformation by fusing blockchain technology with user-centric
            design.
          </p>
          <div className="flex justify-center gap-3 lg:justify-normal lg:py-4">
            <Link href="/#products" passHref legacyBehavior>
              <Button size="default">Products</Button>
            </Link>
            <Link href="/aboutus" passHref legacyBehavior>
              <Button size="default">About Us</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 flex lg:justify-center justify-center items-center lg:h-[65vh] md:h-[65vh] h-[40vh] overflow-hidden">
        {typeof window !== "undefined" && (
          <Lottie animationData={bussinessAnimation} />
        )}
      </div>
    </div>
  );
};

export default Hero;
