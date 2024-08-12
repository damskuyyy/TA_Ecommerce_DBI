import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const About = () => {
  const [page, setPage] = useState("company");
  const accordionData = [
    {
      t: "Website",
      c: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias minima cum quia itaque deleniti. Quaerat reiciendis, ipsum inventore voluptate eos excepturi labore laborum nisi quos? Magnam libero laboriosam corrupti quos?",
    },
    {
      t: "Web 3",
      c: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias minima cum quia itaque deleniti. Quaerat reiciendis, ipsum inventore voluptate eos excepturi labore laborum nisi quos? Magnam libero laboriosam corrupti quos?",
    },
    {
      t: "Android Application",
      c: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias minima cum quia itaque deleniti. Quaerat reiciendis, ipsum inventore voluptate eos excepturi labore laborum nisi quos? Magnam libero laboriosam corrupti quos?",
    },
    {
      t: "IOS Application",
      c: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias minima cum quia itaque deleniti. Quaerat reiciendis, ipsum inventore voluptate eos excepturi labore laborum nisi quos? Magnam libero laboriosam corrupti quos?",
    },
    {
      t: "Decentralized Exchange",
      c: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias minima cum quia itaque deleniti. Quaerat reiciendis, ipsum inventore voluptate eos excepturi labore laborum nisi quos? Magnam libero laboriosam corrupti quos?",
    },
    {
      t: "Internet of Things (IOT)",
      c: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias minima cum quia itaque deleniti. Quaerat reiciendis, ipsum inventore voluptate eos excepturi labore laborum nisi quos? Magnam libero laboriosam corrupti quos?",
    },
  ];

  return (
    <div>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-16" id="about">
        <div className="w-full">
          <img src="/about.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="border-2 px-3 w-fit p-1 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-black" />
            <p className="text-sm font-medium">About Us</p>
          </div>
          <div className="inline-flex items-center gap-3">
            <Button
              size={"sm"}
              variant={page === "company" ? "default" : "outline"}
              onClick={() => setPage("company")}
            >
              Company
            </Button>
            <Button
              size={"sm"}
              variant={page === "products" ? "default" : "outline"}
              onClick={() => setPage("products")}
            >
              Products
            </Button>
            <Button
              size={"sm"}
              variant={page === "our-team" ? "default" : "outline"}
              onClick={() => setPage("our-team")}
            >
              Our team
            </Button>
          </div>
          <p className="text-sm leading-normal text-gray-700">
            {page === "company" &&
              "PT. Digital Blockchain Indonesia adalah Perusahaan yang bergerak di Bidang Software Development dan Aplication IOS Android Mobile Berbasis blockchain. Kami bergerak  berkolaborasi dengan Team Perusahaan Dari Mudapedia membangun Platform beserta web base berbasis Ecommerce. Produk kami saat ini tersedia sebagai  berikut Template Website Berbasis Web 3 , Crypto Blockchain Berbasis NFT , Aplikasi Kasir Berbasis Website , dan kami menerima jasa pembuatan Crypto Berbasis Blockchain di berbagai Jaringan termasuk kami menerima jasa pembuatan Exchanger untuk market Perusahaan berbasis Blockchain."}
            {page === "products" &&
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur sequi obcaecati velit reiciendis aspernatur voluptas at quis, cumque laboriosam amet! Ipsum quod ipsam dignissimos. Nisi dolorem a aliquid nihil saepe?"}
            {page === "our-team" &&
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur sequi obcaecati velit reiciendis aspernatur voluptas at quis, cumque laboriosam amet! Ipsum quod ipsam dignissimos. Nisi dolorem a aliquid nihil saepe? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, dignissimos."}
          </p>
          {page === "company" && (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-10 w-full place-items-center">
              <img src="/nft.jpg" alt="" className="w-28 h-full object-cover" />
              <img src="/btc.png" alt="" className="w-28 h-28 object-cover" />
              <img
                src="/solana.png"
                alt=""
                className="w-28 h-28 object-cover"
              />
              <img src="/eth.png" alt="" className="w-28 h-28 object-cover" />
              <img
                src="/phantom.jpg"
                alt=""
                className="w-28 h-28 object-cover"
              />
              <img
                src="/unisat.png"
                alt=""
                className="w-28 h-28 object-cover"
              />
              <img src="/pvo.png" alt="" className="w-28 h-28 object-cover" />
              <img src="/logo.png" alt="" className="w-full h-full" />
            </div>
          )}
          {page === "products" && (
            <div className="flex flex-col gap-5 w-full">
              <Accordion type="single" collapsible={true} className="w-full">
                {accordionData.map((item, index) => (
                  <AccordionItem value={`item-${index + 1}`}>
                    <AccordionTrigger>{item.t}</AccordionTrigger>
                    <AccordionContent className="text-gray-700 text-sm">
                      {item.c}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Link
                href={"/"}
                className="text-xs mx-auto hover:border-b-2 hover:opacity-80 w-fit flex items-center gap-2"
              >
                See all Products
                <ArrowRightIcon />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
