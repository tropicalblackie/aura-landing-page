import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Cursor.css'

const Cursor = () => {
  const ringRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) {
      ring.style.display = 'none'
      dot.style.display = 'none'
      return
    }

    const mouse = { x: -200, y: -200 }
    const pos = { x: -200, y: -200 }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      // dot snaps immediately
      gsap.set(dot, { x: mouse.x, y: mouse.y, xPercent: -50, yPercent: -50 })
    }

    window.addEventListener('mousemove', onMove)

    // Ring follows with smooth lerp
    const tickerFn = () => {
      pos.x += (mouse.x - pos.x) * 0.1
      pos.y += (mouse.y - pos.y) * 0.1
      gsap.set(ring, { x: pos.x, y: pos.y, xPercent: -50, yPercent: -50 })
    }
    gsap.ticker.add(tickerFn)

    // Hover states
    const onEnter = () => {
      gsap.to(ring, { width: 60, height: 60, duration: 0.3, ease: 'power2.out' })
      ring.classList.add('cursor--hover')
    }
    const onLeave = () => {
      gsap.to(ring, { width: 36, height: 36, duration: 0.3, ease: 'power2.out' })
      ring.classList.remove('cursor--hover')
    }

    const attach = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attach()

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tickerFn)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  )
}

export default Cursor
