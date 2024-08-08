import React from "react";
import CardTeam from "@/components/ui/cardTeam";

const teamMembers = [
  {
    name: "Jason Price",
    email: "kuhlman.jeremy@yahoo.com",
    imageUrl:
      "https://media.istockphoto.com/id/1481373905/photo/concerned-female-worker-looking-at-laptop-screen-suspiciously-thinking-about-problem-solving.webp?b=1&s=170667a&w=0&k=20&c=xzOur-Jc3_pluSzBvB_dwvbZp-E6NPIjxpwW8SrJC0w=",
  },
  {
    name: "Jonathan Barker",
    email: "cora.haley@quinn.biz",
    imageUrl:
      "https://media.istockphoto.com/id/1481373905/photo/concerned-female-worker-looking-at-laptop-screen-suspiciously-thinking-about-problem-solving.webp?b=1&s=170667a&w=0&k=20&c=xzOur-Jc3_pluSzBvB_dwvbZp-E6NPIjxpwW8SrJC0w=",
  },
  {
    name: "Duane Dean",
    email: "rusty.botsford@wiltfrid.io",
    imageUrl:
      "https://media.istockphoto.com/id/1481373905/photo/concerned-female-worker-looking-at-laptop-screen-suspiciously-thinking-about-problem-solving.webp?b=1&s=170667a&w=0&k=20&c=xzOur-Jc3_pluSzBvB_dwvbZp-E6NPIjxpwW8SrJC0w=",
  },
  {
    name: "Rosie Glover",
    email: "lockman.marques@hotmail.com",
    imageUrl:
      "https://media.istockphoto.com/id/1481373905/photo/concerned-female-worker-looking-at-laptop-screen-suspiciously-thinking-about-problem-solving.webp?b=1&s=170667a&w=0&k=20&c=xzOur-Jc3_pluSzBvB_dwvbZp-E6NPIjxpwW8SrJC0w=",
  },
  {
    name: "Patrick Greer",
    email: "pearlie.eichmann@trevion.net",
    imageUrl:
      "https://media.istockphoto.com/id/1481373905/photo/concerned-female-worker-looking-at-laptop-screen-suspiciously-thinking-about-problem-solving.webp?b=1&s=170667a&w=0&k=20&c=xzOur-Jc3_pluSzBvB_dwvbZp-E6NPIjxpwW8SrJC0w=",
  },
  {
    name: "Darrell Ortega",
    email: "chaya.shields@ferry.info",
    imageUrl:
      "https://media.istockphoto.com/id/1481373905/photo/concerned-female-worker-looking-at-laptop-screen-suspiciously-thinking-about-problem-solving.webp?b=1&s=170667a&w=0&k=20&c=xzOur-Jc3_pluSzBvB_dwvbZp-E6NPIjxpwW8SrJC0w=",
  },
];

const Team: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-5xl capitalize text-center font-semibold">
          Tim Kami
        </h1>
        <p className="text-[#455A64] ">
          Tim Digital Blockchain Indonesia
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-[60px]">
        {teamMembers.map((member) => (
          <CardTeam key={member.email} {...member} />
        ))}
      </div>
    </div>
  );
};

export default Team;
