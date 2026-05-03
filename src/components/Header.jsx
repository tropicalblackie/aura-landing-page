import React from 'react'
import './Header.css'

const Header = ({ onMenuClick }) => {
  return (
    <header className="header">
      <a href="#" className="header__logo">AURA</a>
      
      <nav className="header__nav">
        <a href="#features">Features</a>
        <a href="#stats">About</a>
        <a href="#cta">Download</a>
      </nav>

      <button className="header__menu" onClick={onMenuClick} aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  )
}

export default Header
