import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StockContext = createContext();

export const Data = ({ children }) => {
  const [stockData, setStockData] = useState(null);
  const [symbol, setSymbol] = useState("NVDA"); // default symbol
  const [loading, setLoading] = useState(true);
  const FINNHUB_API = "d47jlg1r01qkdqhr1540d47jlg1r01qkdqhr154g";

  const fetchStockData = async (newSymbol) => {
    try {
      setLoading(true);
      const sym = newSymbol || symbol;

      const [quoteRes, profileRes] = await Promise.all([
        axios.get(`https://finnhub.io/api/v1/quote?symbol=${sym}&token=${FINNHUB_API}`),
        axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${sym}&token=${FINNHUB_API}`)
      ]);

      const quote = quoteRes.data;
      const profile = profileRes.data;

      const change = (quote.c - quote.pc).toFixed(2);
      const percent = ((change / quote.pc) * 100).toFixed(2);

      const lastUpdate = quote.t
        ? new Date(quote.t * 1000).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZoneName: "short",
          })
        : "N/A";

      setStockData({
        symbol: sym,
        name: profile.name || sym,
        price: quote.c || "N/A",
        open: quote.o || "N/A",
        prevClose: quote.pc || "N/A",
        mic: profile.exchange || "N/A",
        high: quote.h || "N/A",
        low: quote.l || "N/A",
        dayRange: `${quote.l || "N/A"} - ${quote.h || "N/A"}`,
        week52Range: `${profile["52WeekHigh"] || "N/A"} - ${profile["52WeekLow"] || "N/A"}`,
        profit: { value: change > 0 ? `+${change}` : change, percent: `${percent}%` },
        volume: quote.v || "N/A",
        marketCap: profile.marketCapitalization || "N/A",
        description: profile.finnhubIndustry || "No description available",
        lastUpdate,
        image: profile.logo || null,
        about: {
          ceo: profile.ceo || "N/A",
          employees: profile.employeeTotal || "N/A",
          address: profile.address || "N/A",
          phone: profile.phone || "N/A",
          website: profile.weburl || "#",
          industry: profile.finnhubIndustry || "N/A",
          sector: profile.sector || "N/A",
          country: profile.country || "N/A",
          micCode: (profile.exchange && profile.exchange.split(" ")[0]) || "N/A",
          instrumentType: profile.type || "N/A",
        },
      });

      setLoading(false);
      setSymbol(sym); // update symbol in context
    } catch (err) {
      console.error("Error fetching stock data:", err);
      setLoading(false);
    }
  };

  // Fetch default stock once
  useEffect(() => {
    fetchStockData(symbol);
  }, []);

  return (
    <StockContext.Provider value={{ stockData, fetchStockData, loading }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStockData = () => useContext(StockContext);
