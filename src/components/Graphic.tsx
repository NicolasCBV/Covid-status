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
import { covidStatusState } from "../App";
import { Skull, Heartbeat, Equals, Database } from "phosphor-react";

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
  dataApi: covidStatusState
}



export function Graphic({ dataApi }: props) {
  const [aspectRatio, setAspectRatio] = useState(window.innerWidth >= 617 ? 2 : 1);
  window.addEventListener("resize", () => {
    window.innerWidth >= 617 ? setAspectRatio(2) : setAspectRatio(1)  
  })
  
  const [switchGraphicForDeathState, setSwitchGraphicForDeathState] = useState(false);


  const casesDiff: number[] = Object.values(dataApi.cases).map((item, index, arrayOfCases) => {
    const indexOfPreviousItem = Object.values(dataApi.cases).indexOf(item) - 1;
    const valueOfPreviousItem = arrayOfCases[indexOfPreviousItem];
    return item - valueOfPreviousItem;
  });
  casesDiff.shift();

  const deathsDiff: number[] = Object.values(dataApi.deaths).map((item, index, arrayOfDeaths) => {
    const indexOfPreviousItem = Object.values(dataApi.deaths).indexOf(item) - 1;
    const valueOfPreviousItem = arrayOfDeaths[indexOfPreviousItem];
    return item - valueOfPreviousItem;
  })
  deathsDiff.shift();

  const [diffButtonState, setDiffButtonState] = useState(false);

  const casesData = {
    labels: !diffButtonState ? dataApi.date : dataApi.date.slice(1, dataApi.date.length),
    datasets: [
      {
        label: !diffButtonState ? "Casos - Total" : "Casos - Comparação",
        data: !diffButtonState ? dataApi.cases : casesDiff,
        borderColor: !diffButtonState ? 'rgb(255, 10, 67)' : 'rgb(5, 25, 215)',
        backgroundColor: !diffButtonState ? 'rgba(255, 16, 10, 0.5)' : 'rgb(10, 85, 235)',
      }
    ]
  }

  const deathsData = {
    labels: !diffButtonState ? dataApi.date : dataApi.date.slice(1, dataApi.date.length),
    datasets: [
      {
        label: !diffButtonState ? "Mortes - Total" : "Mortes - Comparação",
        data: !diffButtonState ? dataApi.deaths : deathsDiff,
        borderColor: !diffButtonState ? '#151513' : '#757575',
        backgroundColor: !diffButtonState ? 'rgba(5, 5, 5, 0.5)' : 'rgba(75, 75, 75, 0.5)',
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
      <div className='flex justify-between'>
        <button 
          className='bg-blackOliva-150 max-h-[2rem] px-2 py-1 rounded-md text-queenBlue-900 flex items-center gap-1 mx-auto duration-300 hover:transition-all hover:bg-blackOliva-250'
          onClick={()=>{setSwitchGraphicForDeathState(!switchGraphicForDeathState)}}
        >
          <Skull/>
            Mortes
        </button>
        <button
          className='bg-red-600 px-2 max-h-[2rem] py-1 rounded-md text-queenBlue-900 flex items-center gap-1 mx-auto duration-300 hover:bg-red-500 hover:transition-all'
          onClick={()=>{setDiffButtonState(!diffButtonState)}}
        >
          {!diffButtonState ?<Equals/> : <Database/>}
          {!diffButtonState ? "Comparação": "Todos os dados"}
        </button>
      </div>
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
        <div className='flex'>
          <button 
            className='bg-red-600 px-2 max-h-[2rem] py-1 rounded-md text-queenBlue-900 flex items-center gap-1 mx-auto duration-300 hover:bg-red-500 hover:transition-all'
            onClick={()=>{setSwitchGraphicForDeathState(!switchGraphicForDeathState)}}
          >
            <Heartbeat/>
              Casos
          </button>
          <button 
            className='bg-blackOliva-150 px-2 max-h-[2rem] py-1 rounded-md text-queenBlue-900 flex items-center gap-1 mx-auto duration-300 hover:transition-all hover:bg-blackOliva-250'
            onClick={()=>{setDiffButtonState(!diffButtonState)}}
          >
            {!diffButtonState ?<Equals/> : <Database/>}
            {!diffButtonState ? "Comparação": "Todos os dados"}
          </button>
        </div>
      </>
     )
    }
      
    </div>
  )
}
