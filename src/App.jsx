import {useState, useEffect} from 'react'
import {supabase} from './supabaseClient'
import Auth from './pages/Auth'
import Applications from './pages/Applications'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Listings from './pages/Listings'


function App() {
  const [session, setSession] = useState(null)
  const[applications, setApplications] = useState([])

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  async function fetchApplications() {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
  if (error) {
    console.error(error)
  } else {
    setApplications(data)
  }
}

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session)
      if (session) {
        fetchApplications()
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        fetchApplications()
      }
    })
  }, [])


  return (
  <div>
    {session ? (
      <BrowserRouter>
        <Navbar handleLogout={handleLogout} />
        <Routes>
          <Route path="/dashboard" element={<Dashboard applications={applications} />} />
          <Route
            path="/applications"
            element={<Applications supabase={supabase} session={session} applications={applications} fetchApplications={fetchApplications} />}
          />
          <Route path="/listings" element={<Listings supabase={supabase} session={session} />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    ) : <Auth supabase={supabase} />}
  </div>
)
}

export default App