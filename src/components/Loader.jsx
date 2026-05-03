import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import './Loader.css'

const Loader = () => {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const cubeRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 3
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x0a0a0a, 1)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create cube with letters
    const cubeGroup = new THREE.Group()
    const letters = ['A', 'U', 'R', 'A', 'A', 'U']
    const positions = [
      [0, 0, 1],    // front
      [0, 0, -1],   // back
      [1, 0, 0],    // right
      [-1, 0, 0],   // left
      [0, 1, 0],    // top
      [0, -1, 0]    // bottom
    ]
    const rotations = [
      [0, 0, 0],
      [0, Math.PI, 0],
      [0, Math.PI / 2, 0],
      [0, -Math.PI / 2, 0],
      [-Math.PI / 2, 0, 0],
      [Math.PI / 2, 0, 0]
    ]

    letters.forEach((letter, i) => {
      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext('2d')

      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, 512, 512)

      ctx.strokeStyle = 'rgba(0, 217, 163, 0.3)'
      ctx.lineWidth = 4
      ctx.strokeRect(20, 20, 472, 472)

      ctx.fillStyle = '#00d9a3'
      ctx.font = 'bold 300px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(letter, 256, 256)

      const texture = new THREE.CanvasTexture(canvas)
      const geometry = new THREE.PlaneGeometry(2, 2)
      const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
      const plane = new THREE.Mesh(geometry, material)

      const [x, y, z] = positions[i]
      const [rx, ry, rz] = rotations[i]
      plane.position.set(x, y, z)
      plane.rotation.set(rx, ry, rz)

      cubeGroup.add(plane)
    })

    scene.add(cubeGroup)
    cubeRef.current = cubeGroup

    // Animation loop
    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      cubeGroup.rotation.x += 0.008
      cubeGroup.rotation.y += 0.012
      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="loader">
      <div ref={containerRef} className="loader__canvas" />
      <div className="loader__content">
        <h1 className="loader__title">AURA</h1>
        <p className="loader__subtitle">
          Mobile-first fitness experience<br />
          with intelligent personalization
        </p>
      </div>
    </div>
  )
}

export default Loader
