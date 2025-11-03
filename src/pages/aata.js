import React from 'react';
  
  const Aata = () =>  {
	return (
	  <div>
	  </div>
	);
  }
  
  export default Aata;
  // import React, { useEffect, useState } from 'react';
// import axios from "axios";

// const Data = ({ symbol = 'AAPL' }) => {
//     const [stockData, setStockData] = useState(null);

//     const stockdataAPI = "EH66amcigezyIpMlfy7FjM1JjMCD1D0YtQ5CTMC4";
//     const finnhubAPI = "d43rh49r01qge0cv7f90d43rh49r01qge0cv7f9g";

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [res1, res2] = await Promise.all([
//                     axios.get(`https://api.stockdata.org/v1/data/quote?symbols=${symbol}&api_token=${stockdataAPI}`),
//                     axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${finnhubAPI}`)
//                 ]);

//                 const quote = res1.data.data?.[0];
//                 const profile = res2.data;

//                 if (!quote) throw new Error("Stock not found in StockData.org");

//                 const change = (quote.price - quote.previous_close_price).toFixed(2);
//                 const percent = ((change / quote.previous_close_price) * 100).toFixed(2);

//                 const data = {
//                     symbol: quote.ticker,
//                     name: profile.name || quote.name || "N/A",
//                     price: quote.price,
//                     open: quote.day_open,
//                     prevClose: quote.previous_close_price,
//                     profit: {
//                         value: change > 0 ? `+${change}` : change,
//                         percent: `${percent}%`,
//                     },
//                     volume: quote.volume || "N/A",
//                     marketCap: quote.market_cap || profile.marketCapitalization || "N/A",
//                     dayRange: `${quote.day_low || "N/A"} - ${quote.day_high || "N/A"}`,
//                     week52Range: `${quote["52_week_low"] || "N/A"} - ${quote["52_week_high"] || "N/A"}`,
//                     lastUpdate: new Date(quote.last_trade_time).toLocaleString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                         hour: "numeric",
//                         minute: "2-digit",
//                         timeZone: "America/New_York",
//                         timeZoneName: "short",
//                     }),
//                     companyDescription: profile.description || "No company description available.",
//                     dataSource: "StockData.org + Finnhub.io",
//                     about: {
//                         ceo: profile.ceo || "N/A",
//                         employees: profile.employees || "N/A",
//                         address:
//                             profile.address ||
//                             `${profile.city || ""}, ${profile.state || ""}, ${profile.country || ""}`.trim() ||
//                             "N/A",
//                         phone: profile.phone || "N/A",
//                         website: profile.weburl || "N/A",
//                         instrumentType: "Equity",
//                         sector: profile.finnhubIndustry || "N/A",
//                         industry: profile.finnhubIndustry || "N/A",
//                         country: profile.country || "N/A",
//                         micCode: quote.mic_code || profile.exchange || "N/A",
//                     },
//                     image:
//                         profile.logo ||
//                         (profile.weburl ? `https://logo.clearbit.com/${new URL(profile.weburl).hostname}` : null),
//                 };

//                 setStockData(data);
//             } catch (error) {
//                 console.error('Error Fetching Stock Data:', error);
//             }
//         };

//         fetchData(); // ✅ call the function
//     }, [symbol]);

//     if (!stockData) return <div className="text-white">Loading...</div>;

//     return (
//         <div className="text-white">
//             <h1>{stockData.name} ({stockData.symbol})</h1>
//             <p>Price: ${stockData.price}</p>
//             <p>Change: {stockData.profit.value} ({stockData.profit.percent})</p>
//             <p>Market Cap: {stockData.marketCap}</p>
//             <p>CEO: {stockData.about.ceo}</p>
//         </div>
//     );
// };

// export default Data;
