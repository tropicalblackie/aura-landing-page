import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   AURA brand constants
   ───────────────────────────────────────── */
const C_CORE  = 0xf97316;
const C_RING1 = 0xea6c0d;
const C_RING2 = 0xfb923c;
const C_PART  = 0xf97316;

/* ─────────────────────────────────────────
   1. LOADER
   ───────────────────────────────────────── */
function initLoader() {
  const fill = document.querySelector('.loader-fill');
  const loader = document.getElementById('loader');

  gsap.to(fill, {
    width: '100%',
    duration: 1.8,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        duration: .55,
        ease: 'power2.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          document.body.classList.remove('is-loading');
          onLoaderDone();
        }
      });
    }
  });
}

/* ─────────────────────────────────────────
   2. TEXT SCRAMBLE
   ───────────────────────────────────────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
function scramble(el, final, duration = 1.6) {
  let frame = 0;
  const totalFrames = Math.round(duration * 60);
  const len = final.length;
  const interval = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    let out = '';
    for (let i = 0; i < len; i++) {
      if (i < Math.floor(progress * len)) {
        out += final[i];
      } else {
        out += final[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    el.textContent = out;
    if (frame >= totalFrames) {
      clearInterval(interval);
      el.textContent = final;
    }
  }, 1000 / 60);
}

/* ─────────────────────────────────────────
   3. SPLIT TEXT — [data-split]
   ───────────────────────────────────────── */
function initSplitText() {
  document.querySelectorAll('[data-split]').forEach(el => {
    const words = el.innerText.split(' ');
    el.innerHTML = words.map(w =>
      `<span class="word"><span class="word-inner">${w}</span></span>`
    ).join(' ');
  });
}

/* ─────────────────────────────────────────
   4. SECTION HEADING REVEAL (word-inner clip)
   ───────────────────────────────────────── */
function initHeadingReveals() {
  document.querySelectorAll('[data-split]').forEach(el => {
    const inners = el.querySelectorAll('.word-inner');
    gsap.from(inners, {
      y: '110%',
      duration: .9,
      ease: 'power3.out',
      stagger: .06,
      scrollTrigger: {
        trigger: el,
        start: 'top 84%',
        toggleActions: 'play none none none'
      }
    });
  });
}

/* ─────────────────────────────────────────
   5. DATA-REVEAL + DATA-STAGGER
   ───────────────────────────────────────── */
function initReveal() {
  // Individual reveals
  document.querySelectorAll('[data-reveal]').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: .8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Stagger groups
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const delay = parseFloat(parent.dataset.stagger) || 0.08;
    const children = parent.children;
    gsap.from(children, {
      opacity: 0,
      y: 40,
      duration: .75,
      ease: 'power3.out',
      stagger: delay,
      scrollTrigger: {
        trigger: parent,
        start: 'top 86%',
        toggleActions: 'play none none none'
      }
    });
  });
}

/* ─────────────────────────────────────────
   6. MANIFESTO — line-by-line scrub
   ───────────────────────────────────────── */
function initManifesto() {
  const lines = document.querySelectorAll('.m-line');
  if (!lines.length) return;

  lines.forEach((line, i) => {
    gsap.to(line, {
      opacity: 1,
      y: 0,
      x: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#manifesto',
        start: `top+=${i * 80} 72%`,
        toggleActions: 'play none none none'
      }
    });
  });
}

/* ─────────────────────────────────────────
   7. 3D CARD TILT — [data-tilt]
   ───────────────────────────────────────── */
function initCardTilt() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      gsap.to(card, {
        rotateX: -dy * 8,
        rotateY: dx * 8,
        transformPerspective: 800,
        duration: .3,
        ease: 'power2.out'
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: .55,
        ease: 'power2.out'
      });
    });
  });
}

/* ─────────────────────────────────────────
   8. MAGNETIC BUTTONS — .magnetic
   ───────────────────────────────────────── */
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * .28;
      const dy = (e.clientY - cy) * .28;
      gsap.to(btn, { x: dx, y: dy, duration: .35, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.5)' });
    });
  });
}

/* ─────────────────────────────────────────
   9. STEP LINE DRAW
   ───────────────────────────────────────── */
