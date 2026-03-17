import { useState, useEffect } from 'react'
import './Applications.css'

export default function Applications({ supabase, session, applications, fetchApplications }) {

  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('Applied')
  const [appliedDate, setAppliedDate] = useState('')
  const [link, setLink] = useState('')

  async function handleAddApplication(){
    const {data, error} = await supabase
    .from('applications')
    .insert([{
      company: company,
      role: role,
      status: status,
      applied_date: appliedDate,
      link: link,
      user_id: session.user.id
    }])
    if (error){
      console.log('Error adding Application to Database', error.message)
    }
    else{
      console.log('Application Added Successfully')
      fetchApplications()
      setAppliedDate('')
      setCompany('')
      setLink('')
      setRole('')
      setStatus('Applied')
    }
  }

  async function handleDelete(id){
    const {data, error} = await supabase
    .from('applications')
    .delete()
    .eq('id', id)
    if (error){
      console.log('Error deleting Application from Database', error.message)
    }else{
      console.log('Application Deleted Successfully')
      fetchApplications()
    }
  }

  async function handleStatusChange(id, newStatus){
    const {error } = await supabase
    .from('applications')
    .update({ status: newStatus })
    .eq('id', id)
    if (error){
      console.error('Error updating application status:', error)
    }else{
      console.log('Application status updated successfully')
      fetchApplications()
    }
  }


return (
  <div className="applications-container">
    <h1 className="page-title">My Applications</h1>

    {/* Applications List */}
    <div className="applications-list">
      {applications.map((application) => (
        <div key={application.id} className="application-card">
          <div className="application-info">
            <h3 className="company-name">{application.company}</h3>
            <p className="role-name">{application.role}</p>
            <p className="applied-date">{application.applied_date}</p>
          </div>
          <div className="application-actions">
            <select
              value={application.status}
              onChange={(e) => handleStatusChange(application.id, e.target.value)}
              className={`status-select status-${application.status.toLowerCase().replace(' ', '-')}`}
            >
              <option value="In Progress">In Progress</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button 
              onClick={() => handleDelete(application.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Add Application Form */}
    <div className="add-application-form">
      <h2 className="form-title">Add Application</h2>
      <div className="form-grid">
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company name"
        />
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role applied for"
        />
        <input
          type="date"
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
        />
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Application link"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="In Progress">In Progress</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button onClick={handleAddApplication} className="add-btn">
          Add Application
        </button>
      </div>
    </div>
  </div>
  )
}