import {useState, useEffect} from 'react'
import {supabase} from './supabaseClient'
import Auth from './pages/Auth'

function App() {
const [session, setSession] = useState(null)

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
    {session ? <h1>You are logged in</h1> : <Auth supabase={supabase} />}
  </div>
)
}

export default App