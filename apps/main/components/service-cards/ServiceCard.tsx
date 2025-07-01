import {type ServiceCardProps } from "@whilter/ui-kit/types";
import Link from "next/link";
import React from "react";

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, image, href }) => {
  return (
    <Link href={href} className="relative cursor-pointer bg-transparent transition-shadow duration-300 ease-in-out rounded-[40px] aspect-[16/10] bg-gradient-to-br from-blue-400 to-blue-800 overflow-hidden group translate-z-0">
      {/* Background Image */}
      <img src={image} alt={title} className="h-full w-full object-cover" />

      {/* Overlay */}
      <div className="overlay absolute bottom-0 left-0 right-0 h-[35%] group-hover:h-full transition-all duration-300 ease-in-out bg-gradient-to-b from-blue-300/80 to-blue-600 flex items-center justify-center shadow-[0px_-9px_17px_0px_rgba(0,0,0,0.2)]">
        <div className="p-4">
          <h4 className="text-xl md:text-lg lg:text-xl text-center text-white font-normal">
            {title}
          </h4>
        </div>
      </div>
    </Link>
  );
};
