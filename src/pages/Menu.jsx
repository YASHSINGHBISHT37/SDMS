import React, { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const Menu = ({ menuOpen, setMenuOpen }) => {
    const links = [
        { label: 'Email', link: 'mailto:yashbisht0007@gmail.com' },
        { label: 'Github', link: 'https://github.com/YASHSINGHBISHT37' },
        { label: 'LinkedIn', link: 'https://www.linkedin.com/in/yash-singh-bisht-349960295' },
        { label: 'Instagram', link: 'https://www.instagram.com/thunderbeast37/' },
    ]

    return (
        <AnimatePresence>
            {menuOpen && (
                <motion.div
                    initial={{ y: 420 }}
                    animate={{ y: 0 }}
                    exit={{ y: 420 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="w-full h-[45vh] fixed left-0 bottom-0">
                    <div className="bg-[#161616]/40 backdrop-blur-[1vh] w-full h-full border-t border-white/30 rounded-t-[4vh] p-5">
                        <div className='flex justify-between items-center opacity-70'>
                            <h1 className="font-bold text-2xl">Links</h1>
                            <img onClick={() => setMenuOpen(false)} src="icons/close.png" className='w-6 h-6 cursor-pointer' />
                        </div>
                        {links.map((link, i) => (
                            <a key={i} href={link.link} target="_blank" rel="noopener noreferrer">
                                <h1 className="font-bold text-6xl leading-[6.8vh] hover:opacity-80 transition-opacity">
                                    {link.label}
                                </h1>
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Menu
