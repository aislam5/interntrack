import { useState, useEffect } from 'react'

export default function Listings({supabase, session}) {
  const [listings, setListings] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const listingsPerPage = 20
  const startIndex = (currentPage - 1) * listingsPerPage
  const currentListings = listings.slice(startIndex, startIndex + listingsPerPage)

  useEffect(() => {
    async function fetchListings() {
      const response = await fetch('https://raw.githubusercontent.com/SimplifyJobs/Summer2026-Internships/dev/.github/scripts/listings.json')
        const data = await response.json()
        
        const activeListings = data.filter(listing => listing.is_visible === true && listing.active === true)
        
        console.log('Active listings:', activeListings.length)
        setListings(activeListings)
    }

    fetchListings()
  }, [])

  async function handleApply(listing) {
  // Open the job posting in a new tab
  window.open(listing.url, '_blank')

  // Create an application record in Supabase
  const { error } = await supabase
    .from('applications')
    .insert([{
      company: listing.company_name,
      role: listing.title,
      status: 'In Progress',
      user_id: session.user.id,
      link: listing.url,
      applied_date: new Date().toISOString().split('T')[0]
    }])

  if (error) {
    console.error('Error saving application:', error.message)
  } else {
    console.log('Application saved!')
  }
}

  return (
    <div>
      <h1>Internship Listings</h1>
      {currentListings.map((listing, index) => (
        <div key={index}>
          <p>{listing.company_name}</p>
          <p>{listing.title}</p>
        <p>{listing.location}</p>
          <button onClick={() => handleApply(listing)}>Apply</button>
        </div>
      ))}
      <div>
        <button 
            onClick={() => setCurrentPage(p => p - 1)}
            disabled={currentPage === 1}
        >
            Previous
        </button>
        <p>Page {currentPage}</p>
        <button 
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage * listingsPerPage >= listings.length}
        >
            Next
        </button>
        </div>
    </div>
  )
}