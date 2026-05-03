import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
   16. PHONE MOCKUP — animate on scroll
   ───────────────────────────────────────── */
function initPhoneMockup() {
  const phone = document.querySelector('.phone-frame');
  if (!phone) return;
  gsap.to(phone, {
    opacity: 0,
    y: -40,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: '50% top',
      scrub: 1.2
    }
  });
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
   DYNAMIC ISLAND
   ───────────────────────────────────────── */
function initDynamicIsland() {
  const island = document.getElementById('dynamic-island-landing');
  if (!island) return;
  setTimeout(() => island.classList.add('on'), 900);
  let count = 12847;
  const countEl = document.getElementById('di-count');
  setInterval(() => {
    count += Math.floor(Math.random() * 5) - 2;
    count = Math.max(12000, count);
    if (countEl) countEl.textContent = count.toLocaleString('it-IT');
  }, 3500);
}

/* ─────────────────────────────────────────
   TOAST SOCIAL PROOF
   ───────────────────────────────────────── */
function initToastsLanding() {
  const toasts = [
    { ico: '🔥', name: 'Marco R.', desc: 'ha completato il suo 200° workout' },
    { ico: '💪', name: 'Sara T.', desc: 'ha perso 8kg in 12 settimane' },
    { ico: '⭐', name: 'Luca P.', desc: 'ha raggiunto il Livello 10' },
    { ico: '🏋️', name: 'Giulia M.', desc: 'ha battuto il suo PR in squat' },
    { ico: '🎯', name: 'Andrea K.', desc: 'è su una streak di 30 giorni' },
    { ico: '🥗', name: 'Chiara V.', desc: 'ha seguito il piano dietetico 7 giorni' }
  ];
  const container = document.getElementById('toasts-landing');
  if (!container) return;
  let idx = 0;
  function removeToastL(el) {
    el.classList.remove('in');
    el.classList.add('out');
    setTimeout(() => el.remove(), 420);
  }
  function showToast() {
    const data = toasts[idx % toasts.length];
    idx++;
    const el = document.createElement('div');
    el.className = 'toast-l';
    el.innerHTML = `<span class="toast-l-ico">${data.ico}</span><div class="toast-l-body"><div class="toast-l-name">${data.name}</div><div class="toast-l-desc">${data.desc}</div></div>`;
    container.appendChild(el);
    el.addEventListener('click', () => removeToastL(el));
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('in')));
    setTimeout(() => removeToastL(el), 5000);
  }
  setTimeout(showToast, 4000);
  setInterval(showToast, 8000);
}

/* ─────────────────────────────────────────
   HEATMAP
   ───────────────────────────────────────── */
function initHeatmap() {
  const grid = document.getElementById('workout-heatmap');
  if (!grid) return;
  const pattern = [0,0,2,0,3,0,0, 1,0,2,0,4,0,0, 0,0,3,0,2,0,0, 1,0,4,0,3,0,2,1];
  pattern.forEach((heat) => {
    const cell = document.createElement('div');
    cell.className = `heat-cell h${heat}`;
    cell.title = heat > 0 ? `${heat} workout${heat > 1 ? ' series' : ''}` : 'Rest';
    grid.appendChild(cell);
  });
}

/* ─────────────────────────────────────────
   3D BADGE POP
   ───────────────────────────────────────── */
function initBadges3D() {
  const items = document.querySelectorAll('.cta-badge-3d-item');
  if (!items.length) return;
  ScrollTrigger.create({
    trigger: '#cta-3d-badges',
    start: 'top 88%',
    onEnter: () => {
      items.forEach((item, i) => {
        setTimeout(() => item.classList.add('popped'), i * 140);
      });
    }
  });
}

/* ─────────────────────────────────────────
   TYPEWRITER – AI COACH MSG
   ───────────────────────────────────────── */
function initTypewriterCoach() {
  const msgEl = document.querySelector('.app-coach-msg');
  if (!msgEl) return;
  const original = msgEl.textContent.trim();
  msgEl.innerHTML = '';
  const cursor = document.createElement('span');
  cursor.className = 'jarvis-cursor-blink';
  msgEl.appendChild(cursor);
  let i = 0;
  function type() {
    if (i < original.length) {
      msgEl.insertBefore(document.createTextNode(original[i]), cursor);
      i++;
      setTimeout(type, 22 + Math.random() * 18);
    } else {
      setTimeout(() => cursor.remove(), 1800);
    }
  }
  setTimeout(type, 2800);
}

/* ─────────────────────────────────────────
   LEVEL-UP EXPLOSION on stats enter
   ───────────────────────────────────────── */
function triggerLevelUpExplosion(label) {
  const overlay = document.createElement('div');
  overlay.className = 'level-up-overlay';
  const num = document.createElement('div');
  num.className = 'level-up-number';
  num.textContent = label;
  const sub = document.createElement('div');
  sub.className = 'level-up-sub';
  sub.textContent = 'atleti hanno già scelto AURA';
  for (let j = 0; j < 3; j++) {
    const wave = document.createElement('div');
    wave.className = 'shock-wave';
    wave.style.animationDelay = (j * 0.28) + 's';
    overlay.appendChild(wave);
  }
  overlay.appendChild(num);
  overlay.appendChild(sub);
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));
  overlay.addEventListener('click', () => {
    overlay.style.transition = 'opacity .3s';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 320);
  });
  setTimeout(() => {
    overlay.style.transition = 'opacity .5s';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 520);
  }, 2200);
}

function initLevelUpStats() {
  let fired = false;
  ScrollTrigger.create({
    trigger: '#stats',
    start: 'top 65%',
    onEnter: () => {
      if (fired) return;
      fired = true;
      setTimeout(() => triggerLevelUpExplosion('12.000+'), 600);
    }
  });
}

/* ─────────────────────────────────────────
   CONFETTI on CTA click
   ───────────────────────────────────────── */
function fireConfetti() {
  const cvs = document.createElement('canvas');
  cvs.style.cssText = 'position:fixed;inset:0;z-index:9989;pointer-events:none';
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
  document.body.appendChild(cvs);
  const ctx = cvs.getContext('2d');
  const particles = [];
  const colors = ['#f97316','#fb923c','#fbbf24','#22c55e','#38bdf8','#a78bfa'];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: window.innerWidth / 2, y: window.innerHeight / 2,
      vx: (Math.random() - .5) * 18, vy: (Math.random() - 1.2) * 14,
      w: 3 + Math.random() * 6, h: 4 + Math.random() * 5,
      c: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360, rv: (Math.random() - .5) * 14, g: .3 + Math.random() * .2
    });
  }
  const start = performance.now();
  function frame(now) {
    const t = now - start;
    if (t > 1400) { document.body.removeChild(cvs); return; }
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.globalAlpha = t > 1000 ? 1 - (t - 1000) / 400 : 1;
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += p.g; p.rot += p.rv; p.vx *= .98;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function initConfettiOnCta() {
  const btn = document.querySelector('.cta-shine-btn');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    fireConfetti();
    setTimeout(() => { window.location.href = btn.getAttribute('href') || '#cta'; }, 600);
  });
}

function onLoaderDone() {
  triggerScramble();
  initPhoneMockup();
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
  // NEW AURAMOBILE EFFECTS:
  initDynamicIsland();
  initToastsLanding();
  initHeatmap();
  initBadges3D();
  initTypewriterCoach();
  initLevelUpStats();
  initConfettiOnCta();
  ScrollTrigger.refresh();
}

/* ─────────────────────────────────────────
   INIT
   ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initLoader();
});
