import useCurrency from "./customhooks/useCurrency";
import { useState, useEffect } from "react";

function App() {
  const [fromCurrency, setFromCurrency] = useState("inr");
  const [toCurrency, setToCurrency] = useState("usd");
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  const currency = useCurrency(fromCurrency);

  useEffect(() => {
    setToAmount(currency[toCurrency] * fromAmount);
  }, [fromCurrency, toCurrency, fromAmount, currency]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          Currency Converter
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(Number(e.target.value))}
                className="w-full text-right pl-10 pr-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Enter amount"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400">
                Amount
              </span>
            </div>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white transition-colors"
            >
              {Object.keys(currency).map((curr) => (
                <option key={curr} value={curr}>
                  {curr.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center"></div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <input
                type="number"
                value={toAmount.toFixed(2)}
                readOnly
                className="w-full text-right pl-10 pr-4 py-2 border-2 border-indigo-200 rounded-lg bg-gray-50"
                placeholder="Converted amount"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400">
                Amount
              </span>
            </div>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white transition-colors"
            >
              {Object.keys(currency).map((curr) => (
                <option key={curr} value={curr}>
                  {curr.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            1 {fromCurrency.toUpperCase()} = {currency[toCurrency]}{" "}
            {toCurrency.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
