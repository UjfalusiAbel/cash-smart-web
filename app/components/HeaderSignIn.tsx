import "../globals.css";
import React from "react";
import { FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md p-4 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">CashSmart</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
