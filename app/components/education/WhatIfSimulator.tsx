import React, { useState } from "react";

interface WhatIfSimulatorProps {
  currentPrice: number;
  priceHistory: number[];
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  currentPrice,
  priceHistory,
}) => {
  const [simulatedAmount, setSimulatedAmount] = useState<string>("1000");
  const [simulatedDate, setSimulatedDate] = useState<string>("2024-01-01");

  const calculateSimulation = () => {
    const amount = parseFloat(simulatedAmount);
    const startPrice = priceHistory[0];
    const endPrice = currentPrice;

    const profitLoss = (amount / startPrice) * endPrice - amount;
    const percentageChange = ((endPrice - startPrice) / startPrice) * 100;

    return {
      futureValue: amount * (endPrice / startPrice),
      profitLoss,
      percentageChange,
    };
  };

  const simulation = calculateSimulation();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">What if...</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Investment Amount ($)
          </label>
          <input
            type="number"
            value={simulatedAmount}
            onChange={(e) => setSimulatedAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Purchase Date
          </label>
          <input
            type="date"
            value={simulatedDate}
            onChange={(e) => setSimulatedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-lg">
            If you had invested ${simulatedAmount} on{" "}
            {new Date(simulatedDate).toLocaleDateString()}:
          </p>
          <p className="text-2xl font-bold mt-2">
            Current Value: ${simulation.futureValue.toLocaleString()}
          </p>
          <p
            className={`text-lg ${
              simulation.profitLoss >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {simulation.profitLoss >= 0 ? "Profit" : "Loss"}: $
            {Math.abs(simulation.profitLoss).toLocaleString()} (
            {simulation.percentageChange.toFixed(2)}%)
          </p>
        </div>
      </div>
    </div>
  );
};
