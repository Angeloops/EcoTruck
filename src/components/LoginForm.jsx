import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

const handleLogin = async (e) => {
  e.preventDefault()
  setError('')

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    setError(error.message)
  } else {
    const loggedInEmail = data.user.email
    const allowedAdminEmail = 'stakeholder@gmail.com'

    if (loggedInEmail === allowedAdminEmail) {
      navigate('/adminDashboard')
    } else {
      setError('You are not authorized.')
      await supabase.auth.signOut() // Sign them out immediately
    }
  }
}
  return (
    <form onSubmit={handleLogin} className="p-4 max-w-sm mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">SWMO Admin Login</h2 >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 mb-2 w-full"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600">
        Log In
      </button>
    </form>
  )
}