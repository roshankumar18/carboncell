import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { toast } from 'react-toastify';
import { LoaderCircle } from 'lucide-react';
Chart.register(...registerables);


const PopulationGraph = () => {
  const [populationData, setPopulationData] = useState([]);
  const [isloading, setIsloading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsloading(true)
        const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
        const data = await response.json();
        setPopulationData(data.data.reverse());
        setIsloading(false)
      } catch (error) {
        setIsloading(false)
        console.error('Error fetching population data:', error);
        toast.error('Something went wrong')
      }
    };

    fetchData();
  }, []);


  const years = populationData.map(entry => entry.Year)
  const populations = populationData.map(entry => entry.Population)
  // Chart.js data format
  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Population',
        data: populations,
        fill:true,
        backgroundColor: 'rgba(37, 205, 37, 0.4)',
      }
    ]
  };

  // Chart.js options
  const chartOptions = {
    elements:{
        line:{
            borderColor:'#009b4d'
        }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Population',
        }
      },
      x:{
        title:{
            display:true,
            text:'Year',
        }
      }
    },plugins: {
        legend: {
            labels: {
                font: {
                    size: 14
                }
            }
        }
    },
    responsive:true,
    maintainAspectRatio:false,
    aspectRatio:3/1
  };

  return (
    <div className='flex flex-col flex-1 gap-2 overflow-y-auto mt-12'>
      <div className='p-4'>
        <div className='text-4xl font-semibold'>Graph</div>
        <div className='rounded-md  flex flex-col  h-96'>
        {isloading?(<LoaderCircle className='animate-spin'/>):(<Line data={chartData} options={chartOptions} className='w-full ' />)}
      </div>

        
    </div>
    </div>

  );
};

export default PopulationGraph;
