import { useState } from "react"

import "../style.css"

function IndexPopup() {
  const [isOn, setIsOn] = useState(true)

  const setStatus = (status: boolean) => {
    setIsOn(status)
  }

  const goToDashboard = () => {
    console.log("hi")
    window.open(
      "chrome-extension://geggfkkjjclopjpblemfnbnhajhpfmih/options.html" // Change this to your own.
    )
  }

  return (
    <div className="p-4 bg-background flex flex-col text-text-primary w-48">
      <h2 className="text-xl font-bold text-center w-full">SitDowns 😈</h2>
      <div className="flex items-center justify-center">
        <label className="w-full my-4 flex justify-center items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isOn}
            onChange={() => setIsOn(!isOn)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-background-light rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
        </label>
      </div>
      <button className="btn" onClick={() => goToDashboard()}>
        Dashboard
      </button>
    </div>
  )
}

export default IndexPopup
