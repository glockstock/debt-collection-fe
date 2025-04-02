import { useState, useEffect } from 'react'
import '../App.css'
import { Building } from '../icons/Building'
import { useNavigate } from 'react-router-dom'
import { tenantsApi } from '../services/api'
import { Tenant } from '../types/api'
import { formatCurrency, calculateDaysPastDue } from '../utils/formatters'

function Dashboard() {
  const navigate = useNavigate()
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [totalDebt, setTotalDebt] = useState<number>(0)

  // Fetch tenant data when component mounts
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setIsLoading(true)
        const data = await tenantsApi.getAllTenants()
        setTenants(data)
        
        // Calculate total debt
        const total = data.reduce((sum, tenant) => sum + tenant.debt_amount, 0)
        setTotalDebt(total)
        
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching tenants:', err)
        setError('Failed to load tenants. Please try again later.')
        setIsLoading(false)
      }
    }

    fetchTenants()
  }, [])

  const handleTenantClick = (tenantId: string) => {
    navigate(`/tenant/${tenantId}`)
  }
  
  const handleNewTenantClick = () => {
    navigate('/new-tenant')
  }

  // Render loading state
  if (isLoading) {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>CollectAI</h1>
        </header>
        <div className="company-header">
          <Building />
          <span>Cedarland Development Group</span>
        </div>
        <div className="content-container">
          <div className="loading-indicator">Loading tenant data...</div>
        </div>
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>CollectAI</h1>
        </header>
        <div className="company-header">
          <Building />
          <span>Cedarland Development Group</span>
        </div>
        <div className="content-container">
          <div className="error-message">{error}</div>
          <button 
            className="new-tenant-button" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>CollectAI</h1>
      </header>
      <div className="company-header">
        <Building />
        <span>Cedarland Development Group</span>
      </div>
      <div className="content-container">
        <div className="delinquencies-header">
          <h2>Delinquencies</h2>
          <span className="amount negative">{formatCurrency(-totalDebt)}</span>
        </div>
        
        <div className="tenant-list">
          {tenants.length === 0 ? (
            <div className="empty-state">No delinquent tenants found.</div>
          ) : (
            tenants.map((tenant) => (
              <div 
                key={tenant.id} 
                className="tenant-item" 
                onClick={() => handleTenantClick(tenant.id)}
              >
                <div className="tenant-info">
                  <h3>{tenant.first_name} {tenant.last_name}</h3>
                  <p>Days past due: {calculateDaysPastDue(tenant.debt_date)}</p>
                </div>
                <span className="amount negative">
                  {formatCurrency(-tenant.debt_amount)}
                </span>
              </div>
            ))
          )}
        </div>
        
        <button className="new-tenant-button" onClick={handleNewTenantClick}>
          New Tenant
        </button>
      </div>
    </div>
  )
}

export default Dashboard