function initStepLines() {
  document.querySelectorAll('.step-line').forEach(line => {
    gsap.to(line, {
      width: '100%',
      duration: .9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });
}

/* ─────────────────────────────────────────
   10. LIQUID XP BAR FILL
   ───────────────────────────────────────── */
function initLiquidBars() {
  const scales = [1, 1, 0.98, 0.92]; // fill ratios per stat

  document.querySelectorAll('.xp-liquid').forEach((bar, i) => {
    const scale = scales[i] ?? 1;
    bar.style.setProperty('--target-scale', scale);

    ScrollTrigger.create({
      trigger: bar,
      start: 'top 88%',
      onEnter: () => {
        if (!bar.classList.contains('filling')) {
          bar.classList.add('filling');
        }
      }
    });
  });
}

/* ─────────────────────────────────────────
   11. BADGE POP
   ───────────────────────────────────────── */
function initBadgePop() {
  document.querySelectorAll('.badge-pop-item').forEach((badge, i) => {
    ScrollTrigger.create({
      trigger: badge,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(badge, {
          opacity: 1,
          scale: 1,
          duration: .5,
          ease: 'back.out(1.7)',
          delay: i * .12
        });
        badge.classList.add('badge-popped');
      }
    });
  });
}

/* ─────────────────────────────────────────
   12. STATS COUNTER
   ───────────────────────────────────────── */
function initCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 86%',
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          }
        });
      }
    });
  });
}

/* ─────────────────────────────────────────
   13. SCROLL PROGRESS BAR (RAF)
   ───────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  function update() {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (scrolled / total) * 100 : 0;
    bar.style.width = pct + '%';
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ─────────────────────────────────────────
   14. HEADER SCROLL CLASS
   ───────────────────────────────────────── */
function initHeader() {
  const header = document.getElementById('header');
  ScrollTrigger.create({
    start: 'top -60px',
    onUpdate: self => {
      header.classList.toggle('scrolled', self.scroll() > 60);
    }
  });
}

/* ─────────────────────────────────────────
   15. CURSOR LERP
   ───────────────────────────────────────── */
function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  // dot follows immediately
  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
  });

  // ring lerps
  (function tick() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  })();

  // hover state
  document.querySelectorAll('a,button,.feat-card,.testi,.btn-fill,.btn-ghost,.btn-nav').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ─────────────────────────────────────────
   16. THREE.JS ORB
   ───────────────────────────────────────── */
function initThreeOrb() {
  const canvas = document.getElementById('gl');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .1, 100);
  camera.position.z = 4;

  // Core sphere
  const coreMat = new THREE.MeshStandardMaterial({
    color: C_CORE,
    emissive: C_CORE,
    emissiveIntensity: .45,
    roughness: .3,
    metalness: .6,
    transparent: true,
    opacity: .9
  });
  const core = new THREE.Mesh(new THREE.SphereGeometry(.72, 64, 64), coreMat);
  scene.add(core);

  // Inner glow (back-side)
  const innerMat = new THREE.MeshStandardMaterial({
    color: C_CORE,
    emissive: C_CORE,
    emissiveIntensity: .7,
    side: THREE.BackSide,
    transparent: true,
    opacity: .35
  });
  const innerGlow = new THREE.Mesh(new THREE.SphereGeometry(.82, 32, 32), innerMat);
  scene.add(innerGlow);

  // Outer ring 1
  const ring1Mat = new THREE.MeshBasicMaterial({
    color: C_RING1,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: .55,
    wireframe: false
  });
  const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(1.12, .008, 16, 120),
    ring1Mat
  );
  ring1.rotation.x = Math.PI / 2.5;
  scene.add(ring1);

  // Outer ring 2
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: C_RING2,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: .38
  });
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(1.35, .006, 16, 120),
    ring2Mat
  );
  ring2.rotation.x = Math.PI / 3.8;
  ring2.rotation.y = Math.PI / 5;
  scene.add(ring2);

  // Particles
  const count = 1600;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const phi   = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r     = 1.7 + Math.random() * .6;
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const partGeo = new THREE.BufferGeometry();
  partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const partMat = new THREE.PointsMaterial({
    color: C_PART,
    size: .018,
    transparent: true,
    opacity: .65,
    sizeAttenuation: true
  });
  const particles = new THREE.Points(partGeo, partMat);
  scene.add(particles);

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, .5));
  const pLight = new THREE.PointLight(C_CORE, 3, 10);
  pLight.position.set(2, 2, 2);
  scene.add(pLight);
  const pLight2 = new THREE.PointLight(C_RING2, 2, 8);
  pLight2.position.set(-2, -1, 2);
  scene.add(pLight2);

  // Mouse parallax
  let targetX = 0, targetY = 0;
  document.addEventListener('mousemove', e => {
    targetX = (e.clientX / window.innerWidth - .5) * .6;
    targetY = (e.clientY / window.innerHeight - .5) * .6;
  });

  // Canvas fade on scroll (ScrollTrigger)
  gsap.to(canvas, {
    opacity: 0,
    scrollTrigger: {
      start: 'top top',
      end: '30% top',
      scrub: true
    }
  });

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Render loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    core.rotation.y  = t * .18;
    core.rotation.x  = t * .06;
    ring1.rotation.z = t * .22;
    ring2.rotation.z = -t * .14;
    ring2.rotation.y = t * .1;
    particles.rotation.y = t * .04;
    particles.rotation.x = t * .02;

    // Parallax tilt
    core.rotation.y      += (targetX - core.rotation.y) * .04;
    ring1.rotation.y     += targetX * .02;
    particles.rotation.y += targetX * .01;

    // Breathe emissive
    coreMat.emissiveIntensity = .4 + .15 * Math.sin(t * 1.4);
    innerMat.emissiveIntensity = .6 + .2 * Math.sin(t * 1.8 + 1);

    renderer.render(scene, camera);
  }
  animate();
}

