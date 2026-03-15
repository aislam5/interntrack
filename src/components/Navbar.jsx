import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({ handleLogout }) {
  return (
    <nav>
      <h1>InternTrack</h1>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/applications">Applications</Link>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </nav>
  )
}