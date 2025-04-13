import React from "react";
import PopularStocks from "./components/home/PopularStocks";
import About from "./components/homeSignIn/About";
import Header from "./components/Header";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-cassini to-yellow-cassini">
      <Header />
      <PopularStocks />
      <About />
    </div>
  );
};

export default MainPage;
