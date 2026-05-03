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
   22. SCROLL ATHLETE — running figure scrubbed to scroll
   ───────────────────────────────────────── */
function initScrollAthlete() {
  const el = document.getElementById('scroll-athlete');
  if (!el) return;

  // Pivot each limb-group around its joint using SVG coordinate space
  gsap.set('#sa-ar', { svgOrigin: '14 -66' });
  gsap.set('#sa-al', { svgOrigin: '-14 -66' });
  gsap.set('#sa-lr', { svgOrigin: '9 -38' });
  gsap.set('#sa-ll', { svgOrigin: '-9 -38' });

  // 4 complete running strides mapped to full page scroll
  const CYCLES = 4;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5
    }
  });

  for (let i = 0; i < CYCLES; i++) {
    const t = i; // absolute timeline position (0,1,2,3)

    // Pose A — right foot forward
    tl.to('#sa-ar', { rotation:  30, ease: 'sine.inOut', duration: 0.25 }, t)
      .to('#sa-al', { rotation: -30, ease: 'sine.inOut', duration: 0.25 }, t)
      .to('#sa-lr', { rotation: -33, ease: 'sine.inOut', duration: 0.25 }, t)
      .to('#sa-ll', { rotation:  33, ease: 'sine.inOut', duration: 0.25 }, t)
    // Pose B — neutral
      .to('#sa-ar', { rotation:   0, ease: 'sine.inOut', duration: 0.25 }, t + 0.25)
      .to('#sa-al', { rotation:   0, ease: 'sine.inOut', duration: 0.25 }, t + 0.25)
      .to('#sa-lr', { rotation:   0, ease: 'sine.inOut', duration: 0.25 }, t + 0.25)
      .to('#sa-ll', { rotation:   0, ease: 'sine.inOut', duration: 0.25 }, t + 0.25)
    // Pose C — left foot forward
      .to('#sa-ar', { rotation: -30, ease: 'sine.inOut', duration: 0.25 }, t + 0.5)
      .to('#sa-al', { rotation:  30, ease: 'sine.inOut', duration: 0.25 }, t + 0.5)
      .to('#sa-lr', { rotation:  33, ease: 'sine.inOut', duration: 0.25 }, t + 0.5)
      .to('#sa-ll', { rotation: -33, ease: 'sine.inOut', duration: 0.25 }, t + 0.5)
    // Pose D — neutral
      .to('#sa-ar', { rotation:   0, ease: 'sine.inOut', duration: 0.25 }, t + 0.75)
      .to('#sa-al', { rotation:   0, ease: 'sine.inOut', duration: 0.25 }, t + 0.75)
      .to('#sa-lr', { rotation:   0, ease: 'sine.inOut', duration: 0.25 }, t + 0.75)
      .to('#sa-ll', { rotation:   0, ease: 'sine.inOut', duration: 0.25 }, t + 0.75);
  }

  // Subtle body bounce: rises on each stride, falls on impact
  const bounceTl = gsap.timeline({
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5
    }
  });
  for (let i = 0; i < CYCLES * 2; i++) {
    const t = i * 0.5;
    bounceTl
      .to('#sa-svg', { y: -5, ease: 'sine.inOut', duration: 0.25 }, t)
      .to('#sa-svg', { y:  0, ease: 'sine.inOut', duration: 0.25 }, t + 0.25);
  }

  // Fade in when #about scrolls into view, hide on hero and footer
  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 80%',
    onEnter:     () => gsap.to(el, { opacity: 1, duration: 0.8, ease: 'power2.out' }),
    onLeaveBack: () => gsap.to(el, { opacity: 0, duration: 0.5 })
  });
  ScrollTrigger.create({
    trigger: 'footer',
    start: 'top 85%',
    onEnter:     () => gsap.to(el, { opacity: 0, duration: 0.6 }),
    onLeaveBack: () => gsap.to(el, { opacity: 1, duration: 0.4 })
  });
}

/* ─────────────────────────────────────────
   BOOT — after loader done
   ───────────────────────────────────────── */
function onLoaderDone() {
  // initialize everything
  triggerScramble();
  initPhoneMockup();
  initScrollAthlete();
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
