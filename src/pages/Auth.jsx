import {useState} from 'react'
import './Auth.css'

export default function Auth({supabase}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSignUp() {
        const {data, error} = await supabase.auth.signUp({ email, password})
        if (error) {
            console.error('Error signing up:', error.message)
        }else{
            console.log('Sign up successful:', data)
        }
    }

    async function handleLogin() {
        const {data, error} = await supabase.auth.signInWithPassword({ email, password})
        if (error) {
            console.error('Error logging in:', error.message)
        }else{
            console.log('Login successful:', data)
        }
    }

    return (
  <div className="auth-container">
    <div className="auth-card">
      <div className="auth-header">
        <h1 className="auth-logo">InternTrack</h1>
        <p className="auth-subtitle">Track your career path</p>
      </div>

      <div className="auth-form">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          type="email"
          className="auth-input"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="auth-input"
        />

        <button onClick={handleLogin} className="auth-btn-primary">
          Login
        </button>
        <button onClick={handleSignUp} className="auth-btn-secondary">
          Sign Up
        </button>
      </div>
    </div>
  </div>
)

}