/* ─────────────────────────────────────────
   17. HERO ENTRANCE TIMELINE
   ───────────────────────────────────────── */
function initHeroEntrance() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('.hero-eyebrow', { opacity: 1, duration: .7, delay: .1 })
    .to('.hero-line',     { opacity: 1, y: 0, duration: .8, stagger: .14 }, '-=.3')
    .to('.hero-sub',      { opacity: 1, duration: .7 }, '-=.35')
    .to('.hero-actions',  { opacity: 1, duration: .6 }, '-=.3')
    .to('.hero-thinking', { opacity: 1, duration: .5 }, '-=.2')
    .to('.hero-scroll-wrap', { opacity: 1, duration: .6 }, '-=.1')
    .to('.hero-badge',    { opacity: 1, duration: .5, stagger: .1 }, '-=.4');
}

/* ─────────────────────────────────────────
   18. HERO LINES PARALLAX SCRUB
   ───────────────────────────────────────── */
function initHeroParallax() {
  const lines = document.querySelectorAll('.hero-line');
  const speeds = [0, 1, 2];
  lines.forEach((line, i) => {
    gsap.to(line, {
      y: -80 * (speeds[i] || 0),
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: speeds[i] || true
      }
    });
  });
}

/* ─────────────────────────────────────────
   19. SCRAMBLE after loader
   ───────────────────────────────────────── */
function triggerScramble() {
  const el = document.querySelector('[data-scramble]');
  if (!el) return;
  const final = el.textContent.trim();
  el.style.opacity = 1;
  scramble(el, final.toUpperCase(), 1.4);
}

/* ─────────────────────────────────────────
   20. ELASTIC BOUNCE on section enter
   ───────────────────────────────────────── */
function initElasticEnter() {
  document.querySelectorAll('.feat-card,.testi,.stat,.about-item').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        gsap.from(el, {
          y: 30,
          scale: .95,
          opacity: 0,
          duration: .65,
          ease: 'back.out(1.6)'
        });
      }
    });
  });
}

/* ─────────────────────────────────────────
   21. TICKER — ensure smooth loop
   ───────────────────────────────────────── */
function initTicker() {
  // CSS handles it — just ensure paused on hover (CSS handles)
}

/* ─────────────────────────────────────────
   BOOT — after loader done
   ───────────────────────────────────────── */
function onLoaderDone() {
  // initialize everything
  triggerScramble();
  initThreeOrb();
  initHeroEntrance();
  initHeroParallax();
  initSplitText();
  initHeadingReveals();
  initReveal();
  initManifesto();
  initCardTilt();
  initMagnetic();
  initStepLines();
  initLiquidBars();
  initBadgePop();
  initCounters();
  initScrollProgress();
  initHeader();
  initElasticEnter();
  initTicker();
  ScrollTrigger.refresh();
}

/* ─────────────────────────────────────────
   INIT
   ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initLoader();
});
