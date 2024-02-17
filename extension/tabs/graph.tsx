import Header from "../options/Header"

import "../style.css"

export default function Graph() {
  return (
    <div className="h-full min-h-screen w-full bg-background text-text-primary">
      <Header />
      <div className="container mx-auto max-w-screen-lg flex flex-col px-6 mt-24 mb-12">
        <iframe
          src="https://atlas.nomic.ai/data/vincetiu8/sit-downs-pages/map"
          style={{
            width: 1280,
            height: 720
          }}
        />
      </div>
    </div>
  )
}
