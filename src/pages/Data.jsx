// src/pages/Data.jsx
import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const StockContext = createContext()

export const Data = ({ children }) => {
  const [stockData, setStockData] = useState(null)
  const symbol = 'AAPL'

  useEffect(() => {
    async function fetchStockData() {
      try {
        const stockdataAPI = "EH66amcigezyIpMlfy7FjM1JjMCD1D0YtQ5CTMC4";
        const finnhubAPI = "d43rh49r01qge0cv7f90d43rh49r01qge0cv7f9g";

        const [quoteRes, profileRes] = await Promise.all([
          axios.get(
            `https://api.stockdata.org/v1/data/quote?symbols=${symbol}&api_token=${stockdataAPI}`
          ),
          axios.get(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${finnhubAPI}`
          ),
        ])

        const stock = quoteRes.data.data?.[0]
        const profile = profileRes.data;
        if (!stock) throw new Error("Stock not found");

        const change = (stock.price - stock.previous_close_price).toFixed(2);
        const percent = ((change / stock.previous_close_price) * 100).toFixed(2);

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
          week52Range: `${stock["52_week_low"] || "N/A"} - ${stock["52_week_high"] || "N/A"}`,
          lastUpdate: new Date(stock.last_trade_time).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            timeZone: "America/New_York",
            timeZoneName: "short",
          }),
          description: profile.description || "No description available.",
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
        }

        setStockData(data);
      } catch (err) {
        console.error("Error fetching stock data:", err);
      }
    }

    fetchStockData();
  }, [symbol]);

  return (
    <StockContext.Provider value={{ stockData, setStockData }}>
      {children}
    </StockContext.Provider>
  );
}

export const useStockData = () => useContext(StockContext)
