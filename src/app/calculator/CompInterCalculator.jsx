"use client";
import React, { useState } from "react";

const CompInterCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [years, setYears] = useState("");
  const [estimatedInterestRate, setEstimatedInterestRate] = useState("");
  const [varianceRange, setVarianceRange] = useState("");

  const [compoundFrequency, setCompoundFrequency] = useState("Annually");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const principal = parseFloat(initialInvestment);
    const month = parseFloat(monthlyContribution);
    const interest = parseFloat(estimatedInterestRate) / 100;
    const time = parseFloat(years);

    if (isNaN(principal) || isNaN(month) || isNaN(interest) || isNaN(time)) {
      alert("Please fill out all required fields correctly.");
      return;
    }

    const n = 1;
    let futureValueWithInterest =
      principal * Math.pow(1 + interest / n, n * time);

    for (let i = 1; i <= time * 12; i++) {
      // Monthly contribution compounded based on remaining periods
      futureValueWithInterest +=
        month * Math.pow(1 + interest / n, n * time - i / 12);
    }

    const futureValueWithoutInterest = principal + month * 12 * time;

    setResult({
      futureValueWithInterest: `₹${futureValueWithInterest.toFixed(2)}`,
      futureValueWithoutInterest: `₹${futureValueWithoutInterest.toFixed(2)}`,
      interestRate: `${estimatedInterestRate}%`,
    });
  };

  const resetForm = () => {
    setInitialInvestment("");
    setMonthlyContribution("");
    setYears("");
    setEstimatedInterestRate("");
    setVarianceRange("");
    setCompoundFrequency("Annually");
    setResult(null);
  };

  return (
    <section className="bg-gray-200 min-h-screen flex items-center justify-center py-12">
      <div className="bg-sky-50 w-full max-w-3xl rounded-lg shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Compound Interest Calculator
        </h1>
        <p className="text-lg text-center text-gray-600">
          Discover how your money can grow with compound interest.
        </p>

        <div className="space-y-6">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Step 1: Initial Investment
            </h2>
            <label className="text-sm font-medium text-gray-600">
              Amount of money that you have available to invest initially.
            </label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="₹0"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Step 2: Contribute
            </h2>
            <label className="text-sm font-medium text-gray-600">
            Amount that you plan to add to the principal every month.
              
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="₹0"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Step 3: Duration
            </h2>
            <label className="text-sm font-medium text-gray-600">
              Lenght of time , in years, that you plan to save.
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="5 years"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Step 4: Interest Rate
            </h2>
            <label className="text-sm font-medium text-gray-600">
              Your estimated annual interest rate (%)
            </label>
            <input
              type="number"
              value={estimatedInterestRate}
              onChange={(e) => setEstimatedInterestRate(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="5%"
            />
          </div>

          <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Step 5: Interest rate variance range
            </h2>
            <label className="text-sm font-medium text-gray-600">
             Range of interest rates that you desire to see result for.
            </label>
            <input
              type="number"
              value={estimatedInterestRate}
              onChange={(e) => setEstimatedInterestRate(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="5%"
            />
             
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Step 6: Compound Frequency
            </h2>
            <label className="text-sm font-medium text-gray-600">
              Time per year that interest will be compounded.
            </label>
            <select
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Annually</option>
            </select>
          </div>

          <div className="flex pt-6 justify-between">
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={calculate}
            >
              Calculate
            </button>
            <button
              className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={resetForm}
            >
              Reset
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-8 p-6 bg-green-100 rounded-lg text-center shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">
              Your Future Value
            </h2>
            <p className="text-xl text-gray-700 mt-2">
              In {years} years, your investment will be:
            </p>
            <p className="text-3xl text-green-600 font-semibold mt-4">
              With Interest: {result.futureValueWithInterest}
            </p>
            <p className="text-3xl text-gray-600 font-semibold mt-4">
              Without Interest: {result.futureValueWithoutInterest}
            </p>
            <p className="text-lg text-gray-800 mt-4">
              Estimated Interest Rate: {result.interestRate}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompInterCalculator;


//  Just only add variance range input field in the form and calculate the future value with interest for the range of interest rates.