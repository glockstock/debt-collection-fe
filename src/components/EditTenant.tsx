import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import { Building } from '../icons/Building'
import { tenantsApi } from '../services/api'
import { Tenant } from '../types/api'

interface TenantFormData {
  first_name: string;
  last_name: string;
  debt_amount: string;
  phone_number: string;
  email: string;
  property: string;
  debt_date: string;
}

function EditTenant() {
  const navigate = useNavigate()
  const { tenantId } = useParams<{ tenantId: string }>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [formData, setFormData] = useState<TenantFormData>({
    first_name: '',
    last_name: '',
    debt_amount: '',
    phone_number: '',
    email: '',
    property: '',
    debt_date: new Date().toISOString().split('T')[0]
  })
  
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
        
        // Initialize form data with tenant details
        setFormData({
          first_name: data.first_name,
          last_name: data.last_name,
          debt_amount: data.debt_amount.toString(),
          phone_number: data.phone_number,
          email: data.email || '',
          property: data.property,
          debt_date: data.debt_date
        })
        
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
    navigate(`/tenant/${tenantId}`)
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!tenant) return;
    
    try {
      setIsSubmitting(true)
      setError(null)
      
      // Validate the form data
      if (!formData.first_name || !formData.last_name || !formData.debt_amount || !formData.email) {
        setError('Please fill in all required fields')
        setIsSubmitting(false)
        return
      }
      
      // Call API to update the tenant
      try {
        await tenantsApi.updateTenant({
          ...tenant, // Include existing properties like id, thread_id, etc.
          first_name: formData.first_name,
          last_name: formData.last_name,
          debt_amount: parseFloat(formData.debt_amount),
          phone_number: formData.phone_number,
          email: formData.email,
          property: formData.property,
          debt_date: formData.debt_date
        });
        
        // Navigate back to tenant details after successful update
        navigate(`/tenant/${tenantId}`)
      } catch (apiError) {
        console.error('Error updating tenant:', apiError)
        setError('Failed to update tenant. Please try again.')
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error('Error updating tenant:', err)
      setError('Failed to update tenant. Please try again.')
      setIsSubmitting(false)
    }
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
            ← Back to Tenant Details
          </div>
          <div className="loading-indicator">Loading tenant details...</div>
        </div>
      </div>
    )
  }
  
  // Render error state
  if (error && !tenant) {
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
            ← Back to Tenant Details
          </div>
          <div className="error-message">{error || 'Tenant not found'}</div>
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
        <div className="back-link" onClick={handleBackClick}>
          ← Back to Tenant Details
        </div>
        
        <h2 className="tenant-name">Edit Tenant</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="tenant-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input 
              type="text" 
              id="first_name" 
              name="first_name" 
              className="form-input"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input 
              type="text" 
              id="last_name" 
              name="last_name" 
              className="form-input"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="debt_amount">Amount Owed</label>
            <input 
              type="number" 
              id="debt_amount" 
              name="debt_amount" 
              className="form-input"
              value={formData.debt_amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input 
              type="tel" 
              id="phone_number" 
              name="phone_number" 
              className="form-input"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="+1XXXXXXXXXX"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="property">Property</label>
            <input 
              type="text" 
              id="property" 
              name="property" 
              className="form-input"
              value={formData.property}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="debt_date">Debt Date</label>
            <input 
              type="date" 
              id="debt_date" 
              name="debt_date" 
              className="form-input"
              value={formData.debt_date}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="create-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditTenant 