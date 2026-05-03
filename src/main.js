import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Initial GSAP states (before loader finishes) ─────────────
gsap.set('.hero-line',  { y: 90, opacity: 0 })
gsap.set('.hero-eyebrow, .hero-sub, .hero-actions, .hero-scroll-wrap, .hero-badge',
         { opacity: 0 })

// ── Three.js ─────────────────────────────────────────────────
const canvas   = document.getElementById('gl')
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 0)

const scene  = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 5

// Particles
const COUNT = 1600
const pPos  = new Float32Array(COUNT * 3)
const pSpd  = new Float32Array(COUNT)
for (let i = 0; i < COUNT; i++) {
  const theta = Math.random() * Math.PI * 2
  const phi   = Math.acos(2 * Math.random() - 1)
  const r     = 2.4 + Math.random() * 4.2
  pPos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
  pPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
  pPos[i*3+2] = r * Math.cos(phi) - 1.5
  pSpd[i]     = 0.00035 + Math.random() * 0.0007
}
const pGeo = new THREE.BufferGeometry()
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
const pMat = new THREE.PointsMaterial({ color: 0x9d85f5, size: 0.02, transparent: true, opacity: 0, sizeAttenuation: true, depthWrite: false })
const particles = new THREE.Points(pGeo, pMat)
scene.add(particles)

// Orb group
const orbGroup = new THREE.Group()
scene.add(orbGroup)

const coreGeo = new THREE.SphereGeometry(0.5, 64, 64)
const coreMat = new THREE.MeshStandardMaterial({ color: 0x9d85f5, emissive: 0x7060cc, emissiveIntensity: 1.4, roughness: 0.2, metalness: 0.7, transparent: true, opacity: 0 })
orbGroup.add(new THREE.Mesh(coreGeo, coreMat))

const innerGeo = new THREE.SphereGeometry(0.66, 32, 32)
const innerMat = new THREE.MeshBasicMaterial({ color: 0xc4acff, transparent: true, opacity: 0, side: THREE.BackSide })
orbGroup.add(new THREE.Mesh(innerGeo, innerMat))

const r1Geo = new THREE.TorusGeometry(0.96, 0.007, 8, 120)
const r1Mat = new THREE.MeshBasicMaterial({ color: 0x9d85f5, transparent: true, opacity: 0 })
const ring1 = new THREE.Mesh(r1Geo, r1Mat)
ring1.rotation.x = Math.PI / 3.5
orbGroup.add(ring1)

const r2Geo = new THREE.TorusGeometry(1.32, 0.005, 8, 120)
const r2Mat = new THREE.MeshBasicMaterial({ color: 0xc4acff, transparent: true, opacity: 0 })
const ring2 = new THREE.Mesh(r2Geo, r2Mat)
ring2.rotation.x = -Math.PI / 5
ring2.rotation.y =  Math.PI / 4
orbGroup.add(ring2)

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.4))
const pl1 = new THREE.PointLight(0x9d85f5, 4, 12)
pl1.position.set(2, 2, 3)
scene.add(pl1)
const pl2 = new THREE.PointLight(0xc4acff, 2, 8)
pl2.position.set(-2, -1, 2)
scene.add(pl2)

// ── Cursor ───────────────────────────────────────────────────
const dot      = document.getElementById('cursor-dot')
const ring     = document.getElementById('cursor-ring')
const ringPos  = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
const mouse    = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX; mouse.y = e.clientY
  gsap.set(dot, { x: e.clientX, y: e.clientY })
})

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'))
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'))
})

// ── Loader ───────────────────────────────────────────────────
const loaderEl   = document.getElementById('loader')
const loaderFill = loaderEl.querySelector('.loader-fill')

gsap.to(loaderFill, { width: '100%', duration: 0.9, ease: 'power2.inOut' })
gsap.to(loaderEl,   {
  opacity: 0, duration: 0.5, delay: 1.1,
  onComplete () {
    loaderEl.style.display = 'none'
    document.body.classList.remove('is-loading')
    startHeroAnim()
  }
})

// ── Hero entrance ─────────────────────────────────────────────
function startHeroAnim () {
  // Fade in Three.js scene
  gsap.to([coreMat, innerMat], { opacity: (i) => [0.9, 0.1][i], duration: 2, ease: 'power2.out', delay: 0.3 })
  gsap.to([r1Mat, r2Mat],      { opacity: (i) => [0.5, 0.3][i], duration: 2, ease: 'power2.out', delay: 0.4 })
  gsap.to(pMat,                { opacity: 0.55, duration: 2.2, ease: 'power2.out' })

  const tl = gsap.timeline({ delay: 0.15 })
  tl.to('#header',        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0)
  tl.to('.hero-eyebrow',  { opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.2)
  tl.to('[data-line="0"]',{ opacity: 1, y: 0, duration: 1,   ease: 'power4.out' }, 0.32)
  tl.to('[data-line="1"]',{ opacity: 1, y: 0, duration: 1,   ease: 'power4.out' }, 0.46)
  tl.to('[data-line="2"]',{ opacity: 1, y: 0, duration: 1,   ease: 'power4.out' }, 0.6)
  tl.to('.hero-sub',      { opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.72)
  tl.to('.hero-actions',  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.82)
  tl.to('.hero-scroll-wrap, .hero-badge', { opacity: 1, duration: 0.6 }, 1.05)

  gsap.set('#header', { opacity: 0, y: -20 })
  gsap.set('.hero-actions', { y: 20 })
}

// ── Hero scroll parallax (scrub) ─────────────────────────────
// Each title line moves at a different speed
gsap.to('[data-line="0"]', {
  y: -110,
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.4 }
})
gsap.to('[data-line="1"]', {
  y: 70,
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.0 }
})
gsap.to('[data-line="2"]', {
  y: -90,
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.7 }
})
gsap.to('.hero-sub, .hero-actions', {
  opacity: 0, y: -30,
  scrollTrigger: { trigger: '#hero', start: '15% top', end: '55% top', scrub: true }
})
// Canvas fades out as hero leaves
gsap.to('#gl', {
  opacity: 0,
  scrollTrigger: { trigger: '#hero', start: 'center top', end: 'bottom top', scrub: true }
})

// ── Header: solid on scroll ───────────────────────────────────
ScrollTrigger.create({
  trigger: '#hero',
  start: 'bottom 80px',
  onEnter    : () => document.getElementById('header').classList.add('scrolled'),
  onLeaveBack: () => document.getElementById('header').classList.remove('scrolled'),
})

// ── Universal scroll reveal ───────────────────────────────────
// Elements with [data-reveal] fade up when entering viewport
gsap.utils.toArray('[data-reveal]').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 42 },
    {
      opacity: 1, y: 0,
      duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    }
  )
})

// Staggered children: parent has [data-stagger="0.08"]
gsap.utils.toArray('[data-stagger]').forEach(parent => {
  const delay = parseFloat(parent.dataset.stagger) || 0.08
  gsap.fromTo(Array.from(parent.children),
    { opacity: 0, y: 44 },
    {
      opacity: 1, y: 0,
      duration: 0.85, stagger: delay, ease: 'power3.out',
      scrollTrigger: { trigger: parent, start: 'top 82%', once: true }
    }
  )
})

// ── Stats counter ─────────────────────────────────────────────
ScrollTrigger.create({
  trigger: '#stats',
  start: 'top 78%',
  once: true,
  onEnter () {
    document.querySelectorAll('.stat-val').forEach(el => {
      const end    = parseInt(el.dataset.count)
      const suffix = el.dataset.suffix
      const obj    = { v: 0 }
      gsap.to(obj, {
        v: end, duration: 2.2, ease: 'power2.out',
        onUpdate () { el.textContent = Math.round(obj.v) + suffix }
      })
    })
  }
})

// ── Manifesto dramatic entrance ───────────────────────────────
gsap.fromTo('.manifesto-q',
  { opacity: 0, y: 60, scale: 0.97 },
  {
    opacity: 1, y: 0, scale: 1,
    duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '#manifesto', start: 'top 68%', once: true }
  }
)

// ── Render loop ───────────────────────────────────────────────
const clock = new THREE.Clock()
const orbTarget = { x: 0, y: 0 }

function tick () {
  requestAnimationFrame(tick)
  const t = clock.getElapsedTime()

  // Cursor ring lerp
  ringPos.x += (mouse.x - ringPos.x) * 0.1
  ringPos.y += (mouse.y - ringPos.y) * 0.1
  gsap.set(ring, { x: ringPos.x, y: ringPos.y })

  // Normalized mouse (-1 to 1)
  const nx = (mouse.x / window.innerWidth)  * 2 - 1
  const ny = (mouse.y / window.innerHeight) * 2 - 1

  // Orb mouse tilt + auto-rotation
  orbTarget.x += (nx * 0.24 - orbTarget.x) * 0.04
  orbTarget.y += (-ny * 0.18 - orbTarget.y) * 0.04
  orbGroup.rotation.y = orbTarget.x + t * 0.16
  orbGroup.rotation.x = orbTarget.y + Math.sin(t * 0.26) * 0.06
  ring1.rotation.z = t * 0.22
  ring2.rotation.z = -t * 0.15

  // Particles drift upward + subtle mouse follow
  const pos = pGeo.attributes.position.array
  for (let i = 0; i < COUNT; i++) {
    pos[i*3+1] += pSpd[i]
    if (pos[i*3+1] > 7) pos[i*3+1] = -7
  }
  pGeo.attributes.position.needsUpdate = true
  particles.rotation.y = nx * 0.1
  particles.rotation.x = -ny * 0.07

  renderer.render(scene, camera)
}
tick()

// ── Resize ────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  ScrollTrigger.refresh()
})
