import React from 'react'
import './Features.css'

const Features = () => {
  const features = [
    { icon: '💪', title: 'Smart Workouts', desc: 'AI-powered routines that learn from your performance and adapt in real-time.' },
    { icon: '📱', title: 'Mobile-First', desc: 'Progressive web app. Works offline. Install like a native app on your device.' },
    { icon: '📊', title: 'Progress Tracking', desc: 'Beautiful analytics dashboards that visualize your fitness journey in real-time.' },
    { icon: '🎯', title: 'Goal-Based', desc: 'Define your goals and let AURA build a personalized roadmap to success.' },
    { icon: '⚡', title: 'Ultra-Fast', desc: 'Lightning-quick performance. No lag. Pure responsiveness, everywhere.' },
    { icon: '🔐', title: 'Private & Secure', desc: 'Your data stays on your device. We never sell your fitness data.' }
  ]

  return (
    <section className="features" id="features">
      <h2 className="section-title">Core Features</h2>
      <div className="features-grid">
        {features.map((feature, i) => (
          <div key={i} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-desc">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
