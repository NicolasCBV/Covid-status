import { InstagramLogo, TwitterLogo, YoutubeLogo } from "phosphor-react";
export function Information() {
  return (
    <div id="information" className="bg-blackOliva-100 pt-[2vh] pb-[8vh] text-base px-2 mt-8 text-queenBlue-900 text-center">
      <p className="mb-6">
        Este site foi construido com a função de monitorar as estatísticas da covid-19, contando as mortes, e os números de casos catalogados nos últimos 30 dias por meio da API do site <a className="text-seaGreenCrayola-250 duration-300 hover:text-seaGreenCrayola-550" href="https://disease.sh/"  target="_blank">https://disease.sh/</a>, Caso você encontre alguma informação incongruente nos gráficos, favor contatar o email <a className="text-seaGreenCrayola-250 duration-300 hover:text-seaGreenCrayola-550" href="mailto:nicolasCleiton700e@gmail.com"  target="_blank">nicolasCleiton700e@gmail.com</a>, desde já, agradeço pela colaboração.
      </p>
      <p className="mb-6">
        Ademais, caso você se sinta curioso, sinta-se a vontade de checar mais projetos feitos por mim no github - link no menu acima - ou checar as minhas outras redes sociais:
      </p>
      <ul className="flex gap-2 justify-center">
        <li>
          <a href="https://www.instagram.com/orix304"  target="_blank">
            <InstagramLogo weight="bold" width="35" height="35"/>
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/channel/UCt5BZdVGuRVV0vg6om92bwA">
            <YoutubeLogo weight="bold" width="35" height="35"/>
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com/NcolasCleiton1">
            <TwitterLogo weight="bold" width="35" height="35"/>
          </a>
        </li>
      </ul>
    </div>
  )
}