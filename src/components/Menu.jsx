import React from 'react'
import './Menu.css'

const navItems = [
  { num: '01', label: 'Index',    href: '#' },
  { num: '02', label: 'Features', href: '#features' },
  { num: '03', label: 'Download', href: '#cta' },
  { num: '04', label: 'Contact',  href: 'mailto:hello@aura.app' },
]

const Menu = ({ isOpen, onClose }) => {
  return (
    <div className={`menu${isOpen ? ' menu--active' : ''}`}>
      <div className="menu__inner">
        <nav className="menu__nav">
          {navItems.map(({ num, label, href }) => (
            <a key={num} href={href} className="menu__item" onClick={onClose}>
              <span className="menu__item-num">{num}</span>
              <span className="menu__item-text">
                <span className="menu__item-text--normal">{label}</span>
                <span className="menu__item-text--hover">{label}</span>
              </span>
            </a>
          ))}
        </nav>

        <footer className="menu__footer">
          <div>
            <a href="mailto:hello@aura.app" className="menu__link" onClick={onClose}>
              &#11169;&nbsp; hello@aura.app
            </a>
          </div>
          <div className="menu__socials">
            <a href="https://twitter.com"   target="_blank" rel="noopener noreferrer" className="menu__link">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="menu__link">Instagram</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Menu
