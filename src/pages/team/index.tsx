import React from 'react';
import CardTeam from "@/components/ui/cardTeam";

const teamMembers = [
  {
    name: 'Jason Price',
    email: 'kuhlman.jeremy@yahoo.com',
    imageUrl: 'https://media.istockphoto.com/id/1481373905/photo/concerned-female-worker-looking-at-laptop-screen-suspiciously-thinking-about-problem-solving.webp?b=1&s=170667a&w=0&k=20&c=xzOur-Jc3_pluSzBvB_dwvbZp-E6NPIjxpwW8SrJC0w=',
  },
  {
    name: 'Jonathan Barker',
    email: 'cora.haley@quinn.biz',
    imageUrl: 'https://media.istockphoto.com/id/1481373905/photo/concerned-female-worker-looking-at-laptop-screen-suspiciously-thinking-about-problem-solving.webp?b=1&s=170667a&w=0&k=20&c=xzOur-Jc3_pluSzBvB_dwvbZp-E6NPIjxpwW8SrJC0w=',
  },
  {
    name: 'Duane Dean',
    email: 'rusty.botsford@wiltfrid.io',
    imageUrl: 'https://media.istockphoto.com/id/1481373905/photo/concerned-female-worker-looking-at-laptop-screen-suspiciously-thinking-about-problem-solving.webp?b=1&s=170667a&w=0&k=20&c=xzOur-Jc3_pluSzBvB_dwvbZp-E6NPIjxpwW8SrJC0w=',
  },
  {
    name: 'Rosie Glover',
    email: 'lockman.marques@hotmail.com',
    imageUrl: 'https://media.istockphoto.com/id/1481373905/photo/concerned-female-worker-looking-at-laptop-screen-suspiciously-thinking-about-problem-solving.webp?b=1&s=170667a&w=0&k=20&c=xzOur-Jc3_pluSzBvB_dwvbZp-E6NPIjxpwW8SrJC0w=',
  },
  {
    name: 'Patrick Greer',
    email: 'pearlie.eichmann@trevion.net',
    imageUrl: 'https://media.istockphoto.com/id/1481373905/photo/concerned-female-worker-looking-at-laptop-screen-suspiciously-thinking-about-problem-solving.webp?b=1&s=170667a&w=0&k=20&c=xzOur-Jc3_pluSzBvB_dwvbZp-E6NPIjxpwW8SrJC0w=',
  },
  {
    name: 'Darrell Ortega',
    email: 'chaya.shields@ferry.info',
    imageUrl: 'https://media.istockphoto.com/id/1481373905/photo/concerned-female-worker-looking-at-laptop-screen-suspiciously-thinking-about-problem-solving.webp?b=1&s=170667a&w=0&k=20&c=xzOur-Jc3_pluSzBvB_dwvbZp-E6NPIjxpwW8SrJC0w=',
  },
];

const Team: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Tim Kami</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <CardTeam key={member.email} {...member} />
        ))}
      </div>
    </div>
  );
};

export default Team;
