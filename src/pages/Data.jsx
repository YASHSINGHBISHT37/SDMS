import React, { useEffect, useState } from "react";
import axios from "axios";

const Data = ({ symbol = "AAPL" }) => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    async function fetchStockData() {
      try {
        const stockdataAPI = "EH66amcigezyIpMlfy7FjM1JjMCD1D0YtQ5CTMC4"; // your StockData.org key
        const finnhubAPI = "d43rh49r01qge0cv7f90d43rh49r01qge0cv7f9g"; // your Finnhub key

        // Fetch both APIs in parallel
        const [quoteRes, profileRes] = await Promise.all([
          axios.get(
            `https://api.stockdata.org/v1/data/quote?symbols=${symbol}&api_token=${stockdataAPI}`
          ),
          axios.get(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${finnhubAPI}`
          ),
        ]);

        const stock = quoteRes.data.data?.[0];
        const profile = profileRes.data;

        if (!stock) throw new Error("Stock not found in StockData.org");

        // Compute change and percent
        const change = (stock.price - stock.previous_close_price).toFixed(2);
        const percent = ((change / stock.previous_close_price) * 100).toFixed(2);

        // Build data object
        const data = {
          symbol: stock.ticker,
          name: stock.name,
          price: stock.price,
          open: stock.day_open,
          prevClose: stock.previous_close_price,
          profit: {
            value: change > 0 ? `+${change}` : change,
            percent: `${percent}%`,
          },
          volume: stock.volume || "N/A",
          marketCap: stock.market_cap || profile.marketCapitalization || "N/A",
          dayRange: `${stock.day_low || "N/A"} - ${stock.day_high || "N/A"}`,
          week52Range: `${stock["52_week_low"] || "N/A"} - ${
            stock["52_week_high"] || "N/A"
          }`,
          lastUpdate: new Date(stock.last_trade_time).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            timeZone: "America/New_York",
            timeZoneName: "short",
          }),
          companyDescription:
            profile.description ||
            "No company description available for this stock.",
          dataSource: "StockData.org + Finnhub.io",
          about: {
            ceo: profile.ceo || "N/A",
            employees: profile.employees || "N/A",
            address:
              profile.address ||
              `${profile.city || ""}, ${profile.state || ""}, ${profile.country || ""}`.trim() ||
              "N/A",
            phone: profile.phone || "N/A",
            website: profile.weburl || "N/A",
            instrumentType: "Equity",
            sector: profile.finnhubIndustry || "N/A",
            industry: profile.finnhubIndustry || "N/A",
            country: profile.country || "N/A",
            micCode: stock.mic_code || profile.exchange || "N/A",
          },
          image:
            profile.logo ||
            (profile.weburl
              ? `https://logo.clearbit.com/${new URL(profile.weburl).hostname}`
              : null),
        };

        setStockData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    }

    fetchStockData();
  }, [symbol]);

  if (!stockData) return <div>Loading...</div>;

  return (
    <div className="p-5 text-white bg-[#161616] rounded-xl shadow-md z-99">
      <div className="flex items-center space-x-3">
        {stockData.image && (
          <img
            src={stockData.image}
            alt={stockData.name}
            className="w-14 h-14 rounded-full bg-white/10"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">
            {stockData.name} ({stockData.symbol})
          </h1>
          <p className="text-gray-400 text-sm">{stockData.dataSource}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xl font-semibold">
          ${stockData.price}{" "}
          <span
            className={`ml-2 text-sm ${
              parseFloat(stockData.profit.value) >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {stockData.profit.value} ({stockData.profit.percent})
          </span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-y-2 mt-3 text-sm">
        <p>Open: {stockData.open}</p>
        <p>Prev Close: {stockData.prevClose}</p>
        <p>Volume: {stockData.volume}</p>
        <p>Market Cap: {stockData.marketCap}</p>
        <p>Day Range: {stockData.dayRange}</p>
        <p>52W Range: {stockData.week52Range}</p>
        <p>Last Update: {stockData.lastUpdate}</p>
      </div>

      <h2 className="mt-4 font-semibold text-lg text-amber-400">About</h2>
      <div className="text-sm space-y-1">
        <p>CEO: {stockData.about.ceo}</p>
        <p>Employees: {stockData.about.employees}</p>
        <p>Address: {stockData.about.address}</p>
        <p>Phone: {stockData.about.phone}</p>
        <p>
          Website:{" "}
          <a
            href={stockData.about.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            {stockData.about.website}
          </a>
        </p>
        <p>Instrument Type: {stockData.about.instrumentType}</p>
        <p>Sector: {stockData.about.sector}</p>
        <p>Industry: {stockData.about.industry}</p>
        <p>Country: {stockData.about.country}</p>
        <p>MIC Code: {stockData.about.micCode}</p>
      </div>

      <p className="mt-4 text-gray-400 text-sm">
        {stockData.companyDescription}
      </p>
    </div>
  );
};

export default Data;
