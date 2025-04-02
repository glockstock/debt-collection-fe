import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SplashPage from './components/SplashPage'
import Dashboard from './components/Dashboard'
import TenantDetails from './components/TenantDetails'
import NewTenant from './components/NewTenant'
import './App.css'

function App() {
  return (
    <Router basename="/debt-collection-fe">
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tenant/:tenantId" element={<TenantDetails />} />
        <Route path="/new-tenant" element={<NewTenant />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
