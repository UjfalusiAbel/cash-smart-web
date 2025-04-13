'use client'

import React from "react";

interface TooltipInfoProps {
  text: string;
}

export const TooltipInfo: React.FC<TooltipInfoProps> = ({ text }) => {
  return (
    <div className="group relative inline-block ml-2">
      <span className="cursor-help text-gray-500">ℹ️</span>
      <div className="opacity-0 bg-black text-white text-sm rounded-lg py-2 px-3 absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 group-hover:opacity-100 transition-opacity duration-200">
        {text}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black"></div>
      </div>
    </div>
  );
};
