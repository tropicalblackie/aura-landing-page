import React, { useState, useEffect } from 'react'
import Loader from './components/Loader'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Stats from './components/Stats'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Cursor from './components/Cursor'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="app">
      {isLoading && <Loader />}
      <Cursor position={cursorPos} />
      <Header onMenuClick={() => setShowMenu(!showMenu)} />
      <Menu isOpen={showMenu} onClose={() => setShowMenu(false)} />
      
      <main className="main-content">
        <Hero />
        <Features />
        <Stats />
        <CTA />
      </main>

      <Footer />
    </div>
  )
}

export default App
