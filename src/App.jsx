import {useState, useEffect} from 'react'
import {supabase} from './supabaseClient'
import Auth from './pages/Auth'



function App() {
  const [session, setSession] = useState(null)

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session)

    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  return (
    <div>
      {session ? (
      <div>
        <h1>You are logged in</h1>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    ) : <Auth supabase={supabase} />}
  </div>
  )
}

export default App