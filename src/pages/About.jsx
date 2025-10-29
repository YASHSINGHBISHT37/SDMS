import React, { useState } from 'react'

const About = ({ data }) => {
    if (!data) return null

    // Round numbers to 2 decimal places where applicable
    const formatValue = (value) => {
        if (value === null || value === undefined) return 'N/A'
        if (typeof value === 'number') return value.toFixed(2)
        return value
    }

    const marketStats = [
        { label: 'Open', data: formatValue(data.open) },
        { label: 'Volume', data: data.volume },
        { label: 'P/E Ratio', data: formatValue(data.peRatio) },
        { label: 'Market Cap', data: formatValue(data.marketCap) },
        { label: 'Previous Close', data: formatValue(data.previousClose) },
        { label: '52W High', data: formatValue(data.high) },
        { label: '52W Low', data: formatValue(data.low) },
    ]

    const about = [
        { label: 'Employees', data: data.employees || 'N/A' },
        { label: 'Sector', data: data.sector || 'N/A' },
        { label: 'Industry', data: data.industry || 'N/A' },
        { label: 'Headquarters', data: data.headquarters || 'N/A' },
    ]


    const [showMore, setShowMore] = useState(false)
    const aboutText = data.about || 'N/A'
    const shortText = aboutText.slice(0, 150)

    return (
        <div className='relative z-50 h-auto mt-4 border border-white/20 rounded-3xl p-3 pt-8 bg-[#161616]/30 backdrop-blur-2xl'>
            <div className="Bar absolute left-1/2 top-4 -translate-x-1/2 bg-white/80 rounded-full w-16 h-1"></div>

            {/* MARKET STATS */}
            <h1 className='text-[3vh] font-bold opacity-60 mb-1'>Market Stats</h1>
            <div className='StockSetails flex flex-wrap justify-between mt-2 space-y-2 border-b border-white/20 pb-3'>
                {marketStats.map((stock, i) => (
                    <div key={i} className='flex flex-col items-center justify-center border border-white/20 rounded-[1.4vh] w-21 h-15 leading-5'>
                        <h1 className='opacity-60 tracking-tighter text-[1.6vh] font-bold'>{stock.label}</h1>
                        <p>₹ {stock.data}</p>
                    </div>
                ))}
            </div>

            {/* ABOUT SECTION */}
            <h1 className='text-[3vh] font-bold text-white/60 mt-4 mb-1'>About</h1>
            <p className='StockPrize text-[1.5vh] leading-4.5'>
                {showMore ? aboutText : `${shortText}${aboutText.length > 150 ? ' ...' : ''}`}
                {aboutText.length > 150 && (
                    <button onClick={() => setShowMore(!showMore)} className='text-blue-500 ml-2 hover:underline text-[1.4vh] cursor-pointer'>
                        {showMore ? 'Show Less' : 'Show More'}
                    </button>
                )}
            </p>

            {/* ABOUT DETAILS */}
            <div className='StockSetails flex flex-wrap justify-around mt-4 space-y-2 pb-2'>
                {about.map((stock, i) => (
                    <div key={i} className='flex flex-col w-34 h-14 leading-4'>
                        <p className='text-2xl'>{stock.data}</p>
                        <h1 className='opacity-60 text-[1.6vh] font-bold'>{stock.label}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default About
