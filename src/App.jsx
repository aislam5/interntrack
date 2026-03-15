import {useState, useEffect} from 'react'
import {supabase} from './supabaseClient'
import Auth from './pages/Auth'
import Applications from './pages/Applications'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'


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
      <BrowserRouter>
        <Navbar handleLogout={handleLogout} />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/applications"
            element={<Applications supabase={supabase} session={session} />}
          />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    ) : <Auth supabase={supabase} />}
  </div>
)
}

export default App