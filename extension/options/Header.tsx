import type { User } from "@supabase/supabase-js"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

export default function Header() {
  const [user, setUser] = useStorage<User>({
    key: "user",
    instance: new Storage()
  })

  return (
    <div className="absolute top-0 left-0 right-0 z-10 container mx-auto max-w-screen-lg px-6 flex justify-between items-center my-4 md:my-6 bg-background-primary text-text-primary">
      <div className="font-bold text-xl">SitDowns 😈</div>
      {user ? (
        <div className="text-lg">{user.user_metadata.name}</div>
      ) : (
        <div></div>
      )}
    </div>
  )
}
