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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      {isLoading && <Loader />}
      <Cursor />
      <Header onMenuClick={() => setShowMenu(!showMenu)} menuOpen={showMenu} />
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
