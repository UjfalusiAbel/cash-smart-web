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

  const handleAddFloat = (e: React.ChangeEvent<HTMLInputElement>, func:React.Dispatch<React.SetStateAction<number>>) => {
    const parsed = parseFloat(e.target.value);
    const decimal2 = parsed.toFixed(12);
    const rateParsed = parseFloat(decimal2);
    func(rateParsed);
  }

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [buyDate, setBuyDate] = useState("");
  const [buyPrice, setBuyPrice] = useState<number>(0.0);
  const [fee, setFee] = useState<number>(0.0);
  const [quantity, setQuantity] = useState<number>(0.0);

  const handleAddInvestment = async () => {
    const payload: InvestmentDTO = {
      name,
      buyDate: new Date(buyDate),
      buyPrice: Number(buyPrice),
      fee: Number(fee),
      quantity: Number(quantity)
    };
    const formData = new FormData();
    formData.append("name", name);
    formData.append("buyDate", buyDate);
    formData.append("buyPrice", buyPrice.toString());
    formData.append("fee", fee.toString());
    formData.append("quantity", quantity.toString());

    const response = await fetch(`${apiURL}/investments/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      body: formData
    });
  };

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
      <div>
        <button className="rounded-xl bg-gray-400 p-2 m-3 hover:brightness-110" onClick={() => setShowForm(!showForm)}>
          <h2 className="text-2xl font-bold text-black p-1">
            Add investment
          </h2>
        </button>
      </div>
      {showForm && (
        <div className="bg-white p-4 rounded-xl shadow-md mb-4 space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="datetime-local"
            className="w-full p-2 border rounded text-black"
            value={buyDate}
            onChange={(e) => setBuyDate(e.target.value)}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Buy Price"
            className="w-full p-2 border rounded text-black"
            value={buyPrice}
            onChange={(e) => setBuyPrice(parseFloat(e.target.value))}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Fee"
            className="w-full p-2 border rounded text-black"
            value={fee}
            onChange={(e) => setFee(parseFloat(e.target.value))}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Quantity"
            className="w-full p-2 border rounded text-black"
            value={quantity}
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
          />
          <button onClick={handleAddInvestment} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Submit
          </button>
        </div>
      )}

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
