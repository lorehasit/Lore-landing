/* =====================================================
   Lore — interactions
   Lenis smooth scroll + GSAP/ScrollTrigger choreography
   ===================================================== */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  if (reduced || !window.gsap) {
    document.documentElement.classList.add('no-motion');
    revealAllStatic();
  } else {
    gsap.registerPlugin(ScrollTrigger);
    initLenis();
    initHero();
    initSplitLines();
    initFades();
    initCards();
    initCounters();
    initStepsRail();
    initChart();
    initCaptureRows();
    initFloatingChips();
    initTilt();
  }

  initNavState();
  initMarquee();
  initTypers();
  initWaitlist();
});

/* ---------- marquee: duplicate cards for a seamless -50% loop ---------- */
function initMarquee() {
  document.querySelectorAll('[data-marquee] .marquee-track').forEach(track => {
    track.append(...[...track.children].map(c => c.cloneNode(true)));
  });
}

/* ---------- static fallback ---------- */
function revealAllStatic() {
  document.querySelectorAll('[data-count]').forEach(el => (el.textContent = el.dataset.count));
  const area = document.getElementById('curveArea');
  const dotG = document.getElementById('curveDot');
  const note = document.getElementById('chartNote');
  if (area) area.setAttribute('opacity', '1');
  if (dotG) dotG.setAttribute('opacity', '1');
  if (note) note.style.opacity = 1;
  document.querySelectorAll('.chat-srcs,.ask-srcs').forEach(el => (el.style.opacity = 1));
}

/* ---------- lenis smooth scroll ---------- */
function initLenis() {
  if (!window.Lenis) return;
  const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // anchor links through lenis
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        lenis.scrollTo(id, { offset: -90 });
      }
    });
  });
}

/* ---------- nav shadow ---------- */
function initNavState() {
  const nav = document.getElementById('nav');
  const on = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  on();
  window.addEventListener('scroll', on, { passive: true });
}

/* ---------- hero intro: word-by-word blur reveal ---------- */
function initHero() {
  const h1 = document.getElementById('heroH1');
  // wrap words, preserving the <em>
  const wrapWords = node => {
    [...node.childNodes].forEach(child => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
          else {
            const w = document.createElement('span');
            w.className = 'w';
            w.textContent = part;
            frag.appendChild(w);
          }
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1) wrapWords(child);
    });
  };
  wrapWords(h1);

  const words = h1.querySelectorAll('.w');
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  gsap.set(words, { y: 90, opacity: 0, rotate: 4, filter: 'blur(10px)' });
  tl.to(words, { y: 0, opacity: 1, rotate: 0, filter: 'blur(0px)', duration: 1.15, stagger: 0.085 }, 0.15)
    .to('.hero-inner [data-fade]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, 0.6)
    .to('[data-stage]', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 0.95)
    .to('.chip', { opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out' }, 1.5);
}

/* ---------- split-line reveals for section headings ---------- */
function initSplitLines() {
  document.querySelectorAll('.split-lines').forEach(h => {
    // split on <br> boundaries into masked lines
    const parts = h.innerHTML.split(/<br\s*\/?>/i);
    h.innerHTML = parts
      .map(p => `<span class="sl"><span>${p}</span></span>`)
      .join('');
    const inners = h.querySelectorAll('.sl > span');
    gsap.set(inners, { yPercent: 115 });
    gsap.to(inners, {
      yPercent: 0, duration: 1.05, stagger: 0.11, ease: 'power4.out',
      scrollTrigger: { trigger: h, start: 'top 85%' }
    });
  });
}

/* ---------- generic fades ---------- */
function initFades() {
  document.querySelectorAll('[data-fade]').forEach(el => {
    if (el.closest('.hero-inner')) return; // hero handles its own
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });
}

/* ---------- cards rise with stagger per section ---------- */
function initCards() {
  const groups = new Map();
  document.querySelectorAll('[data-card]').forEach(el => {
    const key = el.parentElement;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(el);
  });
  groups.forEach(els => {
    gsap.to(els, {
      opacity: 1, y: 0, duration: 0.95, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: els[0], start: 'top 87%' }
    });
  });
}

/* ---------- count-up numbers ---------- */
function initCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: target, duration: 1.6, ease: 'power2.out',
          onUpdate: () => (el.textContent = Math.round(obj.v))
        })
    });
  });
}

/* ---------- steps rail fill (scrubbed) ---------- */
function initStepsRail() {
  const fill = document.getElementById('railFill');
  if (!fill) return;
  gsap.to(fill, {
    width: '100%', ease: 'none',
    scrollTrigger: { trigger: '[data-steps]', start: 'top 75%', end: 'bottom 55%', scrub: 0.5 }
  });
}

/* ---------- compounding curve draw ---------- */
function initChart() {
  const line = document.getElementById('curveLine');
  if (!line) return;
  const len = line.getTotalLength();
  gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '[data-chart]', start: 'top 80%', once: true }
  });
  tl.to(line, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' })
    .to('#curveArea', { attr: { opacity: 1 }, duration: 0.7 }, '-=0.5')
    .to('#curveDot', { attr: { opacity: 1 }, duration: 0.4 }, '-=0.3')
    .to('#chartNote', { opacity: 1, duration: 0.5 }, '-=0.2');
}

