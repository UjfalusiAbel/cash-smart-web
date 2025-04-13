'use client'

import "../../globals.css";
import React, { useContext, useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import Link from "next/link";
import { AuthContext } from "../contexts/AuthProvider";
import { apiURL } from "../constants/Constants";

interface InvestmentItemProps {
  name: string,
  buyDate: Date,
  buyPrice: number,
  fee: number,
  quantity: number
}

interface InvestmentDTO {
  name: string,
  buyDate: Date,
  buyPrice: number,
  fee: number,
  quantity: number
}

const InvestmentItem: React.FC<InvestmentItemProps> = ({ name, buyDate, buyPrice, fee, quantity }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50/80">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        <div>
          <h3 className="font-semibold text-black">{name}</h3>
          <h3 className="font-semibold text-black">{buyDate.toString()}</h3>
          <h3 className="font-semibold text-black">{buyPrice}</h3>
          <h3 className="font-semibold text-black">{fee}</h3>
          <h3 className="font-semibold text-black">{quantity}</h3>
        </div>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <FiMoreVertical className="text-gray-600" />
      </button>
    </div>
  );
}

const YourInvestments = () => {
  const [investments, setInvestments] = useState<InvestmentDTO[]>([]);
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    const loadInvestment = async () => {
      try {
        const data = await fetch(`${apiURL}/investments/all`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
        const json = await data.json();
        setInvestments(json.$values);
      }
      catch (error) {
        console.error("Failed to fetch teachers:", error);
      }
    }

    loadInvestment();
  }, [])

  return (
    <section className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Your investments</h2>
      </div>
      <div className="bg-white rounded-lg shadow-md divide-y divide-gray-100">
        {investments.map((investment, index) => (
          <InvestmentItem
            key={index}
            name={investment.name}
            buyDate={investment.buyDate}
            buyPrice={investment.buyPrice}
            fee={investment.fee}
            quantity={investment.quantity}
          />
        ))}
      </div>
    </section>
  );
};

export default YourInvestments;
