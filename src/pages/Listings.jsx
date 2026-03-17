import { useState, useEffect } from 'react'
import './Listings.css'

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
  <div className="listings-container">
    <h1 className="page-title">Internship Listings</h1>
    <p className="listings-subtitle">Browse {listings.length} active internship opportunities</p>

    <div className="listings-grid">
      {currentListings.map((listing, index) => (
        <div key={index} className="listing-card">
          <div className="listing-info">
            <h3 className="listing-company">{listing.company_name}</h3>
            <p className="listing-role">{listing.title}</p>
            <p className="listing-location">📍 {listing.locations}</p>
          </div>
          <button 
            onClick={() => handleApply(listing)}
            className="apply-btn"
          >
            Apply
          </button>
        </div>
      ))}
    </div>

    <div className="pagination">
      <button
        onClick={() => setCurrentPage(p => p - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        Previous
      </button>
      <p className="page-indicator">Page {currentPage}</p>
      <button
        onClick={() => setCurrentPage(p => p + 1)}
        disabled={currentPage * listingsPerPage >= listings.length}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  </div>
)
}