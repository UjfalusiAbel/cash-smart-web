import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { TooltipInfo } from "../education/TooltipInfo";
import { WhatIfSimulator } from "../education/WhatIfSimulator";
import { EducationalContent } from "../education/EducationalContent";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface InvestmentChartsProps {
  investmentName: string;
  currentPrice: number;
  currentValue: number;
}

interface AlphaVantageData {
  "Time Series (Daily)": {
    [key: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  };
}

const tooltipTexts = {
  currentPrice:
    "Az aktuális piaci ár, amennyiért most lehet kereskedni a részvénnyel.",
  totalValue:
    "A teljes befektetésed jelenlegi értéke az aktuális piaci áron számolva.",
  profitLoss:
    "A különbség a befektetett összeg és a jelenlegi érték között. Pozitív szám esetén nyereséged van.",
  dailyChange:
    "Az árfolyam változása az előző napi záróárhoz képest százalékban kifejezve.",
};

const InvestmentCharts: React.FC<InvestmentChartsProps> = ({
  investmentName,
  currentPrice,
  currentValue,
}) => {
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set purchase date to March 29, 2025 (for demo purposes)
  const purchaseDate = new Date("2025-03-29T00:00:00.000Z");
  purchaseDate.setHours(0, 0, 0, 0);

  // Simulate larger investment value
  const simulatedCurrentValue = currentValue * 10;
  const purchasePrice = currentPrice * 0.8;
  const purchaseValue = simulatedCurrentValue * 0.8;
  const profitLoss = simulatedCurrentValue - purchaseValue;
  const profitLossPercentage =
    ((simulatedCurrentValue - purchaseValue) / purchaseValue) * 100;

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Extract stock symbol from investment name (assuming format like "Tesla Stock" -> "TSLA")
        const stockSymbol = investmentName.includes("Tesla")
          ? "TSLA"
          : investmentName.includes("Apple")
          ? "AAPL"
          : "MSFT"; // Default to Microsoft if unknown

        const API_KEY = "2001YTJ7GJIYXMD2";
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stock data");
        }

        const data: AlphaVantageData = await response.json();

        if (!data["Time Series (Daily)"]) {
          throw new Error("Invalid data format received from API");
        }

        // Convert the data to arrays
        const timeSeriesData = data["Time Series (Daily)"];
        const dates = Object.keys(timeSeriesData).slice(0, 30).reverse();
        const prices = dates.map((date) =>
          parseFloat(timeSeriesData[date]["4. close"])
        );

        setPriceHistory(prices);
        setLabels(dates.map((date) => new Date(date).toLocaleDateString()));
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError("Failed to load stock data. Please try again later.");

        // Fallback to mock data if API fails
        const mockPrices = Array.from(
          { length: 30 },
          (_, i) => currentPrice * (1 + Math.sin(i / 5) * 0.1)
        );
        const mockDates = Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return date.toLocaleDateString();
        });

        setPriceHistory(mockPrices);
        setLabels(mockDates);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [investmentName, currentPrice]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Stock Price (USD)",
        data: priceHistory,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
        borderWidth: 2,
      },
      {
        label: "Purchase Point",
        data: labels.map((dateStr) => {
          const date = new Date(dateStr);
          // Use the actual price from priceHistory for the purchase point
          const index = labels.findIndex(
            (d) =>
              new Date(d).toLocaleDateString() ===
              purchaseDate.toLocaleDateString()
          );
          return date.toLocaleDateString() === purchaseDate.toLocaleDateString()
            ? priceHistory[index]
            : 0;
        }),
        borderColor: "rgb(220, 38, 38)",
        backgroundColor: "rgb(220, 38, 38)",
        pointRadius: labels.map((dateStr) => {
          const date = new Date(dateStr);
          return date.toLocaleDateString() === purchaseDate.toLocaleDateString()
            ? 8
            : 0;
        }),
        pointStyle: "circle",
        showLine: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${investmentName} Price History (Last 30 Days)`,
        font: {
          size: 16,
          weight: "bold" as const,
        },
        padding: 20,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(context.parsed.y);
          },
        },
        padding: 10,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 12,
          },
          callback: function (value: any) {
            return "$" + value.toLocaleString();
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    interaction: {
      intersect: false,
      mode: "nearest" as const,
    },
  };

  if (loading) {
    return <div className="text-center py-8">Loading stock data...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold mb-2">Current Price</h3>
            <TooltipInfo text={tooltipTexts.currentPrice} />
          </div>
          <p className="text-2xl font-bold">${currentPrice.toLocaleString()}</p>
          <div className="flex items-center">
            <p className="text-sm text-gray-500 mt-1">
              Daily Change:{" "}
              {(
                ((priceHistory[priceHistory.length - 1] -
                  priceHistory[priceHistory.length - 2]) /
                  priceHistory[priceHistory.length - 2]) *
                100
              ).toFixed(2)}
              %
            </p>
            <TooltipInfo text={tooltipTexts.dailyChange} />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold mb-2">Total Value</h3>
            <TooltipInfo text={tooltipTexts.totalValue} />
          </div>
          <p className="text-2xl font-bold">
            ${simulatedCurrentValue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Purchase Value: ${purchaseValue.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold mb-2">Profit/Loss</h3>
            <TooltipInfo text={tooltipTexts.profitLoss} />
          </div>
          <p
            className={`text-2xl font-bold ${
              profitLoss >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${profitLoss.toLocaleString()}
          </p>
          <p
            className={`text-sm ${
              profitLoss >= 0 ? "text-green-500" : "text-red-500"
            } mt-1`}
          >
            {profitLossPercentage.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <Line data={chartData} options={chartOptions} />
        <div className="mt-2 text-center text-sm text-gray-500">
          <p>
            Purchase Date: {purchaseDate.toLocaleDateString()} at $
            {purchasePrice.toLocaleString()}
          </p>
        </div>
      </div>

      <WhatIfSimulator
        currentPrice={currentPrice}
        priceHistory={priceHistory}
      />

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Investment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Purchase Price</p>
            <p className="font-medium">${purchasePrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Price</p>
            <p className="font-medium">${currentPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Purchase Value</p>
            <p className="font-medium">${purchaseValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Value</p>
            <p className="font-medium">
              ${simulatedCurrentValue.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Profit/Loss</p>
            <p
              className={`font-medium ${
                profitLoss >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ${profitLoss.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Profit/Loss Percentage</p>
            <p
              className={`font-medium ${
                profitLoss >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {profitLossPercentage.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      <EducationalContent />
    </div>
  );
};

export default InvestmentCharts;
