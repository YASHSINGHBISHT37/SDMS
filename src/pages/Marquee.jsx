import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

const Marquee = () => {
    const stocks = [
        { name: "Bitcoin", symbol: "BTC", value: "$100000", change: "+1000%", img: "icons/bitcoin.png" },
        { name: "Ethereum", symbol: "ETH", value: "$3800", change: "+12%", img: "icons/ethereum.png" },
        { name: "Solana", symbol: "SOL", value: "$220", change: "+5%", img: "icons/solana.png" },
        { name: "Cardano", symbol: "ADA", value: "$0.42", change: "-2%", img: "icons/cardano.png" },
    ]

    const loopStocks = [...stocks, ...stocks]

    return (
        <div className='w-full h-full'>
            <div className='Top-Stock mt-4 relative overflow-hidden'>

                {/* Left fade */}
                <div className='absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#161616] to-transparent z-20 pointer-events-none' />

                {/* Right fade */}
                <div className='absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#161616] to-transparent z-20 pointer-events-none' />

                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                    className='cont flex items-center space-x-3 w-max'
                >
                    {loopStocks.map((item, i) => (
                        <div
                            key={i}
                            className='rounded-[3vh] border border-white/20 bg-white/2 py-1.5 px-2 pr-3 w-60 min-w-[240px] flex flex-shrink-0 items-center space-x-2.5 bg-[#161616]'
                        >
                            {/* <img src={item.img} className='h-10' alt={item.name} /> */}
                            <div className='w-13 h-10 border border-white/20 rounded-full'></div>
                            <div className='flex justify-between w-full'>
                                <div className='flex flex-col -space-y-1.5'>
                                    <h1 className='text-[2vh]'>{item.name}</h1>
                                    <span className='uppercase opacity-70 text-[1.6vh]'>({item.symbol})</span>
                                </div>
                                <div className='-space-y-1.5 flex flex-col items-end'>
                                    <p className='opacity-90'>{item.value}</p>
                                    <p className={`${item.change.startsWith('-') ? 'text-red-500' : 'text-green-500'} opacity-80`}>
                                        {item.change}
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
