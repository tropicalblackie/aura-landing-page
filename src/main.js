import * as THREE from 'three'
import { gsap } from 'gsap'

// ─── Scene setup ───────────────────────────────────────────
const canvas = document.getElementById('gl')
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 0)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 5

// ─── Particle field ─────────────────────────────────────────
const PARTICLE_COUNT = 1800
const positions = new Float32Array(PARTICLE_COUNT * 3)
const speeds    = new Float32Array(PARTICLE_COUNT)
const sizes     = new Float32Array(PARTICLE_COUNT)

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const theta = Math.random() * Math.PI * 2
  const phi   = Math.acos(2 * Math.random() - 1)
  const r     = 2.2 + Math.random() * 3.5
  positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
  positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
  positions[i * 3 + 2] = r * Math.cos(phi) - 1
  speeds[i]  = 0.0003 + Math.random() * 0.0006
  sizes[i]   = Math.random()
}

const particleGeo = new THREE.BufferGeometry()
particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particleGeo.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1))

const particleMat = new THREE.PointsMaterial({
  color: 0x9b7fe8,
  size: 0.022,
  transparent: true,
  opacity: 0,
  sizeAttenuation: true,
  depthWrite: false,
})

const particles = new THREE.Points(particleGeo, particleMat)
scene.add(particles)

// ─── Central orb ────────────────────────────────────────────
const orbGroup = new THREE.Group()
scene.add(orbGroup)

// Core sphere
const coreGeo = new THREE.SphereGeometry(0.52, 64, 64)
const coreMat = new THREE.MeshStandardMaterial({
  color: 0x9b7fe8,
  emissive: 0x7b5ec8,
  emissiveIntensity: 1.2,
  roughness: 0.3,
  metalness: 0.6,
  transparent: true,
  opacity: 0,
})
const core = new THREE.Mesh(coreGeo, coreMat)
orbGroup.add(core)

// Inner glow sphere
const innerGeo = new THREE.SphereGeometry(0.68, 32, 32)
const innerMat = new THREE.MeshBasicMaterial({
  color: 0xc4a8ff,
  transparent: true,
  opacity: 0,
  wireframe: false,
  side: THREE.BackSide,
})
const inner = new THREE.Mesh(innerGeo, innerMat)
orbGroup.add(inner)

// Orbit ring 1
const ring1Geo = new THREE.TorusGeometry(1.05, 0.008, 8, 120)
const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x9b7fe8, transparent: true, opacity: 0 })
const ring1 = new THREE.Mesh(ring1Geo, ringMat1)
ring1.rotation.x = Math.PI / 3
orbGroup.add(ring1)

// Orbit ring 2
const ring2Geo = new THREE.TorusGeometry(1.35, 0.005, 8, 120)
const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xc4a8ff, transparent: true, opacity: 0 })
const ring2 = new THREE.Mesh(ring2Geo, ringMat2)
ring2.rotation.x = -Math.PI / 5
ring2.rotation.y = Math.PI / 4
orbGroup.add(ring2)

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0x9b7fe8, 3, 10)
pointLight.position.set(2, 2, 3)
scene.add(pointLight)
const pointLight2 = new THREE.PointLight(0xc4a8ff, 1.5, 8)
pointLight2.position.set(-2, -1, 2)
scene.add(pointLight2)

// ─── Mouse tracking ─────────────────────────────────────────
const mouse    = { x: 0, y: 0 }
const target   = { x: 0, y: 0 }
const cursorDot  = document.getElementById('cursor-dot')
const cursorRing = document.getElementById('cursor-ring')
const ringPos  = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
  gsap.set(cursorDot, { x: e.clientX, y: e.clientY })
})

// ─── Figure parallax ────────────────────────────────────────
const figureLayer = document.getElementById('figure-layer')
const figureSvg   = document.getElementById('figure-svg')
const figureGlow  = document.getElementById('figure-glow')
const bgRings     = document.getElementById('bg-rings')
const figPos = { x: 0, y: 0 }
const figRot = { x: 0, y: 0 }

