import React from 'react'

const ShowData = ({ data }) => {
    if (!data) return null

    return (
        <div className='relative w-auto h-auto flex flex-col justify-between z-50 mt-4 border border-white/20 rounded-3xl p-3 pl-4 pt-5 overflow-hidden bg-[#161616]/30 backdrop-blur-2xl'>
            <div className='Stockname flex items-center space-x-5 w-full'>
                <div className='StocImg rounded-full w-16 h-16'>
                    {data.logo ? (<img src={data.logo} alt={data.symbol} className='rounded-full w-full h-full object-cover' />) : (<div className='Img bg-white/70 rounded-full w-full h-full'></div>)}
                </div>

                <div className='bg-amber-00'>
                    <h1 className='text-[5.4vh] font-bold leading-10'>{data.name}</h1>
                    <span className='opacity-70 text-[2vh] font-light tracking-tight leading-10'>({data.symbol})</span>
                    <p className='opacity-70 text-[1.6vh] font-light leading-0'> {data.exchange} </p>
                </div>
            </div>

                <div className='flex justify-between items-center mt-4'>
                    <h1 className='StockPrize text-6xl mt-2'>₹{data.price}</h1>
                    {/* <div className='flex items-center mt-2'>
                        <img src="icons/down-arrow.png" className='w-4 h-4' />
                        <p className='text-red-500'>0.60%</p>
                    </div> */}
                </div>
                <p className='text-[1.6vh]'><span className='opacity-70 '>Source :</span> {data.source}</p>

        </div>
    )
}

export default ShowData
