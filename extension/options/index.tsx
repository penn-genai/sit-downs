import { useState } from "react"

import "../style.css"
import SummaryCard from "./SummaryCard"
import LinksCard from "./LinksCard"

function OptionsIndex() {
  const [data, setData] = useState("")

  return (
    <div className="flex flex-col space-y-8 align-middle bg-zinc-900 w-full h-full p-8 text-zinc-200 text-lg">
      <h1 className="text-4xl font-bold text-center">
        Sit-Downs 💺
      </h1>
      <p className="text-center">Hey Vince, welcome back! Here's a quick summary of what you and your team has done today!</p>
      <div className="flex flex-row space-x-8">
        <SummaryCard person="You" text="Engineered a robust backend for a web app, designing databases, implementing secure logins, and optimizing code for improved performance. Collaborated with teams, conducted code reviews, and provided clear documentation. Resulted in a fast, reliable, and scalable software foundation." />
        <LinksCard />
      </div>
      <div className="flex flex-row space-x-8">
        <SummaryCard person="Justin" text="Enhanced database performance through strategic optimization techniques. Conducted thorough analysis of query efficiency, implemented indexing strategies, and fine-tuned configurations to achieve significant speed improvements. Collaborated with cross-functional teams to understand application requirements, ensuring seamless integration of optimized database structures. The result was a streamlined and efficient data management system." />
        <SummaryCard person="Benjamin" text="Engineered seamless interaction with a Large Language Model (LLM) by developing a robust integration framework. Implemented APIs and protocols to facilitate effective communication between the software application and the LLM, enhancing the system's natural language processing capabilities. Executed extensive testing and debugging to ensure reliable functionality. The engineered solution allowed the software to leverage advanced language understanding, contributing to more sophisticated and context-aware interactions within the application." />
        <SummaryCard person="Helena" text="Focused on meticulous preparation for an upcoming client presentation, meticulously organizing content and refining key messages to ensure clarity and impact. Developed visually engaging presentation materials, incorporating relevant data and visuals to effectively communicate complex concepts. Conducted thorough rehearsals to fine-tune delivery, anticipating potential client queries and preparing concise responses. Implemented feedback from peers to enhance the overall presentation's persuasiveness and coherence. The engineer's proactive approach and attention to detail resulted in a compelling and successful client engagement." />
      </div>
    </div>
  )
}

export default OptionsIndex