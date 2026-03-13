import {useState} from 'react'

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

    return(
        <div>
            <h1>InternTrack</h1>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder = "Email"
            />

            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />

            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}