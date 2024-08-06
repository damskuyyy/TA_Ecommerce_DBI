import CheckIcon from "@/components/ui/icons/check";
import React from "react";

const Services = () => {
  return (
    <div>
      <h1 className="text-center text-5xl font-semibold leading-8 ">
        Our Services
      </h1>
      <p className="text-[#455A64] text-center font-extralight mt-4">
        providing manufacturing services
      </p>
      <div className="grid lg:grid-cols-2 gap-[54px] lg:px-[258px] mt-16">
        <ul className="flex flex-col gap-[14px] ">
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>Website</span>
          </li>
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>Web 3</span>
          </li>
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>Android Application</span>
          </li>
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>IOS Application</span>
          </li>
        </ul>
        <ul className="flex flex-col gap-[14px] ">
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>Blockchain Service</span>
          </li>
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>Bussiness Platform</span>
          </li>
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>Gaming Exchange Based Token</span>
          </li>
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>Payment Gateway</span>
          </li>
        </ul>
        <ul className="flex flex-col gap-[14px] ">
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>Decentralized Exchange</span>
          </li>
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>Internet of Things (IOT)</span>
          </li>
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>Create Robot Trading</span>
          </li>
        </ul>
        <ul className="flex flex-col gap-[14px] ">
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>Exchanger Platform</span>
          </li>
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>Android Exchange</span>
          </li>
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>IOS Exchange</span>
          </li>
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>NFT Platform</span>
          </li>
        </ul>
        <ul className="flex flex-col gap-[14px] ">
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>(COIN) - Sha 256 </span>
          </li>
          <li className="flex gap-8 font-semibold">
            <CheckIcon />
            <span>(TOKEN) - ERC 20, BSC 20, TRC 20</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Services;
