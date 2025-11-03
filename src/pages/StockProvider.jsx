// 📁 StockProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [symbol, setSymbol] = useState("AAPL");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);

  const stockdataAPI = "EH66amcigezyIpMlfy7FjM1JjMCD1D0YtQ5CTMC4";
  const finnhubAPI = "d43rh49r01qge0cv7f90d43rh49r01qge0cv7f9g";

  const fetchStockData = async (symbol) => {
    try {
      setLoading(true);

      const [res1, res2] = await Promise.all([
        axios.get(
          `https://api.stockdata.org/v1/data/quote?symbols=${symbol}&api_token=${stockdataAPI}`
        ),
        axios.get(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${finnhubAPI}`
        ),
      ]);

      const quote = res1.data.data?.[0];
      const profile = res2.data;
      if (!quote) throw new Error("Stock not found.");

      const change = (quote.price - quote.previous_close_price).toFixed(2);
      const percent = ((change / quote.previous_close_price) * 100).toFixed(2);

      const data = {
        symbol: quote.ticker,
        name: profile.name || quote.name || "N/A",
        price: quote.price,
        profit: {
          value: change > 0 ? `+${change}` : change,
          percent: `${percent}%`,
        },
        marketCap: quote.market_cap || profile.marketCapitalization || "N/A",
        about: {
          ceo: profile.ceo || "N/A",
          sector: profile.finnhubIndustry || "N/A",
          country: profile.country || "N/A",
        },
        image:
          profile.logo ||
          (profile.weburl
            ? `https://logo.clearbit.com/${
                new URL(profile.weburl).hostname
              }`
            : null),
      };

      setStockData(data);
    } catch (err) {
      console.error(err);
      setStockData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData(symbol);
  }, [symbol])

  return (
    <StockContext.Provider
      value={{ stockData, loading, symbol, setSymbol, fetchStockData }}
    >
      {children}
    </StockContext.Provider>
  )
}

export const Data = () => useContext(StockContext);
