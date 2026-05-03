import React, { useEffect, useRef } from 'react'
import './Cursor.css'

const Cursor = ({ position }) => {
  const cursorRef = useRef(null)

  useEffect(() => {
    if (!cursorRef.current) return

    cursorRef.current.style.left = position.x + 'px'
    cursorRef.current.style.top = position.y + 'px'
  }, [position])

  useEffect(() => {
    // Hide cursor on mobile
    if (window.matchMedia('(hover: none)').matches) {
      if (cursorRef.current) {
        cursorRef.current.style.display = 'none'
      }
    }

    const handleElementHover = () => {
      const interactiveElements = document.querySelectorAll('a, button')
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (cursorRef.current) {
            cursorRef.current.classList.add('cursor--hover')
          }
        })

        el.addEventListener('mouseleave', () => {
          if (cursorRef.current) {
            cursorRef.current.classList.remove('cursor--hover')
          }
        })
      })
    }

    handleElementHover()
  }, [])

  return <div ref={cursorRef} className="cursor" />
}

export default Cursor
