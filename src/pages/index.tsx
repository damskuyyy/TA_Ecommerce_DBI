import { Inter } from "next/font/google";
import Hero from "@/components/sections/hero";
import Head from "next/head";
import About from "@/components/sections/about";
import BestProducts from "@/components/sections/bestProducts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>PT. Digital Blockchain Indonesia</title>
      </Head>
      <div className={`flex w-full flex-col gap-16 ${inter.className}`}>
        <Hero />
        <About />
        <BestProducts />
      </div>
    </>
  );
}
