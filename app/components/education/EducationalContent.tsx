import React, { useState } from "react";

interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const investmentQuizzes: Quiz[] = [
  {
    question: "What most influences stock prices in the long term?",
    options: [
      "Daily news and rumors",
      "Company's financial performance",
      "General market sentiment",
      "Weather conditions",
    ],
    correctAnswer: 1,
    explanation:
      "While stock prices may fluctuate due to various news in the short term, a company's financial performance is the key driver of long-term stock value.",
  },
  {
    question: "What is the main advantage of cryptocurrency investments?",
    options: [
      "Government backing",
      "24/7 trading availability",
      "Zero volatility",
      "Guaranteed returns",
    ],
    correctAnswer: 1,
    explanation:
      "Unlike traditional markets, cryptocurrency markets operate 24/7, allowing for continuous trading opportunities and immediate response to market events.",
  },
];

const didYouKnowFacts = [
  "Stock market indices like the S&P 500 have historically returned about 10% annually on average over the long term.",
  "Bitcoin was the first cryptocurrency, created in 2009 by an anonymous person or group using the pseudonym Satoshi Nakamoto.",
  "Dollar-cost averaging (regular, small investments) can help reduce the risk of poor market timing in both stocks and crypto.",
];

export const EducationalContent: React.FC = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [factIndex, setFactIndex] = useState(0);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
  };

  const nextQuiz = () => {
    setCurrentQuizIndex((prev) => (prev + 1) % investmentQuizzes.length);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const nextFact = () => {
    setFactIndex((prev) => (prev + 1) % didYouKnowFacts.length);
  };

  const currentQuiz = investmentQuizzes[currentQuizIndex];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">💡 Did you know?</h3>
        <p className="text-lg mb-4">{didYouKnowFacts[factIndex]}</p>
        <button
          onClick={nextFact}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Next fact →
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">🎯 Investment Quiz</h3>
        <div className="space-y-4">
          <p className="text-lg font-medium">{currentQuiz.question}</p>
          <div className="space-y-2">
            {currentQuiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-3 text-left rounded-lg transition-colors ${
                  selectedAnswer === null
                    ? "hover:bg-gray-100 bg-white"
                    : selectedAnswer === index
                    ? index === currentQuiz.correctAnswer
                      ? "bg-green-100 border-green-500"
                      : "bg-red-100 border-red-500"
                    : index === currentQuiz.correctAnswer && showExplanation
                    ? "bg-green-100 border-green-500"
                    : "bg-gray-50"
                } border`}
              >
                {option}
              </button>
            ))}
          </div>
          {showExplanation && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">{currentQuiz.explanation}</p>
              <button
                onClick={nextQuiz}
                className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Next question →
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">📘 Investment Basics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-bold mb-2">What is Compound Interest?</h4>
            <p>
              Compound interest means you earn interest not only on your initial
              investment but also on the previously accumulated interest,
              creating exponential growth over time.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-bold mb-2">What is Market Capitalization?</h4>
            <p>
              Market capitalization (or market cap) is the total value of a
              company's shares or a cryptocurrency's tokens in circulation,
              calculated by multiplying the current price by the total supply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
