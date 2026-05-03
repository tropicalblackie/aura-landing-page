import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import * as THREE from 'three'
import './Hero.css'

const Hero = () => {
  const canvasRef = useRef(null)
  const lettersRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  // Three.js particle background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const count = 1200
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
      speeds[i] = Math.random() * 0.004 + 0.001
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      size: 0.025,
      color: 0x00d9a3,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    let animId
    const pos = geometry.attributes.position.array
    const animate = () => {
      animId = requestAnimationFrame(animate)
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += speeds[i]
        if (pos[i * 3 + 1] > 6) pos[i * 3 + 1] = -6
      }
      geometry.attributes.position.needsUpdate = true
      camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.04
      camera.position.y += (mouse.y * 0.25 - camera.position.y) * 0.04
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  // GSAP text entrance
  useEffect(() => {
    const letters = lettersRef.current?.querySelectorAll('.hero__letter')
    const sub = subtitleRef.current
    const cta = ctaRef.current

    const tl = gsap.timeline({ delay: 0.9 })
    tl.fromTo(letters,
      { opacity: 0, y: 80, skewY: 4 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.1, stagger: 0.07, ease: 'power4.out' }
    )
    .fromTo(sub,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5'
    )
    .fromTo(cta,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4'
    )

    return () => tl.kill()
  }, [])

  return (
    <section className="hero">
      {/* Three.js particle canvas */}
      <canvas ref={canvasRef} className="hero__canvas" />

      {/* Radial glow */}
      <div className="hero__glow" />

      {/* Typography */}
      <div className="hero__content">
        <div className="hero__letters" ref={lettersRef}>
          {['A', 'U', 'R', 'A'].map((l, i) => (
            <span key={i} className="hero__letter">{l}</span>
          ))}
        </div>

        <p className="hero__subtitle" ref={subtitleRef}>
          A mobile-first fitness PWA that adapts to your body,
          your schedule, and your goals.
        </p>

        <div className="hero__actions" ref={ctaRef}>
          <a href="#cta" className="hero__btn">
            <span>Download Now</span>
            <span className="hero__btn-arrow">→</span>
          </a>
          <a href="#features" className="hero__scroll">Explore ↓</a>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="hero__ticker">
        <div className="hero__ticker-track">
          {Array(2).fill(['Smart Workouts', 'Mobile First', 'Progress Tracking', 'Goal Based', 'Ultra Fast', 'Private & Secure']).flat().map((item, i) => (
            <span key={i} className="hero__ticker-item">{item}<span className="hero__ticker-dot">·</span></span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
