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
    },
    deaths: {
      date: number
    },
    recovered: {
      date: number
    },
  }
}

export interface timeline {
  cases: {
    date: number
  },
  deaths: {
    date: number
  },
  recovered: {
    date: number
  },
}

export interface covidStatusState {
  cases: number[],
  deaths: number[],
  date: (string | undefined)[]
}

export default function App(){
  const [covidStatus, setCovidStatus] = useState<covidStatusState>({
    cases: [0],
    deaths: [0],
    date: [""]
  });

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
      const date = Object.entries(timeline.cases).filter((item, index) => {
        return Object.values(timeline.cases).indexOf(item[1]) === index
      });

      setCovidStatus({
        cases: Object.values(timeline.cases).filter((item, index) => {
          return Object.values(timeline.cases).indexOf(item) === index;
        }),
        deaths: Object.values(timeline.deaths).filter((item, index) => {
          return Object.values(timeline.deaths).indexOf(item) === index;
        }), 
        date: date.map((item) => {return item[0]})
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
