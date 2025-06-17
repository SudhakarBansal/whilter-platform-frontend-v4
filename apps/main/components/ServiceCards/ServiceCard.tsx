"use client";

import React from 'react';

interface ServiceCardProps {
  title: string;
  image: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, image }) => {
  return (
    <div className="relative cursor-pointer bg-transparent rounded-[40px] aspect-[16/10] bg-gradient-to-br from-blue-400 to-blue-800 overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-[-8px_5px_76.1px_0px_#F04AF359] group">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover"
      />

      <div className="overlay absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-b from-blue-300/80 to-blue-600 flex items-center justify-center transition-[height] duration-300 cubic-bezier(0.4,0,0.2,1) shadow-[0px_-9px_17px_0px_rgba(0,0,0,0.2)] group-hover:h-full">
        <div className="p-4">
          <h4 className="text-xl md:text-lg lg:text-xl text-center text-white font-normal">
            {title}
          </h4>
        </div>
      </div>
    </div>
  );
};