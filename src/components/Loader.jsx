import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div className="loader loader--animate">
      <div className="loader__inner">
        <div className="loader__wrap">
          <div className="loader__box">
            <div>A</div>
            <div>U</div>
            <div>R</div>
            <div>A</div>
            <div>A</div>
            <div>U</div>
          </div>
        </div>
        <span className="loader__title">AURA</span>
        <p className="loader__tagline">
          Train Smarter, Not Harder.<br />
          Personalized workouts that adapt to you.
        </p>
      </div>

      <div className="loader__progress">
        <div className="loader__progress-inner">
          <div className="loader__inner">
            <div className="loader__wrap">
              <div className="loader__box loader__box--accent">
                <div>A</div>
                <div>U</div>
                <div>R</div>
                <div>A</div>
                <div>A</div>
                <div>U</div>
              </div>
            </div>
            <span className="loader__title">AURA</span>
            <p className="loader__tagline">
              Train Smarter, Not Harder.<br />
              Personalized workouts that adapt to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader
