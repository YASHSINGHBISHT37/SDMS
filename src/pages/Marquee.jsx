import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import axios from 'axios'

const Marquee = () => {
    const FINNHUB_API = "d47jlg1r01qkdqhr1540d47jlg1r01qkdqhr154g"
    const symbols = ["AAPL", "TSLA", "GOOGL", "AMZN", "NVDA", "META", "NFLX", "MSFT"]
    const [stocks, setStocks] = useState([])

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const results = await Promise.all(
                    symbols.map(async (symbol) => {
                        const [quoteRes, profileRes] = await Promise.all([
                            axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API}`),
                            axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API}`)
                        ])

                        const quote = quoteRes.data
                        const profile = profileRes.data

                        return {
                            symbol,
                            name: profile.name || symbol,
                            logo: profile.logo || "/placeholder-logo.png", // ✅ show logo
                            price: quote.c?.toFixed(2) || "N/A",
                            change: (quote.d || 0).toFixed(2),
                            percent: (quote.dp || 0).toFixed(2),
                        }
                    })
                )
                setStocks(results)
            } catch (err) {
                console.error("Error fetching stock data:", err)
            }
        }
        fetchStockData()
    }, [])

    // ✅ Remove leading comma
    const loopStocks = [...stocks, ...stocks, ...stocks, ...stocks]

    return (
        <div className='w-full h-full z-999'>
            <div className='Top-Stock mt-4 relative overflow-hidden h-auto flex justify-center'>

                {/* Left fade */}
                <div className='absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#161616] to-transparent z-20 pointer-events-none' />

                {/* Right fade */}
                <div className='absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#161616] to-transparent z-20 pointer-events-none' />

                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
                    className='cont flex items-center space-x-3 w-max'
                >
                    {loopStocks.map((item, i) => (
                        <div
                            key={i}
                            className='rounded-full backdrop-blur-[0.6vh] border border-white/20 bg-white/7 py-1.5 px-2 pr-3 w-auto flex flex-shrink-0 items-center space-x-2.5 bg-[#161616'>
                            {/* ✅ Show company logo */}
                            <img src={item.logo} alt={item.symbol} className='w-10 h-10 rounded-full border border-white/30 object-contain' />

                            <div className='flex justify-between w-full space-x-6'>
                                <div className='flex flex-col -space-y-1.5'>
                                    <h1 className='text-[2vh]'>{item.name}</h1>
                                    <span className='uppercase opacity-70 text-[1.6vh]'>({item.symbol})</span>
                                </div>
                                <div className='-space-y-1.5 flex flex-col items-end'>
                                    <p className='opacity-90'>${item.price}</p>
                                    <p className={`${item.change.startsWith('-') ? 'text-red-500' : 'text-green-500'} opacity-80`}>
                                        {item.percent}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default Marquee
