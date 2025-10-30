import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const UserInput = ({setStockData}) => {
    const inputRef = useRef(null)
    const [userInput, setUserInput] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const API = 'd415j31r01qo6qdf1ga0d415j31r01qo6qdf1gag'


    useEffect(() => {
        if (!userInput.trim()) {
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
            const res = await axios.get(`https://smds.up.railway.app/api/stock?symbol=${symbol}`)
            setStockData(res.data)
            setSuggestions([])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='relative z-99 space-y-1'>
            <h1 className='text-2xl font-bold leading-12 text-[#161616]/90'>SMDS.</h1>

            <div className='relative'>
                <div className='relative z-50 backdrop-blur-[10vh] border border-[#161616]/60 rounded-2xl h-10 w-full pl-3 pr-1 text-[#161616] flex items-center space-x-2'>
                    <input
                        ref={inputRef}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        type="text"
                        placeholder='Search Stock...'
                        className='w-full h-full outline-0' />
                    <button
                        onClick={() => stockData(userInput.toUpperCase())}
                        className='bg-[#161616]/90 cursor-pointer backdrop-blur-2xl rounded-[1.4vh] text-white w-20 p-1 active:bg-[#161616]/70 transition-all duration-75 ease-in-out'>Search</button>
                </div>

                {suggestions.length > 0 && (
                    <ul className='Suggestions backdrop-blur-[1vh] bg absolute w-full max-h-50 top-0 border border-[#161616]/60 rounded-2xl overflow-auto'>
                        {suggestions.map((stock, i) => (
                            <li
                                key={i}
                                onClick={() => stockData(stock.symbol)}
                                className={`text-[#161616] flex justify-between items-center p-1 px-3 cursor-pointer active:bg-[#161616]/20 hover:bg-[#161616]/10
                                ${i === suggestions.length - 1 ? 'border-0' : 'border-b'}
                                ${i === 0 ? 'mt-9.5' : ''}`}>
                                <p className="font-bold">{stock.symbol}</p>
                                <p className="text-[1.6vh] opacity-70">{stock.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* <p className='text-center text-[#161616]/60 text-[1.4vh]'>Main Source: Yahoo And MoneyControl</p> */}


        </div >
    )
}

export default UserInput
