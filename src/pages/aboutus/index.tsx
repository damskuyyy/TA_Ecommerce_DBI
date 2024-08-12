import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center lg:p-8 lg:flex-row ">
      <div className="w-full md:w-2/3 lg:w-1/2 flex justify-center mb-8 md:mb-0">
        <img src="/logo.png" alt="" className="lg:w-5/6 w-full h-full justify-center" />
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="text-4xl font-semibold mb-4 lg:text-5xl ">
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
