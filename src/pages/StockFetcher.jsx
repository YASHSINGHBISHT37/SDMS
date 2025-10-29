import React, { useState } from "react";
import axios from "axios";

export default function StockFetcher() {
  const [symbol, setSymbol] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState(null);

  // ✅ Handle typing + show suggestions
  const handleInputChange = async (e) => {
    const value = e.target.value.toUpperCase();
    setSymbol(value);

    // Only search if 2+ letters entered
    if (value.length > 1) {
      try {
        const response = await axios.get(
          `https://finnhub.io/api/v1/search?q=${value}&token=d415j31r01qo6qdf1ga0d415j31r01qo6qdf1gag`
        );
        setSuggestions(response.data.result.slice(0, 5)); // limit to top 5
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    } else {
      setSuggestions([]);
    }
  };

  // ✅ Fetch stock data from your Flask backend
  const fetchStock = async (chosenSymbol) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/api/stock?symbol=${chosenSymbol || symbol}`
      );
      setData(res.data);
      setSuggestions([]);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ When user clicks a suggestion
  const handleSuggestionClick = (s) => {
    setSymbol(s.symbol);
    fetchStock(s.symbol);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4 text-center">📈 Stock Data Fetcher</h1>

        {/* Input Field */}
        <div className="relative">
          <input
            type="text"
            value={symbol}
            onChange={handleInputChange}
            placeholder="Enter stock symbol (e.g., AAPL)"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
          />

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-lg mt-1 max-h-48 overflow-y-auto">
              {suggestions.map((s) => (
                <li
                  key={s.symbol}
                  onClick={() => handleSuggestionClick(s)}
                  className="p-2 hover:bg-gray-700 cursor-pointer transition"
                >
                  <span className="font-semibold">{s.symbol}</span> — {s.description}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Fetch Button */}
        <button
          onClick={() => fetchStock()}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition"
        >
          Fetch Data
        </button>

        {/* Display Result */}
        {data && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-bold mb-2">{data.name}</h2>
            <p>Exchange: {data.exchange}</p>
            <p>Price: ${data.price}</p>
            <img
              src={data.logo}
              alt={data.name}
              className="w-20 h-20 mx-auto mt-3 rounded-full bg-white p-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}
