import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { Building } from '../icons/Building'
// Import will be needed when API integration is implemented
// import { tenantsApi } from '../services/api'

interface TenantFormData {
  first_name: string;
  last_name: string;
  debt_amount: string;
  phone_number: string;
  property: string;
  debt_date: string;
  notes: string;
}

function NewTenant() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<TenantFormData>({
    first_name: '',
    last_name: '',
    debt_amount: '',
    phone_number: '',
    property: 'Parkland Ave Apartments', // Default value
    debt_date: new Date().toISOString().split('T')[0], // Current date as default
    notes: ''
  })
  
  const handleBackClick = () => {
    navigate('/dashboard')
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
    
    try {
      setIsSubmitting(true)
      setError(null)
      
      // Validate the form data
      if (!formData.first_name || !formData.last_name || !formData.debt_amount) {
        setError('Please fill in all required fields')
        setIsSubmitting(false)
        return
      }
      
      // For now, just log the data and navigate back - in a real app, we would call the API
      console.log('Creating new tenant:', formData)
      
      // In a real implementation, uncomment this code and the import at the top:
      /*
      // import { tenantsApi } from '../services/api'
      await tenantsApi.createTenant({
        first_name: formData.first_name,
        last_name: formData.last_name,
        debt_amount: parseFloat(formData.debt_amount),
        phone_number: formData.phone_number,
        debt_date: formData.debt_date,
        // Other fields as needed
      })
      */
      
      // Navigate back to dashboard after successful submission
      navigate('/dashboard')
    } catch (err) {
      console.error('Error creating tenant:', err)
      setError('Failed to create tenant. Please try again.')
      setIsSubmitting(false)
    }
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
          ← Back to Dashboard
        </div>
        
        <h2 className="tenant-name">New Tenant</h2>
        
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
          
          <div className="form-group">
            <label htmlFor="notes">Additional Notes</label>
            <input 
              type="text" 
              id="notes" 
              name="notes" 
              className="form-input"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
          
          <button 
            type="submit" 
            className="create-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewTenant 