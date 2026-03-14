import {useState, useEffect} from 'react'
import {supabase} from './supabaseClient'
import Auth from './pages/Auth'
import Applications from './pages/Applications'



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
        <Applications supabase={supabase} session={session}/>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      ) : <Auth supabase={supabase} />}
    </div>
  )
}

export default App