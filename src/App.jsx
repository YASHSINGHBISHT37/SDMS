import React, { use, useState } from 'react'
import ShowData from './pages/ShowData'
import About from './pages/About'
import UserInput from './pages/UserInput'
import Nav from './pages/Nav'
import Marquee from './pages/Marquee'
import { Data } from './pages/Data'
import Menu from './pages/Menu'

const App = () => {

  return (
    <Data>
      <div className='bg-[#161616] w-screen min-h-screen h-auto py-3 select-none flex flex-col justify-center items-center pt-12'>

        <div className='bg-[#161616] w-screen h-full fixed top-0 left-0 pt-12 p-3 flex justify-center items-center flex-col overflow-auto'>
          <h1 className='text-blue-500 font-bold text-[32vh] leading-0 pt-65'>SM</h1>
          <h1 className='text-blue-500 font-bold text-[32vh] leading-'>DS</h1>
        </div>

        {/* <Data /> */}
        <Nav className='pointer-events-none' />
        <UserInput  className='pointer-events-auto'/>
        <Marquee />
        <ShowData />
        <About />

        <h1 className='fixed mt-4 bottom-4 text-center opacity-60 text-[1.3vh] leading-4 w-full'>Made by <br /> Yash Singh Bisht . Shivam Sharma . Pratham Sharma</h1>
      </div>
    </Data>
  )
}

export default App
