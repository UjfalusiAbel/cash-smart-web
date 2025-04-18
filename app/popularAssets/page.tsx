"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "../components/contexts/AuthProvider";
import { useRouter } from "next/navigation";

const PopularAssets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<number | null>(null);
  const [holdings, setHoldings] = useState<Record<number, string>>({});
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const toLogin = () => {
    router.push("/login");
  };

  const assets = [
    {
      id: 1,
      name: "AAPL",
      type: "Stock",
      price: "175.84",
      change: "+2.3%",
      isPositive: true,
    },
    {
      id: 2,
      name: "BTC",
      type: "Crypto",
      price: "68,420",
      change: "+1.8%",
      isPositive: true,
    },
    {
      id: 3,
      name: "TSLA",
      type: "Stock",
      price: "172.63",
      change: "-0.5%",
      isPositive: false,
    },
    {
      id: 4,
      name: "ETH",
      type: "Crypto",
      price: "3,890",
      change: "+3.2%",
      isPositive: true,
    },
    {
      id: 5,
      name: "MSFT",
      type: "Stock",
      price: "420.55",
      change: "+1.2%",
      isPositive: true,
    },
    {
      id: 6,
      name: "GOOGL",
      type: "Stock",
      price: "142.38",
      change: "-0.8%",
      isPositive: false,
    },
    {
      id: 7,
      name: "AMZN",
      type: "Stock",
      price: "178.75",
      change: "+1.5%",
      isPositive: true,
    },
    {
      id: 8,
      name: "META",
      type: "Stock",
      price: "485.58",
      change: "+2.1%",
      isPositive: true,
    },
    {
      id: 9,
      name: "SOL",
      type: "Crypto",
      price: "125.43",
      change: "+4.2%",
      isPositive: true,
    },
    {
      id: 10,
      name: "DOGE",
      type: "Crypto",
      price: "0.15",
      change: "-1.2%",
      isPositive: false,
    },
  ];

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssetClick = (assetId: number) => {
    setSelectedAsset(assetId);
  };

  const handleHoldingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setHoldings({ ...holdings, [selectedAsset!]: value });
    }
  };

  const handleCloseModal = () => {
    setSelectedAsset(null);
  };

  const calculateTotalValue = (assetId: number) => {
    const asset = assets.find((a) => a.id === assetId);
    const holdingValue = holdings[assetId] || "0";
    if (asset && holdingValue) {
      const total = parseFloat(asset.price) * parseFloat(holdingValue);
      return isNaN(total) ? "0.00" : total.toFixed(2);
    }
    return "0.00";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-cassini to-yellow-cassini py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Popular Assets</h1>
          <Link href="/" className="text-white hover:text-gray-200 transition-colors">
            Back to Home
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search assets..."
            className="w-full px-4 py-2 border text-slate-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-cassini bg-white bg-opacity-90"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="bg-white bg-opacity-90 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleAssetClick(asset.id)}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className=" text-slate-800 text-[20px] font-bold">{asset.name}</h3>
                  <span className="text-slate-700 text-[16px]">{asset.type}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${asset.isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {asset.change}
                </span>
              </div>
              <div className="text-xl font-bold text-slate-900">${asset.price}</div>
              {holdings[asset.id] && (
                <div className="mt-2 text-sm text-slate-800">
                  Holdings: {holdings[asset.id]} | Total: $
                  {calculateTotalValue(asset.id)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedAsset !== null && isAuthenticated && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {assets.find((a) => a.id === selectedAsset)?.name} Holdings
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                Current price: $
                {assets.find((a) => a.id === selectedAsset)?.price}
              </p>
              <label className="block text-gray-700 mb-2">
                Enter your holdings:
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-cassini"
                value={holdings[selectedAsset] || ""}
                onChange={handleHoldingsChange}
                placeholder="0.00"
                autoFocus
              />
            </div>
            {holdings[selectedAsset] && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  Total value: ${calculateTotalValue(selectedAsset)}
                </p>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <button onClick={handleCloseModal} className="px-4 py-2 bg-green-cassini text-white rounded-lg hover:bg-opacity-90 transition-colors">
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PopularAssets;
