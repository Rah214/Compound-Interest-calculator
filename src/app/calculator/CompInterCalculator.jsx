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
    const P = parseFloat(initialInvestment);
    const c = parseFloat(monthlyContribution);
    const r = parseFloat(estimatedInterestRate) / 100;
    const t = parseFloat(years);
    const variance = parseFloat(varianceRange) / 100;
    const n = 1;

    if (isNaN(P) || isNaN(c) || isNaN(r) || isNaN(t) || isNaN(variance)) {
      alert("Please fill out all required fields correctly.");
      return;
    }

    const maxInterest = r + variance;

    const calculateFutureValue = (rate) => {
      const x = Math.pow(1 + rate / n, n * t);
      const compoundInterest = P * x;
      const contributionInterest = c * ((x - 1) / (rate / 12));

      const futureValueWithInterest = (
        compoundInterest + contributionInterest
      ).toFixed(2);

      const futureValueWithoutInterest = P + c * 12 * t;
      return {
        futureValueWithInterest: `₹${futureValueWithInterest}`,
        futureValueWithoutInterest: `₹${futureValueWithoutInterest.toFixed(2)}`,
        interestRate: `${(rate * 100).toFixed(2)}%`,
      };
    };

    const baseResult = calculateFutureValue(r);
    const maxResult = calculateFutureValue(maxInterest);

    setResult({
      baseResult,
      maxResult,
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
              Step 2: Monthly Contribution
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
              Length of time, in years, that you plan to save.
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
              Step 5: Interest Rate Variance Range
            </h2>
            <label className="text-sm font-medium text-gray-600">
              Range of interest rates that you desire to see results for.
            </label>
            <input
              type="number"
              value={varianceRange}
              onChange={(e) => setVarianceRange(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="7%"
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
          <div className="mt-8 p-8 bg-white rounded-lg shadow-2xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Your Future Value
            </h2>
            <p className="text-xl text-gray-700 mb-8 text-center">
              In <span className="font-bold">{years}</span> years, your investment will be:
            </p>

            <div className="space-y-8">
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Interest Rate: {result.baseResult.interestRate}
                </h3>
                <div className="space-y-2">
                  <p className="text-2xl text-green-600 font-semibold">
                    With Interest: {result.baseResult.futureValueWithInterest}
                  </p>
                  <p className="text-2xl text-gray-600 font-semibold">
                    Without Interest:{" "}
                    {result.baseResult.futureValueWithoutInterest}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Maximum Interest Rate: {result.maxResult.interestRate}
                </h3>
                <p className="text-2xl text-blue-600 font-semibold">
                  With Maximum Interest:{" "}
                  {result.maxResult.futureValueWithInterest}
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default CompInterCalculator;

