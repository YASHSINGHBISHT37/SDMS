import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useStockData } from './Data'

const Nav = () => {
  const { stockData } = useStockData()

  const menuRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [stockbar, setStockbar] = useState(false)

  const links = [
    { label: 'Email', link: 'mailto:yashbisht0007@gmail.com' },
    { label: 'Github', link: 'https://github.com/YASHSINGHBISHT37' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/yash-singh-bisht-349960295' },
    { label: 'Instagram', link: 'https://www.instagram.com/thunderbeast37/' }
  ]

  useEffect(() => {
    const scroll = () => setStockbar(window.scrollY > 200)
    window.addEventListener('scroll', scroll)
    return () => window.removeEventListener('scroll', scroll)
  }, [])

  useEffect(() => {
    const menuClose = (close) => {
      if (menuRef.current && !menuRef.current.contains(close.target)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', menuClose)
    }
    return () => document.removeEventListener('mousedown', menuClose)
  }, [menuOpen])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // delay between each item
        delayChildren: 0.1,   // delay before first animation
      },
    },
  }

  // Animation for each link
  const itemVariants = {  
    hidden: { x: -250, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
    exit: { x: -250, opacity: 0, transition: { duration: 0.3 } },
  }

  if (!stockData) return

  const profitPositive = parseFloat(stockData.profit.value) >= 0

  return (
    <div className="fixed top-0 z-[999] w-full h-full">
      <div className="">

        {/* Nav */}
        <div className='relative z-[999] w-full h-full bg-gradient-to-b from-[#161616] via-[#161616]/80 borderb border-white/30 rounded-b-4xl to-[#161616]/0 backdrop-blur-[.3vh] flex justify-between items-center px-3'>
          {/* Default-Nav */}
          <div className={`Nav-bar w-full flex justify-between items-center text-white/90 transition-all duration-400 ease-in-out
            ${stockbar ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
            <h1 className="cursor-pointer text-2xl font-bold">SMDS</h1>
            <div onClick={() => setMenuOpen(true)}
              className="Menu w-10 h-10 flex flex-col justify-around p-2 py-2.5 opacity-90 cursor-pointer">
              <div className="bg-white w-full h-[0.3vh] rounded-full"></div>
              <div className="bg-white w-full h-[0.3vh] rounded-full"></div>
              <div className="bg-white w-full h-[0.3vh] rounded-full"></div>
            </div>
          </div>

          {/* --- Scrolled Stock Bar --- */}
          <div className={`Stock-bar absolute left-0 top-0 w-full h-full flex justify-between items-center text-white px-3 transition-all duration-400 ease-in-out
            ${stockbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="flex items-center space-x-1.5">
            <div className="border border-white/20 rounded-full w-7 h-7 overflow-hidden">
              {stockData.image ? (
                <img src={stockData.image} alt={stockData.symbol} className="rounded-full w-full h-full object-cover"/>
              ) : (
                <div className="bg-white/70 w-full h-full rounded-full" />
              )}
            </div>
            <h1 className="cursor-pointer text-[2.2vh] font-bold">{stockData.symbol}</h1>
          </div>

          <div className="flex items-center space-x-3 font-bold">
            <span>${stockData.price}</span>
            <p
              className={`flex items-center ${profitPositive ? 'text-green-500' : 'text-red-500'
                }`}
            >
              {stockData.profit.value}
              <div className="w-[0.4vh] h-[0.4vh] mx-1 bg-white/70 rounded-full"></div>
              {stockData.profit.percent}
            </p>
          </div>
        </div>
        </div>

        {/* Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ y: 420 }} animate={{ y: 0 }} exit={{ y: 420 }} transition={{ duration: 0.6, ease: 'easeInOut' }} className="w-full h-[45vh] fixed left-0 bottom-0">
              <div ref={menuRef} className="bg-[#161616]/60 backdrop-blur-[1vh] w-full h-full border-t border-white/30 rounded-t-[4vh] p-5">
                <div className='bg-amber-00 overflow-hidden' variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
                  <motion.h1 variants={itemVariants}
                    className="font-bold text-2xl opacity-70 mb-2">Links</motion.h1>
                </div>

                <motion.div className="flex flex-col" variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
                  {links.map((link, i) => (
                    <motion.a key={i} href={link.link} target="_blank" rel="noopener noreferrer" variants={itemVariants} className="flex bg-amber-00 overflow-hidden" >
                      <span className="font-bold text-6xl leading-[6.7vh] hover:opacity-80 hover:text-blue-400 active:text-blue-400 transition-all duration-150 ease-in-out">{link.label}</span>
                    </motion.a>
                  ))}
                </motion.div>
                <h1 className='fixed mt-4 bottom-4 text-center opacity-60 text-[1.3vh] leading-4 w-full pr-10'>Made by <br /> Yash Singh Bisht . Shivam Sharma . Pratham Sharma</h1>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

export default Nav
