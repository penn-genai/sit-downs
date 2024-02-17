import type { User } from "@supabase/supabase-js"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

export default function Header() {
  const [user, setUser] = useStorage<User>({
    key: "user",
    instance: new Storage()
  })

  const goToGraph = () => {
    window.open(
      `chrome-extension://${process.env.PLASMO_PUBLIC_CRX_ID}/tabs/graph.html`
    )
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-10 container mx-auto max-w-screen-xl px-6 flex justify-between items-center my-4 md:my-6 bg-background-primary text-text-primary">
      <div className="font-bold text-xl">SitDowns 😈</div>
      <div className="flex items-center">
        {user && (
          // Using a <button> or <span> with an onClick event handler
          <button
            onClick={goToGraph}
            className="text-lg mr-4"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "rgba(255, 255, 255, 0.87)",
              cursor: "pointer"
            }}>
            Graph
          </button>
        )}
        {user ? (
          <div className="text-lg">{user.user_metadata.name}</div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
