import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { timeline } from "../App";
import { Skull, Heartbeat } from "phosphor-react";

Chart.register(
  CategoryScale, 
  LineElement, 
  PointElement, 
  LineElement, 
  LinearScale,
  Title,
  Tooltip, 
  Legend
)

interface props {
  dataApi: timeline
}


export function Graphic({ dataApi }: props) {
  const [aspectRatio, setAspectRatio] = useState(window.innerWidth >= 617 ? 2 : 1);
  window.addEventListener("resize", () => {
    window.innerWidth >= 617 ? setAspectRatio(2) : setAspectRatio(1)  
  })
  
  const [switchGraphicForDeathState, setSwitchGraphicForDeathState] = useState(false);
  const dates = Object.keys(dataApi.cases).map((item) => {return item})

  const casesData = {
    labels: dates,
    datasets: [
      {
        label: "Casos",
        data: Object.values(dataApi.cases).map((item) => {return item}),
        borderColor: 'rgb(255, 10, 67)',
        backgroundColor: 'rgba(255, 16, 10, 0.5)',
      }
    ]
  }

  const deathsData = {
    labels: dates,
    datasets: [
      {
        label: "Mortes",
        data: Object.values(dataApi.deaths).map((item) => {return item}),
        borderColor: '#151513',
        backgroundColor: 'rgba(5, 5, 5, 0.5)',
      }
    ]
  }
  return (
    <div id="graphic" className='py-400 items-center place-self-center m-auto bg-white'>
    {
     !switchGraphicForDeathState ? (
      <>
      <Line 
        data={casesData}
        options={{
          responsive: true,
          aspectRatio: aspectRatio,
          plugins: {
            legend: {
              position: 'top' as const
            },
            title: {
              display: true
            }
          }
        }}
      />
        <button 
          className='bg-blackOliva-150 px-2 py-1 rounded-md text-queenBlue-900 flex items-center gap-1 mx-auto duration-300 hover:transition-all hover:bg-blackOliva-250'
          onClick={()=>{setSwitchGraphicForDeathState(!switchGraphicForDeathState)}}
        >
          <Skull/>
            Mortes
        </button>
      </>
     ): (
      <>
        <Line options={{
          responsive: true,
          aspectRatio: aspectRatio,
          plugins: {
            legend: {
              position: 'top' as const
            },
            title: {
              display: true
            }
          }
        }} data={deathsData}/>
        <button 
          className='bg-red-600 px-2 py-1 rounded-md text-queenBlue-900 flex items-center gap-1 mx-auto duration-300 hover:bg-red-500 hover:transition-all'
          onClick={()=>{setSwitchGraphicForDeathState(!switchGraphicForDeathState)}}
        >
          <Heartbeat/>
            Casos
        </button>
      </>
     )
    }
      
    </div>
  )
}
