import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import { Building } from '../icons/Building'
import { tenantsApi } from '../services/api'
import { Tenant } from '../types/api'
import { formatCurrency, calculateDaysPastDue } from '../utils/formatters'

function TenantDetails() {
  const navigate = useNavigate()
  const { tenantId } = useParams<{ tenantId: string }>()
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchTenantDetails = async () => {
      if (!tenantId) {
        setError('Tenant ID is missing')
        setIsLoading(false)
        return
      }
      
      try {
        setIsLoading(true)
        const data = await tenantsApi.getTenantById(tenantId)
        setTenant(data)
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching tenant details:', err)
        setError('Failed to load tenant details. Please try again later.')
        setIsLoading(false)
      }
    }
    
    fetchTenantDetails()
  }, [tenantId])
  
  const handleBackClick = () => {
    navigate('/dashboard')
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
          <div className="back-link" onClick={handleBackClick}>
            ← Back to Dashboard
          </div>
          <div className="loading-indicator">Loading tenant details...</div>
        </div>
      </div>
    )
  }

  // Render error state
  if (error || !tenant) {
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
          <div className="back-link" onClick={handleBackClick}>
            ← Back to Dashboard
          </div>
          <div className="error-message">{error || 'Tenant not found'}</div>
        </div>
      </div>
    )
  }
  
  // Calculate days past due
  const daysPastDue = calculateDaysPastDue(tenant.debt_date)
  
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
        <div className="back-link" onClick={handleBackClick}>
          ← Back to Dashboard
        </div>
        
        <h2 className="tenant-name">{tenant.first_name} {tenant.last_name}</h2>
        
        <div className="detail-section">
          <div className="detail-label">Property</div>
          <div className="detail-value">Parkland Ave Apartments</div>
        </div>
        
        <div className="detail-section">
          <div className="detail-label">Owed</div>
          <div className="detail-value">
            <span className="amount negative">{formatCurrency(-tenant.debt_amount)}</span>
            <span className="days-past">({daysPastDue} days past due)</span>
          </div>
        </div>
        
        <div className="detail-section">
          <div className="detail-label">Overview (AI Generated)</div>
          <div className="detail-value detail-text">
            {tenant.first_name} was unable to pay the full rent in January and has yet to settle the owed amount. 
            They have paid full rent in subsequent months.
          </div>
        </div>
        
        <div className="detail-section">
          <div className="detail-label">Last Interaction (AI Generated)</div>
          <div className="detail-value detail-text">
            We sent {tenant.first_name} a text 6 days ago and still have not heard back.
          </div>
        </div>
        
        <div className="action-buttons">
          <button 
            className="contact-button" 
            onClick={() => window.open(`tel:${tenant.phone_number}`)}
          >
            Contact via Call
          </button>
          <button 
            className="contact-button"
            onClick={() => window.open(`sms:${tenant.phone_number}`)}
          >
            Contact via Text
          </button>
        </div>
        
        <button className="edit-button">Edit Tenant</button>
        <button className="delete-button">Delete Tenant</button>
      </div>
    </div>
  )
}

export default TenantDetails 