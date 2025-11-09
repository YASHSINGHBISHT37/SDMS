import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const Loading = () => {
    const text = 'SMDS'
    const [show, setShow] = useState(true)
    const [cycle, setCycle] = useState(0)

    useEffect(() => {
        if (cycle < 2) {
            const repeat = setTimeout(() => setCycle(cycle + 1), 2400)
            return () => clearTimeout(repeat)
        } else {
            const hideScreen = setTimeout(() => setShow(false),0)
            return () => clearTimeout(hideScreen)
        }
    }, [cycle])

    const container = {
        hidden: {},
        visible: { transition: { delayChildren: 0.2, staggerChildren: 0.2, } }
    }

    const whiteText = {
        hidden: { y: 0, opacity: 1 },
        visible: { y: -40, opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }
    }

    const blueText = {
        hidden: { y: 40, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } }
    }

    return (
        <AnimatePresence>
            {show && (
                <motion.div key={cycle} initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
                    className='fixed inset-0 bg-[#161616] z-99999999 flex items-center justify-center'>

                    <motion.div
                        initial='hidden'
                        animate='visible'
                        variants={container}
                        className='relative flex'>

                        <div className='White-Text absolute inset-0 font-bold text-4xl'>
                            {text.split('').map((char, i) => (
                                <motion.span key={i} variants={whiteText}>
                                    {char}
                                </motion.span>
                            ))}
                        </div>

                        <div className='Blue-Text font-bold text-4xl text-blue-500'>
                            {text.split('').map((char, i) => (
                                <motion.span key={i} variants={blueText}>
                                    {char}
                                </motion.span>
                            ))}
                        </div>

                    </motion.div>

                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Loading
