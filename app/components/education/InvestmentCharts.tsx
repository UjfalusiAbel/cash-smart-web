"use client";

import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Statistics {
  allTimeHigh: number;
  allTimeLow: number;
  avgVolume: number;
  marketCap: number;
}

interface InvestmentChartsProps {
  priceChartData: any;
  volumeChartData: any;
  chartOptions: any;
  statistics: Statistics;
}

export default function InvestmentCharts({
  priceChartData,
  volumeChartData,
  chartOptions,
  statistics,
}: InvestmentChartsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Investment Performance</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-2">Historical Price Chart</h4>
          <div className="h-64">
            <Line data={priceChartData} options={chartOptions} />
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Volume Analysis</h4>
          <div className="h-64">
            <Bar data={volumeChartData} options={chartOptions} />
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Key Statistics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">All-Time High</p>
              <p className="text-lg font-medium">${statistics.allTimeHigh}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">All-Time Low</p>
              <p className="text-lg font-medium">${statistics.allTimeLow}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Daily Volume</p>
              <p className="text-lg font-medium">{statistics.avgVolume}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Market Cap</p>
              <p className="text-lg font-medium">${statistics.marketCap}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
