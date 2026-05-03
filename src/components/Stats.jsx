import React from 'react'
import './Stats.css'

const Stats = () => {
  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '250K+', label: 'Workouts Completed' },
    { number: '45+', label: 'Countries' },
    { number: '98%', label: 'User Satisfaction' }
  ]

  return (
    <section className="stats" id="stats">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-item">
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
