import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Features.css'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: '💪', title: 'Smart Workouts',   desc: 'AI-powered routines that learn from your performance and adapt in real-time.' },
  { icon: '📱', title: 'Mobile-First',      desc: 'Progressive web app. Works offline. Install like a native app on your device.' },
  { icon: '📊', title: 'Progress Tracking', desc: 'Beautiful analytics dashboards that visualize your fitness journey in real-time.' },
  { icon: '🎯', title: 'Goal-Based',         desc: 'Define your goals and let AURA build a personalized roadmap to success.' },
  { icon: '⚡', title: 'Ultra-Fast',         desc: 'Lightning-quick performance. No lag. Pure responsiveness, everywhere.' },
  { icon: '🔐', title: 'Private & Secure',  desc: 'Your data stays on your device. We never sell your fitness data.' },
]

const Features = () => {
  const sectionRef = useRef(null)
  const titleRef  = useRef(null)
  const cardsRef  = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
        }
      )
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="features" id="features" ref={sectionRef}>
      <h2 className="section-title" ref={titleRef}>Core Features</h2>
      <div className="features-grid">
        {features.map((feature, i) => (
          <div key={i} className="feature-card" ref={el => cardsRef.current[i] = el}>
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

