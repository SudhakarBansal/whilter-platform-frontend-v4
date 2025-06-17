"use client";

import React from 'react';

interface ServiceCardProps {
  title: string;
  image: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, image }) => {
  return (
    <div className="relative cursor-pointer bg-transparent rounded-[40px] aspect-[16/10] bg-gradient-to-br from-blue-400 to-blue-800 overflow-hidden group translate-z-0">
    <img src={image} alt={title} className="h-full w-full object-cover" />
  
    <div className="overlay absolute bottom-0 left-0 right-0 h-full origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-in-out will-change-transform bg-gradient-to-b from-blue-300/80 to-blue-600 flex items-center justify-center shadow-[0px_-9px_17px_0px_rgba(0,0,0,0.2)]">
      <div className="p-4">
        <h4 className="text-xl md:text-lg lg:text-xl text-center text-white font-normal">
          {title}
        </h4>
      </div>
    </div>
  </div>
  );
};