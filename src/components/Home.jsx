import React from 'react'
import PopulationGraph from './PopulationGraph'
import PriceCard from './PriceCard'
import Header from './Header'

const Home = () => {
  return (
    <div className='flex-1 flex flex-col overflow-auto h-full mt-10  gap-4 '>
        <Header/>
        <PopulationGraph />
        <PriceCard/>
    </div>
  )
}

export default Home