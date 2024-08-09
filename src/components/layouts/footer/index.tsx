import EmailIcon from "@/components/ui/icons/email";
import FacebookIcon from "@/components/ui/icons/facebook";
import InstagramIcon from "@/components/ui/icons/instagram";
import LocationIcon from "@/components/ui/icons/location";
import TeleponeIcon from "@/components/ui/icons/telepon";
import YoutubeIcon from "@/components/ui/icons/youtube";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">E-Shop DBIX</h2>
          <p>
            Improve your gardening know-how with our expert-written knowledge
            base.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Perusahaan</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Tentang Kami
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Tim Kami
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Kantor Kami</h3>
          <ul>
            <li className="mb-2 flex items-center">
              <span role="img" aria-label="email" className="mr-2">
                <EmailIcon />
              </span>
              Daija6@gmail.com
            </li>
            <li className="mb-2 flex items-center">
              <span role="img" aria-label="location" className="mr-2">
                <LocationIcon />
              </span>
              New Hallie, 32574 Cummerata Vista
            </li>
            <li className="mb-2 flex items-center">
              <span role="img" aria-label="phone" className="mr-2">
                <TeleponeIcon />
              </span>
              317-757-5201
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Social</h3>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:underline">
                <div className=" bg-white rounded-sm size-6">
                  <FacebookIcon />
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                <div className="bg-white rounded-sm size-6">
                  <YoutubeIcon />
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                <div className="bg-white rounded-sm size-6">
                  <InstagramIcon />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-sm lg:text-base pb-5 text-center w-full border-t pt-10 border-text/20">
        Copyright © 2024 by PT. Digital Blockchain Indonesia
      </div>
    </footer>
  );
};

export default Footer;
