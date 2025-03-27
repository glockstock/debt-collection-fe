import { useNavigate } from 'react-router-dom'
import '../App.css'
import { Building } from '../icons/Building'

function TenantDetails() {
  const navigate = useNavigate()
  
  const handleBackClick = () => {
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
        
        <h2 className="tenant-name">Dan Brooker</h2>
        
        <div className="detail-section">
          <div className="detail-label">Property</div>
          <div className="detail-value">Parkland Ave Apartments</div>
        </div>
        
        <div className="detail-section">
          <div className="detail-label">Owed</div>
          <div className="detail-value">
            <span className="amount negative">-$230.00</span>
            <span className="days-past">(90 days past due)</span>
          </div>
        </div>
        
        <div className="detail-section">
          <div className="detail-label">Overview (AI Generated)</div>
          <div className="detail-value detail-text">
            Dan was unable to pay the full rent in January and has yet to settle the owed amount. 
            He has paid full rent in subsequent months.
          </div>
        </div>
        
        <div className="detail-section">
          <div className="detail-label">Last Interaction (AI Generated)</div>
          <div className="detail-value detail-text">
            We sent Dan a text 6 days ago and still have not heard back.
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="contact-button">Contact via Call</button>
          <button className="contact-button">Contact via Text</button>
        </div>
        
        <button className="edit-button">Edit Tenant</button>
        <button className="delete-button">Delete Tenant</button>
      </div>
    </div>
  )
}

export default TenantDetails 