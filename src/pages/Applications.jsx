import { useState, useEffect } from 'react'

export default function Applications({ supabase, session }) {

  const [applications, setApplications] = useState([])

  useEffect(() => {
    // fetch applications from supabase here
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
    fetchApplications()
  }, [])

  return (
    <div>
      <h1>My Applications</h1>
      {applications.map((application) => (
        <div key={application.id}>
            <p>{application.company}</p>
            <p>{application.role}</p>
            <p>{application.status}</p>
            <p>{application.applied_date}</p>
        </div>
      ))}
    </div>
  )
}