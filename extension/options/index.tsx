import { useEffect, useState } from "react"

import "../style.css"

import type { User } from "@supabase/supabase-js"

import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import Header from "./Header"
import SummaryCard from "./SummaryCard"

function OptionsIndex() {
  const [user, setUser] = useStorage<User>({
    key: "user",
    instance: new Storage()
  })

  const [myResults, setMyResults] = useState<any>({})
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const today: Date = new Date()
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" }
  const formattedDate: string = today.toLocaleDateString("en-US", options)

  useEffect(() => {
    if (!user) {
      return
    }

    const loadData = async () => {
      const response = await sendToBackground({ name: "getRelevantToday" })
      setResults(response)
      const me = await sendToBackground({ name: "getMeToday" })
      setMyResults(me)
      setLoading(false)
    }
    loadData()
  }, [user])

  const filteredResults = results.filter((post) =>
    post.one_sentence_summary.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!user) {
    return (
      <div className="h-full min-h-screen w-full bg-background text-text-primary">
        <Header />
        <div className="container mx-auto max-w-screen-lg flex flex-col px-6 mt-24 mb-12">
          <p className="text-4xl py-6">Hey there!</p>
          <p className="text-2xl py-6">
            You're not logged in. Please log in to see your feed.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="h-full min-h-screen w-full bg-background text-text-primary">
        <Header />
        <div className="container mx-auto max-w-screen-lg flex flex-col px-6 mt-24 mb-12">
          <p className="text-4xl py-6">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full min-h-screen w-full bg-background text-text-primary">
      <Header />
      <div className="container mx-auto max-w-screen-lg flex flex-col px-6 mt-24 mb-12">
        <div className="flex justify-center py-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-full max-w-md border rounded-md text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-lg text-primary">{formattedDate}</div>
        <div className="text-4xl mt-2 mb-6">
          Hey {user.user_metadata.name}, here are today's sit downs!
        </div>
        <SummaryCard
          person="You"
          action={
            "are " +
            myResults.one_sentence_summary.split(" ").slice(2).join(" ")
          }
          date={myResults.date}
          text={myResults.summary}
          links={myResults.links}
        />
        {filteredResults.map((post, index) => (
          <SummaryCard
            key={index}
            person={post.one_sentence_summary.split(" ")[0]}
            action={post.one_sentence_summary.split(" ").slice(1).join(" ")}
            date={post.date}
            text={post.summary}
            links={post.links}
          />
        ))}
        <iframe src="https://atlas.nomic.ai/data/vincetiu8/sit-downs-pages/map" style={{
          width: 1280,
          height: 720
        }} />
      </div>
    </div>
  )
}

export default OptionsIndex
