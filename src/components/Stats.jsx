import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Stats.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: '10K+',  label: 'Active Users' },
  { number: '250K+', label: 'Workouts Completed' },
  { number: '45+',   label: 'Countries' },
  { number: '98%',   label: 'User Satisfaction' },
]

const Stats = () => {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(itemsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="stats" id="stats" ref={sectionRef}>
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-item" ref={el => itemsRef.current[i] = el}>
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
