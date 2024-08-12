import { Inter } from "next/font/google";
import Hero from "@/components/sections/hero";
import Head from "next/head";
import Services from "@/components/sections/services";
import ChooseUs from "@/components/sections/chooseus";
import BestProducts from "@/components/sections/bestProducts";
import Discussion from "@/components/sections/discussion";
import Stats from "@/components/sections/stats";
import Faq from "@/components/sections/faq";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>PT. Digital Blockchain Indonesia</title>
      </Head>
      <div className={`flex w-full flex-col lg:gap-16 gap-8 ${inter.className}`}>
        <Hero />
        <Services />
        <ChooseUs/>
        <BestProducts />
        <Stats />
        <Faq />
        <Discussion />
      </div>
    </>
  );
}
