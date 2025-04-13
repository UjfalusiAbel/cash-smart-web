"use client";
import "../globals.css";
import React, { useContext } from "react";
import { FiUser } from "react-icons/fi";
import { AuthContext } from "./contexts/AuthProvider";
import { useRouter } from "next/navigation";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const router = useRouter();

  const toLogin = () => {
    router.push("/login");
  };

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
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          {isAuthenticated && (
            <button
              className="text-black bg-blue-200 p-3 rounded-full"
              onClick={() => logout()}
            >
              Logout
            </button>
          )}
          {!isAuthenticated && (
            <button
              className="text-black bg-blue-200 p-3 rounded-full"
              onClick={() => toLogin()}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
