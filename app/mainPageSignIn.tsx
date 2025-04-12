import React from "react";
import HeaderSignIn from "./components/HeaderSignIn";
import PopularStocks from "./components/home/PopularStocks";
import YourInvestments from "./components/home/YourInvestments";
import About from "./components/homeSignIn/About";
const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSignIn />
      <main className="pt-20">
        <PopularStocks />
        <About />
      </main>
    </div>
  );
};

export default MainPage;
