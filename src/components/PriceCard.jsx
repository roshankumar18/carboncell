import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const PriceCard = () => {
    const [priceData,setPriceData] = useState(null)
    const [isloading, setIsloading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsloading(true)
            const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
            const data = await response.json();
            setPriceData(data)
            setIsloading(false)
          } catch (error) {
            console.error('Error fetching population data:', error);
            setIsloading(false)
            toast.error('Something went wrong')
          }
        };
        fetchData()
        const interval  = setInterval(()=>fetchData(),10000)
        return () => clearInterval(interval)
      }, []);
      console.log(priceData)
  return (
   
   
    <div className='flex flex-col flex-1 gap-2  overflow-auto pt-12 '>   
      <div className='p-4'>
      <div className='text-4xl font-semibold'>Bitcoin Prices</div>
        {!!priceData || isloading? ( priceData && (
        
        <div className='text-black flex gap-2'>
        {Object.entries(priceData.bpi).map(([code,details]) => (
        <div key={code}  className="block flex-1 p-2 sm:p-6 bg-primary border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white ">{code}</h5>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between '>
            <p className=" text-igory text-sm font-medium"><span dangerouslySetInnerHTML={{ __html: details.symbol }}/>{details.rate}</p>
            <button className='bg-secondary p-2 sm:px-4 sm:py-2 font-medium text-gray-900 rounded-md'>Trade</button>
            </div>
        </div>
        ))}
        </div>
      )):(<LoaderCircle className='animate-spin'/>)}
      </div>  


    </div>
  )
}

export default PriceCard