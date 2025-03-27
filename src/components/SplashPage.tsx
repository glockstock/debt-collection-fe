import { useNavigate } from 'react-router-dom'
import '../App.css'

function SplashPage() {
  const navigate = useNavigate()

  return (
    <div className="app-container">
      <h1>Debt Collection</h1>
      <p>Manage your debt collection process efficiently</p>
      <div className="card">
        <button onClick={() => navigate('/dashboard')}>
          Sign In
        </button>
      </div>
    </div>
  )
}

export default SplashPage 