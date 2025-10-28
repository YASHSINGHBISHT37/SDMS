import React from 'react'

const About = () => {

    const marketStats = [
        { label: 'P/E Ratio', data: '23.55' },
        { label: '52W Low', data: '2120.00' },
        { label: '52W High', data: '3042.0' },
        { label: '52W High', data: '3042.0' },
        { label: '52W High', data: '3042.0' },
        { label: '52W High', data: '3042.0' },
        { label: '52W High', data: '3042.0' },
        { label: '52W High', data: '3042.0' },
    ]

    const about = [
        { label: 'Employees', data: '164,000' },
        { label: 'Employees', data: '164,000' },
        { label: 'Sector', data: 'Technology' },
        { label: 'Industry', data: 'Electronics' },
    ]

    return (
        <div className='relative z-50 h-auto mt-4 border border-white/20 rounded-3xl p-3 pt-8 bg-[#161616]/30 backdrop-blur-2xl'>

            <div className="Bar absolute left-1/2 top-4 -translate-x-1/2 bg-white/80 rounded-full w-16 h-1"></div>

            <h1 className='text-[3vh] font-bold opacity-60 mb-1'>Market Stats</h1>
            <div className='StockSetails flex flex-wrap flex-3 justify-between mt-2 space-y-2 border-b border-white/20 pb-3'>
                {marketStats.map((stock, i) => (
                    <div key={i} className='flex flex-col items-center justify-center border border-white/20 rounded-[1.4vh] p-0.5 w-22 h-15 leading-5'>
                        <h1 className='opacity-60 tracking-tighter text-[1.6vh] font-bold'>{stock.label}</h1>
                        <p>₹{stock.data}</p>
                    </div>
                ))}
            </div>


            <h1 className='text-[3vh] font-bold text-white/60 mt-4 mb-1'>About</h1>
            <h1 className='StockPrize text-[1.5vh] leading-4.5'>NVIDIA Corporation, a computing infrastructure company, provides graphics and compute and networking solutions in the United States, Singapore, Taiwan, China, Hong Kong, and internationally. The Compute & Networking segment includes its Data Centre accelerated computing platforms and artificial intelligence solutions and software; networking; automotive...</h1>

            <div className='StockSetails flex flex-wrap flex-3 justify-around mt-4 space-y-2 pb-2'>
                {about.map((stock, i) => (
                    <div key={i} className='flex flex-col borde w-34 h-14 leading-4'>
                        <p className='text-2xl leading-'>{stock.data}</p>
                        <h1 className='opacity-60 text-[1.6vh] font-bold'>{stock.label}</h1>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default About
