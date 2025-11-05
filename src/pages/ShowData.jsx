import React from 'react'
import { useStockData } from './Data'

const ShowData = () => {
    const { stockData } = useStockData()

    if (!stockData) return

    return (
        <div className='px-3 w-full'>
            <div className='relative h-auto flex flex-col justify-between z-50 mt-4 border border-white/20 rounded-3xl p-3 pl-4 pt-5 overflow-hidden bg-[#161616]/30 backdrop-blur-2xl'>
                {/* <div className='Stockname flex items-center space-x-5 w-full'>
                <div className='StocImg rounded-full w-16 h-16'>
                    {data.logo ? (<img src={data.logo} alt={data.symbol} className='rounded-full w-full h-full object-cover' />) : (<div className='Img bg-white/70 rounded-full w-full h-full'></div>)}
                </div>


                <div className=''>
                    <h1 className='text-[5.4vh] font-bold leading-10'>{data.name}</h1>
                    <span className='opacity-70 text-[1.6vh] text-[#161616] font-light tracking-tight leading-12 borde rounded-full px-2 pb-0.5 bg-white/80'>{data.symbol}</span>
                    <span className='ml-2 opacity-70 text-[1.6vh] font-light'>NASDAQ</span>
                </div>
            </div>

                <div className='flex flex-col'>
                    <h1 className='StockPrize text-6xl mt-2 font-bold'>{data.price} <span clsassName='text-[2vh] font-light opacity-70'>USA</span></h1>
                    <p className='flex items-center text-green-600'>16.46 <div className='w-1 h-1 mx-1.5 bg-white/60 rounded-full '></div> 3.74%</p>
                    <p className='text-[1.2vh] opacity-60'>Last update Oct 31, 3:59 PM EDT</p>
                </div>
                <p className='text-[1.6vh]'><span className='opacity-70 '>Source :</span> {data.source}</p> */}



                <div className='Stockname flex items-center space-x-5 w-full bg-amber-00'>
                    <div className='StocImg rounded-full w-19 h-19 border-white/10 border'>
                        {stockData.image ? (<img src={stockData.image} alt={stockData.symbol} className='rounded-full w-full h-full object-cover' />) : (<div className='Img bg-white/70 rounded-full w-full h-full'></div>)}
                    </div>

                    <div className=''>
                        <h1 className='text-[5.4vh] font-bold leading-10'>{stockData.name}</h1>
                        <span className='opacity-70 text-[1.6vh] text-[#161616] tracking-tight leading-12 borde rounded-full px-2 font-bold bg-white/80'>{stockData.symbol}</span>
                        <span className='ml-2 opacity-70 text-[1.6vh] underline font-light'>{stockData.about.micCode || "N/A"}</span>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <h1 className='StockPrize text-6xl mt-2 font-bold'>${stockData.price}<span className='text-[2vh] font-light opacity-70'> USA</span></h1>
                    {/* <p className='flex items-center text-green-600'>16.46 <div className='w-1 h-1 mx-1.5 bg-white/80 rounded-full '></div> 3.74%</p> */}
                    <p className='flex items-center text-green-600'>{stockData.profit.value}<div className='w-1 h-1 mx-1.5 bg-white/80 rounded-full '></div> 3.74%</p>
                    {/* <p className='text-[1.6vh] opacity-80'><span className='opacity-70'>Last Update:</span> Oct 31, 3:59 PM EDT</p> */}
                    <p className='text-[1.6vh] opacity-80'><span className='opacity-70'>Last Update: </span>{stockData.lastUpdate}</p>

                </div>
                <p className='text-white/60 text-[1.4vh]'>
                    {/* Data Source: <span className='text-blue-400'>Finnhub</span> & <span className='text-blue-400'>Twelve Data</span> */}
                    {/* Data Source: <span className='text-blue-400'>Finnhub</span> & <span className='text-blue-400'>{stockData.dataSource}</span> */}
                </p>
            </div>
        </div>
    )
}

export default ShowData
