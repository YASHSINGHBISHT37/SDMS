import React from 'react'
import { useStockData } from './Data'

const ShowData = () => {
    const { stockData } = useStockData()

    if (!stockData) return
    const profitPositive = parseFloat(stockData.profit.value) >= 0

    return (
        <div className='px-3 w-full'>
            <div className='relative h-auto flex flex-col justify-between z-50 mt-4 border border-white/20 rounded-3xl p-3 pl-4 pt-5 overflow-hidden bg-[#161616]/30 backdrop-blur-2xl'>

                <div className='Stockname flex items-center space-x-5 w-full bg-amber-00'>
                    <div className='StocImg rounded-full w-26 h-19 border-white/10 border'>
                        {stockData.image ? (<img src={stockData.image} alt={stockData.symbol} className='rounded-full w-19 h-19' />) : (<div className='Img bg-white/70 rounded-full w-19 h-19'></div>)}
                    </div>

                    <div className=''>
                        <h1 className='text-[5.4vh] font-bold leading-10'>{stockData.name}</h1>
                        <span className='opacity-70 text-[1.6vh] text-[#161616] tracking-tight leading-12 borde rounded-full px-2 font-bold bg-white/80'>{stockData.symbol}</span>
                        <span className='ml-2 opacity-70 text-[1.6vh] underline font-light'>{stockData.about.micCode || "N/A"}</span>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <h1 className='StockPrize text-6xl mt-2 font-bold'>${stockData.price} <span className='text-[2vh] font-light opacity-70'> USA</span></h1>
                    <p className={`flex items-center ${profitPositive ? 'text-green-500' : 'text-red-500'}`} >
                        {stockData.profit.value}
                        <div className="w-[0.4vh] h-[0.4vh] mx-1 bg-white/70 rounded-full"></div>
                        {stockData.profit.percent}
                    </p>
                    <p className='text-[1.6vh] opacity-80'><span className='opacity-70'>Last Update: </span>{stockData.lastUpdate}</p>
                </div>
            </div>
        </div>
    )
}

export default ShowData