// ─── Entrance animation ─────────────────────────────────────
const tl = gsap.timeline({ delay: 0.3 })

// Header items
tl.from('#header', { opacity: 0, y: -20, duration: 0.8, ease: 'power3.out' }, 0)

// Background rings
tl.from('.ring', {
  opacity: 0,
  scale: 0.85,
  duration: 1.2,
  stagger: 0.15,
  ease: 'power3.out',
}, 0.2)

// Three.js elements fade in
tl.to([coreMat, innerMat, ringMat1, ringMat2], {
  opacity: (i) => [0.85, 0.12, 0.5, 0.3][i],
  duration: 1.4,
  ease: 'power2.out',
}, 0.4)

tl.to(particleMat, { opacity: 0.65, duration: 1.8, ease: 'power2.out' }, 0.2)

// SVG figure
tl.from('#figure-svg', {
  opacity: 0,
  scale: 0.82,
  y: 40,
  duration: 1.2,
  ease: 'power3.out',
}, 0.5)

tl.from('#figure-glow', {
  opacity: 0,
  scale: 0.5,
  duration: 1.4,
  ease: 'power2.out',
}, 0.4)

// Title lines
tl.from('.title-line', {
  opacity: 0,
  y: 60,
  duration: 1.0,
  stagger: 0.12,
  ease: 'power4.out',
}, 0.6)

// Footer
tl.from('#footer > *', {
  opacity: 0,
  y: 18,
  duration: 0.8,
  stagger: 0.08,
  ease: 'power3.out',
}, 0.9)

// ─── Render loop ─────────────────────────────────────────────
const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)

  const t = clock.getElapsedTime()

  // Cursor ring lerp
  ringPos.x += (mouse.x - ringPos.x) * 0.12
  ringPos.y += (mouse.y - ringPos.y) * 0.12
  gsap.set(cursorRing, { x: ringPos.x, y: ringPos.y })

  // Mouse normalized -1 to 1
  const nx = (mouse.x / window.innerWidth)  * 2 - 1
  const ny = (mouse.y / window.innerHeight) * 2 - 1

  // Figure parallax (SVG)
  figPos.x += ((nx * 22) - figPos.x) * 0.06
  figPos.y += ((ny * 12) - figPos.y) * 0.06
  figRot.x += ((-ny * 8) - figRot.x) * 0.05
  figRot.y += ((nx  * 12) - figRot.y) * 0.05
  figureSvg.style.transform =
    `translate(${figPos.x}px, ${figPos.y}px) rotateX(${figRot.x}deg) rotateY(${figRot.y}deg)`
  figureGlow.style.transform =
    `translate(${figPos.x * 0.5}px, ${figPos.y * 0.5}px)`

  // Background rings subtle parallax
  bgRings.style.transform =
    `translate(${nx * -12}px, ${ny * -8}px)`

  // Three.js orb rotation + mouse tilt
  target.x += (nx * 0.3 - target.x) * 0.05
  target.y += (-ny * 0.2 - target.y) * 0.05
  orbGroup.rotation.y = target.x + t * 0.18
  orbGroup.rotation.x = target.y + Math.sin(t * 0.3) * 0.08
  ring1.rotation.z = t * 0.25
  ring2.rotation.z = -t * 0.18

  // Particle drift
  const pos = particleGeo.attributes.position.array
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    pos[i * 3 + 1] += speeds[i]
    if (pos[i * 3 + 1] > 6) pos[i * 3 + 1] = -6
  }
  particleGeo.attributes.position.needsUpdate = true

  // Particles follow mouse slightly
  particles.rotation.y = nx * 0.15
  particles.rotation.x = -ny * 0.1

  renderer.render(scene, camera)
}

animate()

// ─── Resize ─────────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
