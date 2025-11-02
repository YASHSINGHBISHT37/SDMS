import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'

const UserInput = ({ setStockData }) => {
    const inputRef = useRef(null)
    const wrapperRef = useRef(null)
    const [userInput, setUserInput] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const API = 'd415j31r01qo6qdf1ga0d415j31r01qo6qdf1gag'


    useEffect(() => {
        if (userInput.trim().length < 2) {
            setSuggestions([])
            return
        }

        const fetchSuggestions = async () => {
            try {
                const res = await axios.get(`https://finnhub.io/api/v1/search?q=${userInput}&token=${API}`)
                const data = res.data.result || []
                setSuggestions(data)
            } catch (err) {
                console.error('Error in inputChnage(Fetching Suggestions)', err)
            }
        }

        const debounce = setTimeout(fetchSuggestions, 300)
        return () => clearTimeout(debounce)
    }, [userInput])

    const stockData = async (symbol) => {
        if (!symbol) return
        try {
            const res = await axios.get(`http://127.0.0.1:5000/api/stock?symbol=${symbol}`)
            setStockData(res.data)
            setSuggestions([])
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const clickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setSuggestions([])
            }
        }

        document.addEventListener('mousedown', clickOutside)
        return () => document.removeEventListener('mousedown', clickOutside)
    }, [])

    const clearInput = () => {
        setUserInput('')
        setSuggestions([])
        inputRef.current.focus()
    }

    return (
        <div ref={wrapperRef} className='relative w-full z-99 space-y-1 px-3'>

            <div className='relative w-full'>
                <AnimatePresence>
                    <div className='relative z-50 overflow-auto backdrop-blur-[1vh] bg-white/5 border border-blue-500/50 border-white/20 rounded-2xl h-10 w-full pl-2 pr-1 text-blue-500 text-white flex items-center space-x-1'>
                        <img src="icons/search.png" className='w-6 h-6 opacity-50' />
                        <input ref={inputRef} value={userInput} onChange={(e) => setUserInput(e.target.value)} type="text" placeholder='Search Stock...' className='w-full h-full outline-0 pr-7' />
                        {userInput && (
                            <motion.img
                                initial={{ opacity: 0, x: 30, rotate: 90 }}
                                animate={{ opacity: 0.9, x: 30, rotate: 0 }}
                                exit={{ opacity: 0, x: 30, rotate: 90 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                src="icons/close.png"
                                className='absolute top-1/2 right-9.5 -translate-y-1/2 w-6 h-6 cursor-pointer' onClick={clearInput} />
                        )}
                        {/* <button
                        onClick={() => stockData(userInput.toUpperCase())}
                        className='bg-[#161616]/90 cursor-pointer backdrop-blur-2xl rounded-[1.4vh] border border-white/7 text-blue-500 w-20 p-1 active:bg-white/5 transition-all duration-200 ease-in-out'>Search
                    </button> */}
                    </div>
                </AnimatePresence>

                {suggestions.length > 0 && (
                    <ul className='Suggestions bg-[#161616]/100 backdrop-blur-[.8vh] bg absolute w-full max-h-54 top-0 border border-white/30 rounded-2xl overflow-auto'>
                        {suggestions.map((stock, i) => (
                            <li
                                key={i}
                                onClick={() => stockData(stock.symbol)}
                                className={`text-white flex justify-between items-center p-1 px-3 cursor-pointer font-bold active:bg-[#161616]/20 hover:bg-[#161616]/10
                                ${i === suggestions.length - 1 ? 'border-0' : 'border-b border-white/30'}
                                ${i === 0 ? 'mt-9.5' : ''}`}>
                                <p className="font-">{stock.symbol}</p>
                                <p className="text-[1.5vh] opacity-70 text-right">{stock.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* <p className='text-center text-white/60 text-[1.4vh]'>Data Source: Finnhub & Twelve Data</p> */}

            {/* <p className='text-center text-white/60 text-[1.4vh]'>
                Data Source: <span className='text-blue-400'>Finnhub</span> & <span className='text-blue-400'>Twelve Data</span>
            </p> */}

            {/* <p className='text-center text-white/60 text-[1.4vh]'> Search Stock... </p> */}



        </div >
    )
}

export default UserInput
