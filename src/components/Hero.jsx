import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import './Hero.css'

const Hero = () => {
  useEffect(() => {
    const letters = document.querySelectorAll('.hero__letter')
    gsap.fromTo(letters, 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: 'back.out'
      }
    )
  }, [])

  return (
    <section className="hero">
      <div className="hero__background">
        <div className="hero__circle hero__circle-1"></div>
        <div className="hero__circle hero__circle-2"></div>
      </div>

      <div className="hero__content">
        <div className="hero__letters">
          <span className="hero__letter">A</span>
          <span className="hero__letter">U</span>
          <span className="hero__letter">R</span>
          <span className="hero__letter">A</span>
        </div>

        <h1 className="hero__title">Train Smarter, Not Harder</h1>
        <p className="hero__subtitle">
          AURA is a mobile-first fitness PWA that adapts to your body,<br />
          your schedule, and your goals. Personalized workouts powered by<br />
          intelligent algorithms.
        </p>

        <a href="#" className="hero__cta">Download Now →</a>
      </div>
    </section>
  )
}

export default Hero
