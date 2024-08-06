import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-8">
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img src="/bghero.png" alt="" className="lg:w-5/6 w-full h-full" />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-bold mb-4 lg:text-6xl">
          Kenali perusahaan lebih dekat
        </h1>
        <p className="text-lg mb-5 text-gray-600">Tentang Kami</p>
        <div className="space-y-8">
          <p className="text-[#252525]">
            There are numbers of reasons why our clients are always happy with
            the services we provide to them and a hundred more, why we keep
            engaging even more customers by exploring new fields of services and
            still believing in our root quality elements.
          </p>

          <p className="text-[#252525]">
            There are numbers of reasons why our clients are always happy with
            the services we provide to them and a hundred more, why we keep
            engaging even more customers by exploring new fields of services and
            still believing in our root quality elements.
          </p>
          <p className="text-[#252525]">
            There are numbers of reasons why our clients are always happy with
            the services we provide to them and a hundred more, why we keep
            engaging even more customers by exploring new fields of services and
            still believing in our root quality elements.
          </p>
          <p className="text-[#252525]">
            There are numbers of reasons why our clients are always happy with
            the services we provide to them and a hundred more, why we keep
            engaging even more customers by exploring new fields of services and
            still believing in our root quality elements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