/* ---------- capture rows cascade ---------- */
function initCaptureRows() {
  const rows = document.querySelectorAll('[data-caprow]');
  if (!rows.length) return;
  gsap.set(rows, { opacity: 0, x: -18 });
  gsap.set('.cap-memory', { opacity: 0, y: 14 });
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '.capture-mock', start: 'top 82%', once: true }
  });
  tl.to(rows, { opacity: 1, x: 0, duration: 0.55, stagger: 0.22, ease: 'power2.out' })
    .to('.cap-memory', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.1');
}

/* ---------- floating hero chips (gentle bob + scroll drift) ---------- */
function initFloatingChips() {
  document.querySelectorAll('[data-float]').forEach(chip => {
    const n = +chip.dataset.float;
    gsap.to(chip, {
      y: `+=${8 + n * 3}`, duration: 2.2 + n * 0.5,
      yoyo: true, repeat: -1, ease: 'sine.inOut', delay: n * 0.3
    });
  });
  gsap.to('.chip-a', { y: -46, scrollTrigger: { trigger: '.stage', start: 'top 80%', end: 'bottom top', scrub: 1 } });
  gsap.to('.chip-b', { y: -74, scrollTrigger: { trigger: '.stage', start: 'top 80%', end: 'bottom top', scrub: 1 } });
  gsap.to('.chip-c', { y: -30, scrollTrigger: { trigger: '.stage', start: 'top 80%', end: 'bottom top', scrub: 1 } });
}

/* ---------- subtle 3D tilt on the hero window ---------- */
function initTilt() {
  const win = document.querySelector('[data-tilt]');
  if (!win || window.matchMedia('(hover: none)').matches) return;
  const qx = gsap.quickTo(win, 'rotationX', { duration: 0.6, ease: 'power3.out' });
  const qy = gsap.quickTo(win, 'rotationY', { duration: 0.6, ease: 'power3.out' });
  const stage = win.closest('.stage');
  stage.addEventListener('mousemove', e => {
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    qx(py * -5);
    qy(px * 6);
  });
  stage.addEventListener('mouseleave', () => { qx(0); qy(0); });
}

/* ---------- typewriters (hero + bento ask card) ---------- */
function initTypers() {
  const heroText =
    'Short-lived tokens were chosen after the March session-store outage took the whole app down. Stateless JWTs removed that single point of failure — the accepted trade-off was a 15-minute revocation window. Dinesh pushed for the refresh-rotation you see today.';
  const askText =
    'Payments was extracted after the Q1 checkout stall traced to a shared connection pool. Its own service means deploy isolation and a contained PCI scope. A feature-flagged monorepo module was considered — rejected for blast-radius reasons.';

  setupTyper('#heroTyped', heroText, '#heroSrcs', 2100, true);
  scrollTyper('#askTyped', askText, '#askSrcs', '.ask-mock');
}

function setupTyper(sel, text, srcSel, delay, autostart) {
  const el = document.querySelector(sel);
  const srcs = document.querySelector(srcSel);
  if (!el) return;
  if (reduced) {
    el.textContent = text;
    if (srcs) srcs.style.opacity = 1;
    return;
  }
  if (autostart) setTimeout(() => typeInto(el, text, srcs), delay);
}

function scrollTyper(sel, text, srcSel, trigger) {
  const el = document.querySelector(sel);
  const srcs = document.querySelector(srcSel);
  if (!el) return;
  if (reduced || !window.ScrollTrigger) {
    el.textContent = text;
    if (srcs) srcs.style.opacity = 1;
    return;
  }
  let played = false;
  ScrollTrigger.create({
    trigger, start: 'top 78%',
    onEnter: () => { if (!played) { played = true; typeInto(el, text, srcs, 11); } }
  });
}

function typeInto(el, text, srcs, speed = 13) {
  let i = 0;
  const caret = document.createElement('span');
  caret.className = 'caret';
  el.textContent = '';
  el.appendChild(caret);
  (function tick() {
    if (i <= text.length) {
      caret.remove();
      el.textContent = text.slice(0, i);
      el.appendChild(caret);
      i += 1 + (Math.random() < 0.3 ? 1 : 0); // slight burstiness
      setTimeout(tick, speed + Math.random() * 20);
    } else {
      setTimeout(() => caret.remove(), 800);
      if (srcs) {
        if (window.gsap) gsap.to(srcs, { opacity: 1, duration: 0.6 });
        else srcs.style.opacity = 1;
      }
    }
  })();
}

/* ---------- waitlist (front-end only) ---------- */
function initWaitlist() {
  const form = document.getElementById('waitlist');
  const note = document.getElementById('formNote');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input');
    const email = input.value.trim();
    if (!email) return;
    input.value = '';
    note.textContent = `You're on the list — we'll reach out at ${email}.`;
    note.classList.add('ok');
    if (window.gsap && !reduced) {
      gsap.fromTo(note, { scale: 0.95, opacity: 0.3 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' });
    }
  });
}
