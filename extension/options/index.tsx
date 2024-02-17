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

  const [myResults, setMyResults] = useState<any>({})
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      return
    }

    const loadData = async () => {
      const response = await sendToBackground({name: "getRelevantToday"})
      setResults(response)
      const me = await sendToBackground({name: "getMeToday"})
      setMyResults(me)
      setLoading(false)
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

  if (loading) {
    return (
      <div className="h-full min-h-screen w-full bg-background text-text-primary">
        <div className="container mx-auto max-w-screen-lg flex flex-col px-6">
          <p className="text-4xl py-6">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full min-h-screen w-full bg-background text-text-primary">
      <div className="container mx-auto max-w-screen-lg flex flex-col px-6">
        <p className="text-4xl py-6">Hey {user.user_metadata.name}!</p>
        <SummaryCard
          person="You"
          action={"are " + myResults.one_sentence_summary.split(" ").slice(2).join(" ")}
          date={myResults.date}
          text={myResults.summary}
          links={myResults.links}
        />
        {results.map((post, index) => (
          <SummaryCard
            key={index}
            person={post.one_sentence_summary.split(" ")[0]}
            action={post.one_sentence_summary.split(" ").slice(1).join(" ")}
            date={post.date}
            text={post.summary}
            links={myResults.links}
          />
        ))}
      </div>
    </div>
  )
}

export default OptionsIndex
