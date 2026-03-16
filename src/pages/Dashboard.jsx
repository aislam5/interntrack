import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './Dashboard.css'
export default function Dashboard({ applications }) {
  const total = applications.length
  const interviews = applications.filter(a => a.status === 'Interview').length
  const offers = applications.filter(a => a.status === 'Offer').length
  const rejected = applications.filter(a => a.status === 'Rejected').length
  const chartData = [
  { name: 'Applied', value: applications.filter(a => a.status === 'Applied').length, color: '#6366f1' },
  { name: 'Interview', value: interviews, color: '#f59e0b' },
  { name: 'Offer', value: offers, color: '#10b981' },
  { name: 'Rejected', value: rejected, color: '#ef4444' },
]

  return (
  <div className="dashboard-container">
    <h1 className="page-title">Dashboard</h1>
    
    <div className="stats-grid">
      <div className="stat-card">
        <p className="stat-label">Total Applications</p>
        <h2 className="stat-number">{total}</h2>
      </div>
      <div className="stat-card interview">
        <p className="stat-label">Interviews</p>
        <h2 className="stat-number">{interviews}</h2>
      </div>
      <div className="stat-card offer">
        <p className="stat-label">Offers</p>
        <h2 className="stat-number">{offers}</h2>
      </div>
      <div className="stat-card rejected">
        <p className="stat-label">Rejected</p>
        <h2 className="stat-number">{rejected}</h2>
      </div>
    </div>

    <div className="chart-container">
      <h2 className="chart-title">Applications by Status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
)
}