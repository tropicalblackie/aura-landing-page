import React from 'react'
import './Header.css'

const navItems = [
  { href: '#features', label: 'Features' },
  { href: '#stats', label: 'About' },
  { href: '#cta', label: 'Download' },
]

const Header = ({ onMenuClick, menuOpen }) => {
  return (
    <header className="header">
      <a href="#" className="header__logo">AURA</a>

      <nav className="header__nav">
        {navItems.map(({ href, label }) => (
          <a key={label} href={href} className="nav-item">
            <span className="nav-item__text">{label}</span>
            <span className="nav-item__hover">{label}</span>
          </a>
        ))}
      </nav>

      <button
        className={`header__menu-btn${menuOpen ? ' header__menu-btn--open' : ''}`}
        onClick={onMenuClick}
        aria-label="Toggle menu"
      >
        <span className="header__menu-btn__bg" />
        <div className="header__menu-btn__dots">
          <span />
          <span />
        </div>
      </button>
    </header>
  )
}

export default Header
