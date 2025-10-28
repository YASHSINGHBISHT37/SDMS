import React from 'react'

const ShowData = () => {
    const stockDetails = [
        { label: 'P/E Ratio', data: '23.55' },
        { label: '52W Low', data: '2120.00' },
        { label: '52W High', data: '3042.00' },
        { label: 'Time', data: '23.55' },
    ]
    return (
        <div className='relative w-auto h-auto z-50 mt- border border-white/20 rounded-3xl p-3 overflow-hidden bg-[#161616]/30 backdrop-blur-2xl'>
            <div className='Stockname flex items-center space-x-3'>
                <div className='StocImg border border-white/30 rounded-full w-15 h-15 p-1.5'>
                    <div className='Img bg-white/70 rounded-full w-full h-full'></div>

                </div>
                <h1 className='text-5xl font-bold'>Apple Inc. <span className='opacity-70 text-[2.4vh] font-light tracking-tight'>( AAPL ) </span></h1>
            </div>

            <div className='flex justify-between items-center'>
                <h1 className='StockPrize text-5xl mt-2'>$1200.56</h1>
                <div className='flex items-center mt-2'>
                    <img src="icons/down-arrow.png" className='w-4 h-4' />
                    <p className='text-red-500'>0.60%</p>
                </div>
            </div>
            <p className='text-[1.6vh]'><span className='opacity-70 '>Source :</span> Yahoo Finance</p>

        </div>
    )
}

export default ShowData
