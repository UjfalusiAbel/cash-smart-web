"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import InvestmentCharts from "../components/statistics/InvestmentCharts";

const InvestmentChartsPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-cassini to-yellow-cassini py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white"> Analysis</h1>
          <Link
            href="/yourInvestments"
            className="text-white hover:text-gray-200 transition-colors"
          >
            Back to Investments
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <InvestmentCharts
            investmentName={ ""}
            currentPrice={parseFloat("0")}
            currentValue={parseFloat("0")}
          />
        </div>
      </div>
    </div>
  );
};

export default InvestmentChartsPage;
