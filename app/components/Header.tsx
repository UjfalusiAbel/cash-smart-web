import "../globals.css";
import React from "react";
import { FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md p-4 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">CashSmart</h1>
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-gray-700">Your profile</span>
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <FiUser className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
