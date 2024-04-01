import React from 'react'
import Metamask from './Metamask'

const Header = () => {
  return (
    <div className='flex flex-col sm:flex-row py-2 px-4 justify-between items-center'>
        <div className='text-2xl sm:text-5xl font-medium text-nowrap sm:mr-4'>
            Hello, <span className='text-primary'>Brooklyn Simmons</span> <span className='hidden sm:inline'>👋</span>
        </div>
        <Metamask/>
    </div>
  )
}

export default Header