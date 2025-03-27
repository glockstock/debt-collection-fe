import '../App.css'
import { Building } from '../icons/Building'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const handleTenantClick = (tenantId: string) => {
    navigate(`/tenant/${tenantId}`)
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
          <span className="amount negative">-$5,570.00</span>
        </div>
        
        <div className="tenant-list">
          <div className="tenant-item" onClick={() => handleTenantClick('serena-davis')}>
            <div className="tenant-info">
              <h3>Serena Davis</h3>
              <p>Parkland Ave Apartments</p>
            </div>
            <span className="amount negative">-$1,400.00</span>
          </div>
          
          <div className="tenant-item" onClick={() => handleTenantClick('andrew-brady')}>
            <div className="tenant-info">
              <h3>Andrew Brady</h3>
              <p>Parkland Ave Apartments</p>
            </div>
            <span className="amount negative">-$780.00</span>
          </div>
          
          <div className="tenant-item" onClick={() => handleTenantClick('ellicott-events')}>
            <div className="tenant-info">
              <h3>Ellicott Events LLC</h3>
              <p>Multiple Properties</p>
            </div>
            <span className="amount negative">-$3,160.00</span>
          </div>
          
          <div className="tenant-item" onClick={() => handleTenantClick('dan-brooker')}>
            <div className="tenant-info">
              <h3>Dan Brooker</h3>
              <p>Parkland Ave Apartments</p>
            </div>
            <span className="amount negative">-$230.00</span>
          </div>
        </div>
        
        <button className="new-tenant-button">
          New Tenant
        </button>
      </div>
    </div>
  )
}

export default Dashboard
