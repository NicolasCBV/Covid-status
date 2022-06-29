import { useEffect, useState } from 'react'
import { Graphic } from './components/Graphic'
import { Information } from './components/Information'
import { Menu } from './components/Menu'

export interface dataApi {
  country: string
  province: [string]
  timeline: {
    cases: {
      date: number
    }
    deaths: {
      date: number
    }
    recovered: {
      date: number
    }
  }
}

export interface timeline {
    cases: {
      date: number
    }
    deaths: {
      date: number
    }
    recovered: {
      date: number
    }
}

const shell = {
  cases: {
    date: 0
  },
  deaths: {
    date: 0
  },
  recovered: {
    date: 0
  }
}
export default function App(){
  const [covidStatus, setCovidStatus] = useState<timeline>(shell);

  useEffect(() => {
    fetch(
      "https://disease.sh/v3/covid-19/historical/Brazil?lastdays=30",
      {
        headers: {
          "content-type": "application/json"
        },
        method: "GET"
      }
    ).then((res) => res.json()).then(({ timeline }: dataApi) => {
      setCovidStatus({
        cases: timeline.cases,
        deaths: timeline.deaths, 
        recovered: timeline.recovered
      });
    })
  },[])

  return (
    <main>
      <Menu/>
      <Graphic dataApi={covidStatus}/>
      <Information/>
    </main>
  )
}
