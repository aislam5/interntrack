import { useState, useEffect } from 'react'

export default function Applications({ supabase, session }) {

  const [applications, setApplications] = useState([])
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

  async function fetchApplications(){
      const { data, error } = await supabase
      .from('applications')
      .select('*')
      if (error) {
        console.error('Error fetching applications:', error)
      } else {
        setApplications(data)
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
    
  useEffect(() => {
    // fetch applications from supabase here
    fetchApplications()
  }, [])

  return (
    <div>
      <h1>My Applications</h1>
      {applications.map((application) => (
        <div key={application.id}>
            <p>{application.company}</p>
            <p>{application.role}</p>
            <select 
              value={application.status}
              onChange={(e) => handleStatusChange(application.id, e.target.value)}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            <p>{application.applied_date}</p>
            <button onClick={() => handleDelete(application.id)}>Delete</button>
        </div>
      ))}

      <div>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company name"
        />
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder='Role Applied for'
        />

        <input
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
          placeholder='Date Applied'
        />

        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder='application link'
        />
        
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button onClick={handleAddApplication}>Show Application</button>
      </div>
    </div>
  )
}