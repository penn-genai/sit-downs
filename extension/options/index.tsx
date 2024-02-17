import { useEffect, useState } from "react"

import "../style.css"

import SummaryCard from "./SummaryCard"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"
import type { User } from "@supabase/supabase-js"
import { sendToBackground } from "@plasmohq/messaging"

function OptionsIndex() {
  const [user, setUser] = useStorage<User>({
    key: "user",
    instance: new Storage()
  })

  // Mock data for the feed
  const posts = [
    {
      person: "You",
      action: "are doing machine learning",
      date: "Feb 2",
      text: "Engineered a robust backend for a web app, designing databases, implementing secure logins, and optimizing code for improved performance. Collaborated with teams, conducted code reviews, and provided clear documentation. Resulted in a fast, reliable, and scalable software foundation.",
      links: [
        ["Hugging Face", "https://huggingface.co/"],
        ["ChatGPT", "https://chat.openai.com/"]
      ]
    },
    {
      person: "Justin",
      action: "is building a website",
      date: "Feb 2",
      text: "Enhanced database performance through strategic optimization techniques. Conducted thorough analysis of query efficiency, implemented indexing strategies, and fine-tuned configurations to achieve significant speed improvements. Collaborated with cross-functional teams to understand application requirements, ensuring seamless integration of optimized database structures. The result was a streamlined and efficient data management system.",
      links: [
        ["Hugging Face", "https://huggingface.co/"],
        ["ChatGPT", "https://chat.openai.com/"]
      ]
    },
    {
      person: "Benjamin",
      action: "is researching colors",
      date: "Feb 1",
      text: "Engineered seamless interaction with a Large Language Model (LLM) by developing a robust integration framework. Implemented APIs and protocols to facilitate effective communication between the software application and the LLM, enhancing the system's natural language processing capabilities. Executed extensive testing and debugging to ensure reliable functionality. The engineered solution allowed the software to leverage advanced language understanding, contributing to more sophisticated and context-aware interactions within the application.",
      links: [
        ["Hugging Face", "https://huggingface.co/"],
        ["ChatGPT", "https://chat.openai.com/"]
      ]
    },
    {
      person: "Helena",
      action: "writing a blog",
      date: "Feb 1",
      text: "Focused on meticulous preparation for an upcoming client presentation, meticulously organizing content and refining key messages to ensure clarity and impact. Developed visually engaging presentation materials, incorporating relevant data and visuals to effectively communicate complex concepts. Conducted thorough rehearsals to fine-tune delivery, anticipating potential client queries and preparing concise responses. Implemented feedback from peers to enhance the overall presentation's persuasiveness and coherence. The engineer's proactive approach and attention to detail resulted in a compelling and successful client engagement.",
      links: [
        ["Hugging Face", "https://huggingface.co/"],
        ["ChatGPT", "https://chat.openai.com/"]
      ]
    }
  ]

  useEffect(() => {
    if (!user) {
      return
    }

    const loadData = async () => {
      const response = await sendToBackground({name: "getRelevantToday"})
      console.log(response)
    }
    loadData()
  }, [user])

  if (!user) {
    return (
      <div className="h-full min-h-screen w-full bg-background text-text-primary">
        <div className="container mx-auto max-w-screen-lg flex flex-col px-6">
          <p className="text-4xl py-6">Hey there!</p>
          <p className="text-2xl py-6">You're not logged in. Please log in to see your feed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full min-h-screen w-full bg-background text-text-primary">
      <div className="container mx-auto max-w-screen-lg flex flex-col px-6">
        <p className="text-4xl py-6">Hey {user.user_metadata.name}!</p>
        {posts.map((post, index) => (
          <SummaryCard
            key={index}
            person={post.person}
            action={post.action}
            date={post.date}
            text={post.text}
            links={post.links}
          />
        ))}
      </div>
    </div>
  )
}

export default OptionsIndex
