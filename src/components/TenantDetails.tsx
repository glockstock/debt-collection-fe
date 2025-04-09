import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import { Building } from '../icons/Building'
import { tenantsApi, agentApi } from '../services/api'
import { Tenant } from '../types/api'
import { formatCurrency, calculateDaysPastDue } from '../utils/formatters'

function TenantDetails() {
  const navigate = useNavigate()
  const { tenantId } = useParams<{ tenantId: string }>()
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isCallInProgress, setIsCallInProgress] = useState<boolean>(false)
  const [callStatus, setCallStatus] = useState<string | null>(null)
  const [isSmsInProgress, setIsSmsInProgress] = useState<boolean>(false)
  const [smsStatus, setSmsStatus] = useState<string | null>(null)
  
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

  const handleMakeCall = async () => {
    if (!tenant || !tenant.phone_number) return;
    
    try {
      console.log('Tenant phone number:', tenant.phone_number);
      console.log('Tenant data:', tenant);
      
      setIsCallInProgress(true);
      setCallStatus('Initiating call...');
      
      const response = await agentApi.makeOutboundCall(tenant.phone_number);
      console.log('Call API response:', response);
      
      setCallStatus('Call initiated successfully!');
      
      // Reset status after a few seconds
      setTimeout(() => {
        setIsCallInProgress(false);
        setCallStatus(null);
      }, 3000);
      
    } catch (error: any) {
      console.error('Failed to make call:', error);
      
      // Extract more specific error message if available
      let errorMessage = 'Failed to initiate call. Please try again.';
      
      if (error.response) {
        console.log('Error response:', error.response);
        
        if (error.response.data) {
          if (typeof error.response.data === 'string') {
            errorMessage = `Error: ${error.response.data}`;
          } else if (error.response.data.message) {
            errorMessage = `Error: ${error.response.data.message}`;
          }
        }
        
        errorMessage += ` (Status: ${error.response.status})`;
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setCallStatus(errorMessage);
      
      setTimeout(() => {
        setIsCallInProgress(false);
        setCallStatus(null);
      }, 5000);
    }
  };
  
  const handleSendSms = async () => {
    if (!tenant || !tenant.phone_number) return;
    
    try {
      console.log('Tenant phone number for SMS:', tenant.phone_number);
      
      setIsSmsInProgress(true);
      setSmsStatus('Sending text message...');
      
      const response = await agentApi.sendSms(tenant.phone_number);
      console.log('SMS API response:', response);
      
      setSmsStatus('Text message sent successfully!');
      
      // Reset status after a few seconds
      setTimeout(() => {
        setIsSmsInProgress(false);
        setSmsStatus(null);
      }, 3000);
      
    } catch (error: any) {
      console.error('Failed to send SMS:', error);
      
      // Extract more specific error message if available
      let errorMessage = 'Failed to send text message. Please try again.';
      
      if (error.response) {
        console.log('SMS Error response:', error.response);
        
        if (error.response.data) {
          if (typeof error.response.data === 'string') {
            errorMessage = `Error: ${error.response.data}`;
          } else if (error.response.data.message) {
            errorMessage = `Error: ${error.response.data.message}`;
          }
        }
        
        errorMessage += ` (Status: ${error.response.status})`;
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setSmsStatus(errorMessage);
      
      setTimeout(() => {
        setIsSmsInProgress(false);
        setSmsStatus(null);
      }, 5000);
    }
  };

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
            onClick={handleMakeCall}
            disabled={isCallInProgress || isSmsInProgress}
          >
            {isCallInProgress ? 'Calling...' : 'Contact via Call'}
          </button>
          <button 
            className="contact-button"
            onClick={handleSendSms}
            disabled={isCallInProgress || isSmsInProgress}
          >
            {isSmsInProgress ? 'Sending...' : 'Contact via Text'}
          </button>
        </div>
        
        {callStatus && (
          <div className={`call-status ${callStatus.includes('Failed') ? 'error' : 'success'}`}>
            {callStatus}
          </div>
        )}
        
        {smsStatus && (
          <div className={`call-status ${smsStatus.includes('Failed') ? 'error' : 'success'}`}>
            {smsStatus}
          </div>
        )}
        
        <button 
          className="edit-button"
          onClick={() => navigate(`/tenant/${tenant.id}/edit`)}
        >
          Edit Tenant
        </button>
        <button className="delete-button">Delete Tenant</button>
      </div>
    </div>
  )
}

export default TenantDetails 