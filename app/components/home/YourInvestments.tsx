import "../../globals.css";
import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import Link from "next/link";

interface InvestmentItemProps {
  name: string;
  description: string;
}

const InvestmentItem: React.FC<InvestmentItemProps> = ({
  name,
  description,
}) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50/80">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
    <button className="p-2 hover:bg-gray-100 rounded-full">
      <FiMoreVertical className="text-gray-600" />
    </button>
  </div>
);

const YourInvestments = () => {
  const investments = [
    {
      name: "Tesla Stock",
      description: "15 shares at $172.63",
    },
    {
      name: "Bitcoin",
      description: "0.05 BTC at $68,420",
    },
    {
      name: "Apple Stock",
      description: "10 shares at $175.84",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Your investments</h2>
        <Link
          href="/yourInvestments"
          className="text-white hover:text-gray-200 transition-colors"
        >
          Show all
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md divide-y divide-gray-100">
        {investments.map((investment, index) => (
          <InvestmentItem
            key={index}
            name={investment.name}
            description={investment.description}
          />
        ))}
      </div>
    </section>
  );
};

export default YourInvestments;
