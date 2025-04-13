import React from "react";
import Header from "./components/Header";
import PopularStocks from "./components/home/PopularStocks";
import YourInvestments from "./components/home/YourInvestments";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-cassini to-yellow-cassini">
      <Header />
      <main className="pt-20">
        <PopularStocks />
        <YourInvestments />
      </main>
    </div>
  );
};

export default MainPage;
