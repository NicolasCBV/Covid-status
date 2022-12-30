import { GithubLogo } from "phosphor-react"

export function Menu(){
  return (
    <div className="bg-blackOliva-100 p-2 text-center text-queenBlue-900 flex items-center, justify-center fixed w-full hover:text-zinc-400 duration-300">
      <a href="https://github.com/NicolasCBV" target="_blank" className="flex gap-2">
        <GithubLogo weight="bold" height={"25"}/>
        @Or1x
      </a> 
    </div>
  )
}
