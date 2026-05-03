import React from 'react'
import './Menu.css'

const Menu = ({ isOpen, onClose }) => {
  return (
    <div className={`menu ${isOpen ? 'menu--active' : ''}`}>
      <div className="menu__content">
        <a href="#features" className="menu__item" onClick={onClose}>Features</a>
        <a href="#stats" className="menu__item" onClick={onClose}>About</a>
        <a href="#cta" className="menu__item" onClick={onClose}>Download</a>
        <a href="mailto:hello@aura.app" className="menu__item menu__item--contact" onClick={onClose}>Contact</a>
      </div>
    </div>
  )
}

export default Menu
