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
        <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-cassini to-[#4cd47b] text-white text-sm font-medium hover:opacity-90 transition-opacity">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
