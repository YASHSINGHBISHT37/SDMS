import React, { useState } from 'react'
import ShowData from './pages/ShowData'
import About from './pages/About'
import UserInput from './pages/UserInput'
import StockFetcher from './pages/StockFetcher'
import Nav from './pages/Nav'

const App = () => {
  const [stockData, setStockData] = useState(null)
  return (
    <div className='bg-[#161616] w-screen min-h-screen h-auto p-3 select-none flex flex-col justify-center items-center'>
      <div className='Background-Gradient absolute inset-0 z-1 overflow-hidden'>
        <div className='fixed top-0 left-0 bg-[#161616]/7 w-full h-screen'></div>
        <div className="absolute bg-white blur-2xl -left-15 rotate-18 -z-1 -top-17 w-[90vh] h-80"></div>
        <div className="absolute bg-blue-300 blur-2xl -left-10 rotate-18 -z-1 top-38 w-[70vh] h-20"></div>
        <div className="absolute bg-blue-500 blur-2xl -left-10 rotate-18 -z-1 top-50 w-[70vh] h-20"></div>
        <div className="absolute bg-blue-600 blur-2xl -left-10 rotate-18 -z-1 top-65 w-[70vh] h-20"></div>
        <div className="absolute bg-blue-700 blur-2xl -left-10 rotate-18 -z-1 top-80 w-[70vh] h-20"></div>
        <div className="absolute bg-blue-900 blur-2xl -left-10 rotate-18 -z-1 top-94 w-[70vh] h-20"></div>
        <div className="absolute move bg-[#161616] blur-[5vh] rounded-full -left-40 -z-1 top-70 w-90 h-70"></div>
        <div className="absolute bg-[#161616] blur-2xl -left-40 rotate-18 -z-10 top-110 w-[90vh] h-full"></div>
      </div>

      <Nav />
      <UserInput setStockData={setStockData} />
      {/* <ShowData data={stockData} /> */}
      {/* <About data={stockData} /> */}
      <About/>
      {/* <StockFetcher/> */}

      <h1 className='fixed z-50 mt-4 bottom-6 text-center opacity-60 text-[1.3vh] leading-4 w-full'>Made by <br /> Yash Singh Bisht . Shivam Sharma . Pratham Sharma</h1>
    </div>
  )
}

export default App
