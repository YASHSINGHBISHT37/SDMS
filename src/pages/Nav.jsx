import React, { useEffect, useState } from 'react'

const Nav = () => {
    const creater = [
        {
            name: "Yash Singh Bisht",
            links: {
                email: "Yashbisht0007@gmail.com",
                github: "https://github.com/yashbisht",
                linkedin: "https://linkedin.com/in/yashbisht",
                instagram: "https://instagram.com/yashbisht",
            },
        },
        {
            name: "Shivam Sharma",
            links: {
                email: "shivam@gmail.com",
                github: "https://github.com/shivam",
                linkedin: "https://linkedin.com/in/shivam",
                instagram: "https://instagram.com/shivam",
            },
        },
        {
            name: "Pratham Sharma",
            links: {
                email: "pratham@gmail.com",
                github: "https://github.com/pratham",
                linkedin: "https://linkedin.com/in/pratham",
                instagram: "https://instagram.com/pratham",
            },
        },
    ]



    const [stockbar, setStockbar] = useState(false)
    const [menu, setMenu] = useState(false)

    useEffect(() => {
        const scroll = () => {
            if (window.scrollY > 150) setStockbar(true)
            else setStockbar(false)
        }

        window.addEventListener('scroll', scroll)
        return () => window.removeEventListener('scroll', scroll)
    }, [])


    return (
        <div className="fixed top-0 z-999 w-full h-10 ">
            <div className='relative  z-999 w-full h-full bg-gradient-to-b from-[#161616] to-[#161616] flex justify-between items-center px-3'>

                <div className={`Nav-bar w-full flex justify-between items-center text-white/90 transition-all duration-500 ease-in-out
                ${stockbar ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <h1 className='cursor-pointer text-2xl font-bold'>SMDS</h1>
                    {/* <h1 className='cursor-pointer font-bold' onClick={() => setMenu(true)}>Menu</h1> */}
                </div>

                <div className={`Stock-bar absolute left-0 top-0 w-full h-full flex justify-between items-center text-white px-3 transition-all duration-500 ease-in-out
                ${stockbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                    <div className='flex items-center space-x-1.5'>
                        <div className='border  rounded-full w-7 h-7'></div>
                        <h1 className='cursor-pointer text-[2.4vh] font-bold'>Tesla Inc.</h1>
                    </div>
                    <h1 className='cursor-pointer font-bold'></h1>
                    <div className='flex space-x-3'>
                        <span className='font-bold'>$56.56</span>
                        <p className='flex items-center text-green-600'>16.46 <div className='w-[0.4vh] h-[0.4vh] mx-1 bg-white/70 rounded-full '></div> 3.74%</p>

                    </div>
                </div>
            </div>

            <div className={`fixed left-0 top-0 bottom-3 w-full h-screen flex items-end p-3 bg-[#161616]/40 backdrop-blur-[20vh]
             ${menu ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`} >
                <div className='Extended-Menu border w-full h-auto border-white/20 rounded-4xl bg-[#161616] backdrop-blur-[.8vh] px-3 py-2 space-y-2'>
                    <h1 className='font-bold opacity-50 text-2xl pl-2 pt-1'>Team</h1>

                    <div className='space-y-2'>
                        {creater.map((person, i) => (
                            <div key={i} className=" text-white/80 bg-white/5 rounded-3xl p-2 px-4 py-4 flex flex-col justify-center">
                                <h2 className="font-bold text-[3.3vh] leading-">{person.name}</h2>
                                <div className="flex space-x-1 text-[1.4vh] text-blue-500">
                                    {Object.entries(person.links).map(([key, value], j) => (
                                        <a key={j} href={key === "email" ? `mailto:${value}` : value} target={key === "email" ? "_self" : "_blank"} rel="noopener noreferrer"
                                            className="hover:text-blue-300 transition-colors border border-white/30 rounded-full px-1.5">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Nav
