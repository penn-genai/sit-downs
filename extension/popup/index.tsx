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
      "chrome-extension://abcocpomaiddiceplohdmbfkpemkcjdj/options.html" // Change this to your own.
    )
  }

  return (
    <div
      className="p-2 bg-zinc-900 flex flex-col space-y-2 text-zinc-200"
      style={{
        minWidth: 200
      }}>
      <h2 className="text-xl font-bold text-center w-full">Sit-Downs 💺</h2>
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2 rounded-full px-2">
          <button
            className={`btn
            ${isOn ? "bg-blue-500" : "bg-zinc-400"}`}
            onClick={() => setIsOn(true)}>
            On
          </button>
          <button
            className={`btn
            ${!isOn ? "bg-blue-500" : "bg-zinc-400"}`}
            onClick={() => setIsOn(false)}>
            Off
          </button>
        </div>
      </div>
      <div className="px-2 py-2">
        <button className="btn" onClick={() => goToDashboard()}>
          Dashboard
        </button>
      </div>
    </div>
  )
}

export default IndexPopup
