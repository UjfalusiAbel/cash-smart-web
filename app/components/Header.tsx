import "../globals.css";
import React from "react";
import { FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <header className="w-full py-5 px-6 bg-gradient-to-br from-green-cassini/20 to-yellow-cassini/20 backdrop-blur-[32px] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30 backdrop-blur-3xl"></div>
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-0">
          <span className="bg-gradient-to-r from-[#7dff96] to-[#00a3a4] text-transparent bg-clip-text">
            Cash
          </span>
          <span className="bg-gradient-to-r from-[#7dff96] to-[#00a3a4] text-transparent bg-clip-text">
            Smart
          </span>
        </h1>
        <div className="flex items-center gap-4 cursor-pointer">
          <span className="text-white text-base font-medium">Your profile</span>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-cassini/30 to-[#4cd47b]/30 flex items-center justify-center">
            <FiUser className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
