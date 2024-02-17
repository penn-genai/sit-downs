import { useState } from "react"

import "../style.css"

function IndexPopup() {
  const [isOn, setIsOn] = useState(true)

  const setStatus = (status: boolean) => {
    setIsOn(status)
  }

  const goToDashboard = () => {
    console.log("hi")
    window.open("chrome-extension://ggmokddcopnogabddgfgfpmdmjeappea/options.html")
  }

  return (
    <div className="p-2 bg-zinc-900 flex flex-col space-y-2 text-zinc-200" style={{
      minWidth: 200,
    }}>
      <h2 className="text-xl font-bold text-center w-full">
        Sit-Downs 💺
      </h2>
      <div className="flex flex-row w-full place-content-evenly space-x-2">
        <div className="flex flex-col place-content-center align-middle">
          <h4 className="text-lg">Toggle</h4>
        </div>
        <div className="flex flex-row">
          <button className={` text-lg p-1 px-4 border
            ${isOn ? "bg-zinc-200 text-zinc-900" : ""}
          `} onClick={() => setStatus(true)}>On</button>
          <button className={`text-lg p-1 px-4 border
            ${!isOn ? "bg-zinc-200 text-zinc-900" : ""}
          `} onClick={() => setStatus(false)}>Off</button>
        </div>
      </div>
      <button className="text-lg p-1 px-4 border bg-zinc-200 text-zinc-900" onClick={() => goToDashboard()}>
        Dashboard
      </button>
    </div>
  )
}

export default IndexPopup
