import { useNavigate } from 'react-router-dom'
import loginImg from './login.png'

export default function Header() {
  const navigate = useNavigate()

  return (
    <div className="bg-green-500 text-green-100 p-4 text-xl font-bold flex items-center justify-between">
      <span>EcoTruck</span>
      <button
        type="button"
        onClick={() => navigate('/login')}
        className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-900 flex items-center justify-center"
        aria-label="Login"
      >
        <img src={loginImg} alt="Login" className="w-6 h-6 object-contain" />
      </button>
    </div>
  )
}