"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const YourInvestments = () => {
  const [investments, setInvestments] = useState([
    {
      name: "Tesla Stock",
      value: 15,
      price: 172.63,
      displayValue: "15",
    },
    {
      name: "Bitcoin",
      value: 0.05,
      price: 68420,
      displayValue: "0.05",
    },
    {
      name: "Apple Stock",
      value: 10,
      price: 175.84,
      displayValue: "10",
    },
  ]);

  const router = useRouter();

  const handleValueChange = (index: number, newValue: string) => {
    const updatedInvestments = [...investments];
    const numericValue = parseFloat(newValue);
    const currentValue = isNaN(numericValue) ? 0 : numericValue;
    const totalValue = currentValue * updatedInvestments[index].price;

    updatedInvestments[index] = {
      ...updatedInvestments[index],
      displayValue: newValue,
      value: currentValue,
    };
    setInvestments(updatedInvestments);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-cassini to-yellow-cassini py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Your Investments</h1>
          <Link
            href="/"
            className="text-white hover:text-gray-200 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <div className="space-y-6">
          {investments.map((investment, index) => {
            const totalValue = investment.value * investment.price;
            const unit = investment.name.includes("Stock") ? "shares" : "BTC";

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() =>
                  router.push(
                    `/investmentCharts?name=${encodeURIComponent(
                      investment.name
                    )}&price=${investment.price}&value=${investment.value}`
                  )
                }
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{investment.name}</h3>
                    <span className="text-sm text-gray-500">{unit}</span>
                  </div>
                  <div className="text-xl font-bold">
                    ${investment.price.toLocaleString()}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Holdings: {investment.value} | Total: $
                  {totalValue.toLocaleString()}
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    value={investment.displayValue}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-cassini"
                    placeholder="Enter value"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YourInvestments;
