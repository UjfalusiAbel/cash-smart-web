'use client'

import "../../globals.css";
import React from "react";
import Link from "next/link";

interface StockCardProps {
  rank: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}

const StockCard: React.FC<StockCardProps> = ({
  rank,
  name,
  price,
  change,
  isPositive,
}) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <span className="text-slate-600 text-[20px]">{rank}</span>
      <span className="text-lg font-semibold text-[20px]">{name}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-xl font-bold text-[20px]">${price}</span>
      <span className={`${isPositive ? "text-green-500" : "text-red-500"}`}>
        {change}
      </span>
    </div>
  </div>
);

const PopularStocks = () => {
  const stocks = [
    {
      rank: "1st",
      name: "AAPL",
      price: "175.84",
      change: "+2.3%",
      isPositive: true,
    },
    {
      rank: "2nd",
      name: "BTC",
      price: "68,420",
      change: "+1.8%",
      isPositive: true,
    },
    {
      rank: "3rd",
      name: "TSLA",
      price: "172.63",
      change: "-0.5%",
      isPositive: false,
    },
    {
      rank: "4th",
      name: "ETH",
      price: "3,890",
      change: "+3.2%",
      isPositive: true,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Popular stocks</h2>
        <Link href="/popularAssets" className="text-white hover:text-gray-200 transition-colors">
          Show all
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-slate-700 font-[18px]">
        {stocks.map((stock) => (
          <StockCard key={stock.name} {...stock} />
        ))}
      </div>
    </section>
  );
};

export default PopularStocks;
