import { useCallback, useEffect, useState } from 'react'
import { Graphic } from './components/Graphic'
import { Information } from './components/Information'
import { Menu } from './components/Menu'

export interface  IDataApi {
  country: string;
  province: [string];
  timeline: {
    cases: {
      date: number;
    };
    deaths: {
      date: number;
    };
    recovered: {
      date: number;
    };
  };
}

export interface ITimeline {
  cases: {
    date: number;
  };
  deaths: {
    date: number;
  };
  recovered: {
    date: number;
  };
}

export interface ICovidStatusState {
  cases: number[];
  deaths: number[];
  date: {
    dateOfDeaths: string[];
    dateOfCases: string[];
  };
}

function filterData(
  { timeline }: Pick<IDataApi, "timeline">, 
  type: "cases" | "deaths",
) {
  const date: string[] = [];
  const rawDate: string[] = Object.entries(timeline[type])
    .map((item) => {
      const [ month, day ] = item[0].split("/");
      return `${day}/${month}`;
    });

    const filteredData: number[] = Object.entries(timeline[type])
      .map((item) => item[1])
      .filter((item, index, array) => {
        if(index === 0) {
          date.push(rawDate[index]);
          return item;
        }

        if (item !== array[index - 1]) {
          date.push(rawDate[index]);
          return item !== array[index - 1];
        }
    });

  return { 
    content: filteredData, 
    date 
  };
}

export default function App() {
  const [covidStatus, setCovidStatus] = useState<ICovidStatusState>({
    cases: [0],
    deaths: [0],
    date: {
      dateOfCases: [],
      dateOfDeaths: [],
    }
  });

  const callback = useCallback(async () => {
    await fetch(
      "https://disease.sh/v3/covid-19/historical/Brazil?lastdays=30",
      {
        headers: {
          "content-type": "application/json"
        },
        method: "GET"
      }
    )
      .then((res) => res.json())
      .then(({ timeline }: IDataApi) => {
        const { 
          ["content"]: cases, 
          ["date"]: dateOfCases,
        } = filterData({ timeline }, "cases"); 

        const { 
          ["content"]: deaths, 
          ["date"]: dateOfDeaths,
        } = filterData({ timeline }, "deaths");

        setCovidStatus({
          cases,
          deaths, 
          date: { dateOfCases, dateOfDeaths } 
        });
      })
      .catch(() => {
        console.error("Could not get data on disease API");
      });
  }, []);

  useEffect(() => {
    callback();
  }, [callback]);

  return (
    <main>
      <Menu/>
      <Graphic dataApi={covidStatus}/>
      <Information/>
    </main>
  )
}
