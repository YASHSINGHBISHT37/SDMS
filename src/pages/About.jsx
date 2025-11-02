import React, { useState } from 'react'

const About = ({ data }) => {
    // if (!data) return null

    //market Stats
    const marketStats = [
        { label: 'Open', data: '112.68' },
        { label: 'Prev Close', data: '110.45' },
        { label: 'Volume', data: '1.25M' },
        { label: 'Market Cap', data: '2.8T' },
        { label: 'Day Range', data: '111.20 - 114.00' },
        { label: '52 Week Range', data: '95.25 - 132.10' },
    ]

    //Description
    const [showMore, setShowMore] = useState(false)
    const description = 'Tesla Inc. is a leading manufacturer and innovator in the electric vehicle space, known for its cutting-edge technology and commitment to sustainable energy. As a pioneering force in the automotive industry, Tesla produces a range of electric vehicles (EVs), including sedans like the Model S, Model 3, and luxury SUVs such as the Model X and Model Y. Beyond automobiles, Tesla focuses on energy solutions through products like Solar Roof, solar panels, and energy storage systems with the Powerwall, Powerpack, and Megapack. Tesla plays a substantial role in the push towards reducing carbon emissions and advancing renewable energy. With a strong global footprint, the company is at the forefront of technological advancements in battery technology, autonomous driving, and artificial intelligence. The continuous expansion of its Supercharger network also supports sustainable transportation by providing accessible and efficient EV charging solutions worldwide. Founded in 2003 and headquartered in Palo Alto, California, Tesla is transformative in both the automotive and energy sectors, propelling the transition to greener technologies.'

    //About
    const about = [
        { label: "CEO", value: "Mr. Elon R. Musk" },
        { label: "Employees", value: "125,665" },
        { label: "Address", value: "1 Tesla Road, Austin, 78725, TX, United States" },
        { label: "Phone", value: "512 516 8177" },
        { label: "Website", value: "https://www.tesla.com" },
        { label: "Instrument Type", value: "Common Stock" },
        { label: "Sector", value: "Consumer Cyclical" },
        { label: "Industry", value: "Auto Manufacturers" },
        { label: "Country", value: "United States" },
        { label: "MIC Code", value: "XNGS" },
    ]

    return (
        <div className='relative z-50 w-full h-auto mt-4 mb-14 border border-white/20 rounded-3xl p-3 pt-8 bg-[#161616]/30 backdrop-blur-2xl'>
            <div className="Bar absolute left-1/2 top-4 -translate-x-1/2 bg-white/80 rounded-full w-16 h-1"></div>

            {/* market Stats */}
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
            <div className='StockSetails flex-wrap justify-around mt-5 space-y-2 '>
                <h1 className='text-[2.6vh] font-bold text-white mt-4 mb-1'>About</h1>
                <div>
                    {about.map((e, i) => (
                        <div key={i} className={` border-white/30 flex justify-between items-center ${i === about.length - 1 ? 'border-none' : 'border-b'}`}>
                            <p className='text-[1.7vh] opacity-70'>{e.label}</p>

                            {e.label === 'Website' ?
                                (<a href={e.value} target="_blank" rel="noopener noreferrer" className="text-[1.4vh] text-blue-400"> {e.value.replace("https://", "")}</a>) :
                                (<p className="text-[1.6vh] text-right">{e.value}</p>)}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default About
