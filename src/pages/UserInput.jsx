import React from 'react'

const UserInput = () => {
    return (
        <div className='relative z-50 space-y-1'>
            <h1 className='text-2xl font-bold leading-12 text-[#161616]/90'>SMDS.</h1>

            <div className='border border-[#161616]/60 rounded-2xl h-10 w-full pl-3 pr-1 text-[#161616] flex items-center space-x-2'>
                <input type="text" placeholder='Search Stock...' className='w-full h-full outline-0' />
                <button className='bg-[#161616]/90 backdrop-blur-2xl rounded-[1.4vh] text-white w-20 p-1 active:bg-[#161616]/70 transition-all duration-75 ease-in-out'>Search</button>
            </div>

            <p className='text-center text-[#161616]/60 text-[1.4vh]'>Main Source: Yahoo And MoneyControl</p>

        </div>
    )
}

export default UserInput
