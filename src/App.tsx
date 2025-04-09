import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import SplashPage from './components/SplashPage'
import Dashboard from './components/Dashboard'
import TenantDetails from './components/TenantDetails'
import NewTenant from './components/NewTenant'
import EditTenant from './components/EditTenant'
import './App.css'

// Component to handle redirection from 404.html
function RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a path parameter in the URL (from 404.html redirection)
    const query = new URLSearchParams(location.search);
    const redirectPath = query.get('path');
    
    if (redirectPath) {
      // Remove the path parameter and navigate to the actual path
      navigate(redirectPath, { replace: true });
    }
  }, [location, navigate]);

  return null;
}

function App() {
  return (
    <Router basename="/debt-collection-fe">
      <RedirectHandler />
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tenant/:tenantId" element={<TenantDetails />} />
        <Route path="/tenant/:tenantId/edit" element={<EditTenant />} />
        <Route path="/new-tenant" element={<NewTenant />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
