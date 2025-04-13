'use client'

import { useContext } from "react";
import MainPageSignIn from "./mainPageSignIn";
import { AuthContext } from "./components/contexts/AuthProvider";
import MainPage from "./mainPage";

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <MainPage /> : <MainPageSignIn />;
}
