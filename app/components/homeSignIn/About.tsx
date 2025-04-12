import React from "react";

const About = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">
            About Cash Smart
          </h2>
          <div className="space-y-6 text-gray-600 text-lg">
            <p className="leading-relaxed">
              Cash Smart is your intelligent financial companion, designed to
              help you take control of your personal finances and make smarter
              money decisions. Our application provides powerful tools and
              insights to manage your expenses, track your income, and achieve
              your financial goals.
            </p>
            <p className="font-semibold text-xl text-gray-700">
              With Cash Smart, you can:
            </p>
            <ul className="list-disc pl-8 space-y-4 text-lg">
              <li className="leading-relaxed">
                See the most popular stocks and cryptocurrencies, and track your
                own investments
              </li>
              <li className="leading-relaxed">
                Helps you understand the world of finance and assess the risks
                of your investments
              </li>
              <li className="leading-relaxed">
                Track your daily expenses and income in real-time
              </li>
              <li className="leading-relaxed">
                Set and monitor your financial goals
              </li>
              <li className="leading-relaxed">
                Get personalized insights about your spending habits
              </li>
              <li className="leading-relaxed">
                Create and manage budgets for different categories
              </li>
              <li className="leading-relaxed">
                Receive smart recommendations for saving money
              </li>
              <li className="leading-relaxed">
                Visualize your financial progress through intuitive charts
              </li>
            </ul>
            <p className="leading-relaxed">
              Whether you're looking to save more, reduce unnecessary expenses,
              or simply want a better overview of your financial situation, Cash
              Smart provides the tools and guidance you need to make informed
              financial decisions and build a more secure financial future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
