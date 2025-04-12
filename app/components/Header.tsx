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
    <header className="w-full bg-white shadow-md px-4 py-3 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">CashSmart</h1>
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
