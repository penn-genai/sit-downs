import { useEffect, useState } from "react"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"
import type { Provider, User } from "@supabase/supabase-js"


import "../style.css"
import { supabase } from "~core/supabase"

const IndexPopup = () => {
  const [user, setUser] = useStorage<User>({
    key: "user",
    instance: new Storage()
  })

  useEffect(() => {
    async function init() {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error(error)
        return
      }
      if (!!data.session) {
        setUser(data.session.user)
      }
    }

    init()
  }, [])

  const [signup, setSignup] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleEmailLogin = async (
    email: string,
    password: string,
  ) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        alert("Error with auth: " + error.message)
      } else {
        setUser(data.user)
      }
    } catch (error) {
      console.log("error", error)
      alert(error.error_description || error)
    }
  }

  const handleEmailSignup = async (email: string, password: string, name: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      })

      if (error) {
        alert("Error with auth: " + error.message)
      } else {
        setUser(data.user)
      }
    } catch (error) {
      console.log("error", error)
      alert(error.error_description || error)
    }
  }

  const handleOAuthLogin = async (provider: Provider, scopes = "email") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        scopes,
        redirectTo: `chrome-extension://${process.env.PLASMO_PUBLIC_CRX_ID}/options.html`
      }
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const [isOn, setIsOn] = useState(true)

  const goToDashboard = () => {
    window.open(
      `chrome-extension://${process.env.PLASMO_PUBLIC_CRX_ID}/options.html`
    )
  }

  return (
    <div className="p-4 bg-background flex flex-col text-text-primary w-48">
      <h2 className="text-xl font-bold text-center w-full">SitDowns 😈</h2>
      {
        user ? (
          <>
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
            <button className="btn" onClick={() => handleLogout()}>
              Logout
            </button>
          </>
        ) : (
          <>
            {
              signup && (
                <>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </>
              )
            }

            <label>Email</label>
            <input
              type="text"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button 
              className="btn"
              onClick={(e) => {
                signup ? handleEmailSignup(email, password, name) :
                  handleEmailLogin(email, password)
              }}>
              {signup ? "Signup" : "Login"}
            </button>

            <button
              className="btn"
              onClick={(e) => {setSignup(!signup)}}>
              {signup ? "Login" : "Signup"} instead!
            </button>

            <button
              onClick={(e) => {
                handleOAuthLogin("google")
              }}>
              Sign in with Google
            </button>
          </>
        )
      }
    </div>
  )
}

export default IndexPopup
