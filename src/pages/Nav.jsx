import React, { useEffect, useState } from 'react'
import { useStockData } from './Data'

const Nav = () => {
  const { stockData } = useStockData()
  const [stockbar, setStockbar] = useState(false)

  useEffect(() => {
    const scroll = () => setStockbar(window.scrollY > 200)
    window.addEventListener('scroll', scroll)
    return () => window.removeEventListener('scroll', scroll)
  }, [])

  if (!stockData)
    return (
      <p className="fixed top-0 z-[999] w-full text-center text-white/60 py-2">
        Loading stock data...
      </p>
    )

  const profitPositive = parseFloat(stockData.profit.value) >= 0

  return (
    <div className="fixed top-0 z-[999] w-full h-12">
      <div className="relative z-[999] w-full h-full bg-gradient-to-b from-[#161616] via-[#161616]/80 borderb border-white/30 rounded-b-4xl to-[#161616]/0 backdrop-blur-[.3vh] flex justify-between items-center px-3">

        {/* --- Default Nav (before scroll) --- */}
        <div
          className={`Nav-bar w-full flex justify-between items-center text-white/90 transition-all duration-400 ease-in-out
            ${stockbar ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
        >
          <h1 className="cursor-pointer text-2xl font-bold">SMDS</h1>
          <div className="menu w-10 h-10 flex flex-col justify-around p-2 py-2.5 opacity-90 cursor-pointer">
            <div className="bg-white w-full h-[0.3vh] rounded-full"></div>
            <div className="bg-white w-full h-[0.3vh] rounded-full"></div>
            <div className="bg-white w-full h-[0.3vh] rounded-full"></div>
          </div>
        </div>

        {/* --- Scrolled Stock Bar --- */}
        <div
          className={`Stock-bar absolute left-0 top-0 w-full h-full flex justify-between items-center text-white px-3 transition-all duration-400 ease-in-out
            ${stockbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
        >
          <div className="flex items-center space-x-1.5">
            <div className="border border-white/20 rounded-full w-7 h-7 overflow-hidden">
              {stockData.image ? (
                <img
                  src={stockData.image}
                  alt={stockData.symbol}
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <div className="bg-white/70 w-full h-full rounded-full" />
              )}
            </div>
            <h1 className="cursor-pointer text-[2.2vh] font-bold">{stockData.symbol}</h1>
          </div>

          <div className="flex items-center space-x-3 font-bold">
            <span>${stockData.price}</span>
            <p
              className={`flex items-center ${
                profitPositive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {stockData.profit.value}
              <div className="w-[0.4vh] h-[0.4vh] mx-1 bg-white/70 rounded-full"></div>
              {stockData.profit.percent}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
