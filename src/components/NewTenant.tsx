import { useNavigate } from 'react-router-dom'
import '../App.css'
import { Building } from '../icons/Building'

function NewTenant() {
  const navigate = useNavigate()
  
  const handleBackClick = () => {
    navigate('/dashboard')
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would save the tenant data here
    // For now, just navigate back to the dashboard
    navigate('/dashboard')
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
        
        <form className="tenant-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="amountOwed">Amount Owed</label>
            <input 
              type="text" 
              id="amountOwed" 
              name="amountOwed" 
              className="form-input"
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
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="additionalNotes">Additional Notes</label>
            <input 
              type="text" 
              id="additionalNotes" 
              name="additionalNotes" 
              className="form-input"
            />
          </div>
          
          <button type="submit" className="create-button">
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewTenant 