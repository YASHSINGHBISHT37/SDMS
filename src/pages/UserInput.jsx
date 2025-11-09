import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useStockData } from './Data';

const UserInput = () => {
  const { fetchStockData } = useStockData(); // ✅ changed
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const API = 'd47jlg1r01qkdqhr1540d47jlg1r01qkdqhr154g';

  useEffect(() => {
    if (userInput.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(`https://finnhub.io/api/v1/search?q=${userInput}&token=${API}`);
        setSuggestions(res.data.result || []);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [userInput]);

  useEffect(() => {
    const clickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  const clearInput = () => {
    setUserInput('');
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleSelect = (symbol) => {
    setUserInput(symbol);
    setSuggestions([]);
    fetchStockData(symbol); // ✅ dynamic fetch
  };

  return (
    <div ref={wrapperRef} className="relative w-full z-9999999 space-y-1 px-3  pointer-events-none">
      <div className="relative w-full pointer-events-auto">
        <AnimatePresence>
          <div className="relative z-50 overflow-auto backdrop-blur-[1vh] bg-white/5 border border-blue-500/50 border-white/20 rounded-full h-10 w-full pl-2 pr-0.5 text-blue-500 text-white flex items-center space-x-1">
            <img src="icons/search.png" className="w-6 h-6 opacity-50" />
            <input
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              type="text"
              placeholder="Search Stock..."
              className="w-full h-full outline-0 pr-7"
            />
            {userInput && (
              <motion.img
                initial={{ opacity: 0, x: 0, rotate: 180 }}
                animate={{ opacity: 0.8, x: -32, rotate: 0 }}
                exit={{ opacity: 0, x: 0, rotate: 180 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                src="icons/close.png"
                className="absolute top-1/2 right-9.5 -translate-y-1/2 w-5.5 h-5.5 cursor-pointer"
                onClick={clearInput}
              />
            )}
            <button
              onClick={() => fetchStockData(userInput.toUpperCase())} // ✅ fetch by search
              className="bg-[#161616]/90 cursor-pointer backdrop-blur-2xl rounded-full border border-white/14 text-blue-500 w-20 p-1 px-2.5 active:bg-white/5 transition-all duration-200 ease-in-out"
            >
              Search
            </button>
          </div>
        </AnimatePresence>

        {suggestions.length > 0 && (
          <ul className="Suggestions bg-[#161616] backdrop-blur-[.8vh] bg absolute w-full max-h-54 top-0 border border-white/30 rounded-3xl overflow-auto">
            {suggestions.map((stock, i) => (
              <li
                key={i}
                onClick={() => handleSelect(stock.symbol)}
                className={`text-white flex justify-between items-center p-1 px-3 cursor-pointer active:bg-[#161616]/20 hover:bg-[#161616]/10
                  ${i === suggestions.length - 1 ? 'border-0' : 'border-b border-white/30'}
                  ${i === 0 ? 'mt-9.5' : ''}`}
              >
                <div className="flex items-center space-x-1">
                  <img src={stock.logo || 'icons/default-stock.png'} className="rounded-full border border-white/7 w-6 h-6 bg-amber-400" />
                  <p className="text-[1.8vh]">{stock.symbol}</p>
                </div>
                <p className="text-[1.5vh] opacity-70 text-right">{stock.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-center text-white/50 text-[1.4vh] tracking-wide">
        Data Source:&nbsp;
        <span className="text-blue-400 hover:underline cursor-pointer">Finnhub.io</span>
      </p>
    </div>
  );
};

export default UserInput;
