import React from 'react';
import { ToolCardProps } from '@/types';
import Link from 'next/link';

export const ToolCard: React.FC<ToolCardProps> = ({ data }) => {
    const svgPath = data.icon || '/icons/default.svg';

    return (
        <Link 
            href={data.href}
            className="block"
        >
            <div
                className="relative rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer overflow-hidden flex text-center flex-col h-full group shadow-[0px_9px_10.2px_0px_#000000]"
                style={{
                    transition: 'all 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0px 0px 50.2px -20px ${data.iconColor}`;
                }}
            >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-700 opacity-0 group-hover:opacity-100 transition-all duration-300 z-0"></div>

                {/* Top section */}
                <div
                    className="relative z-10 flex items-center justify-center py-10 group-hover:!bg-transparent transition-all duration-300"
                    style={{ backgroundColor: data.bgColor }}
                >
                    <img
                        src={svgPath}
                        alt={data.title}
                        className="w-12 h-12 transition-all duration-300 ease-in-out"
                    />
                </div>

                {/* Bottom section */}
                <div className="relative z-10 bg-white group-hover:bg-transparent p-4 flex-1 flex flex-col transition-all duration-300">
                    <h3 className="font-semibold text-gray-900 group-hover:text-white text-lg mb-2 leading-tight transition-all duration-300">
                        {data.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-200 text-sm leading-relaxed transition-all duration-300">
                        {data.description}
                    </p>
                </div>
            </div>
        </Link>
    );
};