import React, { useState } from 'react'
import { useStockData } from './Data'
import { div } from 'framer-motion/client'

const About = () => {
    const { stockData } = useStockData()

    if (!stockData) return

    //Market Stats
    const marketStats = [
        { label: 'Open', data: stockData.open || 'N/A' },
        { label: 'Prev Close', data: stockData.prevClose || 'N/A' },
        { label: 'Volume', data: stockData.volume || 'N/A' },
        { label: 'Market Cap', data: stockData.marketCap || 'N/A' },
        { label: 'Day Range', data: stockData.dayRange || 'N/A' },
        { label: '52 Week Range', data: stockData.week52Range || 'N/A' },
        // { label: 'Change %', data: stockData.profit?.percent || 'N/A' },
    ]

    //Description
    const description = stockData.description || 'No description available for this company.'
    const [showMore, setShowMore] = useState(false)

    //About
    const about = [
        { label: 'CEO', value: stockData.about?.ceo || 'N/A' },
        { label: 'Employees', value: stockData.about?.employees || 'N/A' },
        { label: 'Address', value: stockData.about?.address || 'N/A' },
        { label: 'Phone', value: stockData.about?.phone || 'N/A' },
        { label: 'Website', value: stockData.about?.website || 'N/A' },
        { label: 'Instrument Type', value: stockData.about?.instrumentType || 'N/A' },
        { label: 'Sector', value: stockData.about?.sector || 'N/A' },
        { label: 'Industry', value: stockData.description || 'N/A' },
        { label: 'Country', value: stockData.about?.country || 'N/A' },
        { label: 'MIC Code', value: stockData.about?.micCode || 'N/A' },
    ];


    return (
        <div className='px-3 w-full'>
            <div className='relative z-50 h-auto mt-4 mb-12 border border-white/20 rounded-3xl p-3 pb-1 pt-6 bg-[#161616]/30 backdrop-blur-2xl'>
                <div className="Bar absolute left-1/2 top-3 -translate-x-1/2 bg-white/70 rounded-full w-16 h-1"></div>

                {/* Market Stats */}
                <h1 className='text-[2.6vh] font-bold text-white mb-1'>Market Stats</h1>
                <div className='grid grid-cols-2 pl-5'>
                    {marketStats.map((stat, i) => (
                        <div key={i} className="flex flex-col justify w- mb-1.5 -space-y-0.5 bg-amber-00 px-">
                            <span className='opacity-70 text-[1.6vh]'>{stat.label}</span>
                            <span className='font-bold text-[1.7vh]'>{stat.data}</span>
                        </div>
                    ))}
                </div>

                {/* Description */}
                <h1 className='text-[2.6vh] font-bold text-white mt-3 mb-1'>Description</h1>
                <p className="text-[1.6vh] leading-4.5 text-white/70">
                    {showMore ? description : `${description.slice(0, 350)}...`}
                    <span onClick={() => setShowMore(!showMore)} className="text-blue-500 cursor-pointer ml-1" >{showMore ? "Show less" : "Show more"}</span>
                </p>


                {/* About */}
                <div className='StockSetails flex-wrap justify-around mt-5 space-y-2'>
                    <h1 className='text-[2.6vh] font-bold text-white mt-4 mb-1'>About</h1>
                    <div>
                        {about.map((e, i) => (
                            <div key={i} className={` border-white/30 flex justify-between items-center ${i === about.length - 1 ? 'border-none' : 'border-b'}`}>
                                <p className='text-[1.6vh] opacity-60'>{e.label}</p>

                                {e.label === 'Website' ?
                                    (<a href={e.value} target="_blank" rel="noopener noreferrer" className="text-[1.5vh] text-blue-500"> {e.value.replace("https://", "")}</a>) :
                                    (<p className="text-[1.7vh] text-right">{e.value}</p>)}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default About
