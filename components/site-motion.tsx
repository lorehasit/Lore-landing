"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Lenis smooth scroll + GSAP/ScrollTrigger choreography for the landing
 * page — ported from legacy/script.js almost line-for-line. The legacy
 * script queried the DOM directly (no framework), so this port keeps that
 * same query-based approach rather than rewriting it into idiomatic React
 * state: the markup it targets (data-fade, data-card, .split-lines, etc.)
 * is server-rendered with identical classes/ids, and this component's only
 * job — exactly like the original <script src="script.js">  — is to
 * animate it after mount. The one thing the original didn't need and this
 * port adds is teardown, via gsap.context().revert() and explicit
 * Lenis/interval/listener cleanup, since client-side route changes can
 * unmount this component (the original page never did).
 */
export function SiteMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // marquee: duplicate cards for a seamless -50% loop (independent of
    // the reduced-motion branch in the original, so we keep it that way).
    // Guarded by a marker so remounting this effect (React Strict Mode's
    // double-invoke in dev, or a client-side route back to "/") can't
    // double-clone an already-duplicated track.
    document.querySelectorAll<HTMLElement>("[data-marquee] .marquee-track").forEach((track) => {
      if (track.dataset.duplicated === "true") return;
      const clones = [...track.children].map((c) => c.cloneNode(true));
      clones.forEach((c) => track.appendChild(c));
      track.dataset.duplicated = "true";
    });

    if (reduced || !gsap) {
      document.documentElement.classList.add("no-motion");
      revealAllStatic();
      initNavState();
      const cleanupTypers = initTypers(reduced);
      return () => {
        cleanupTypers();
      };
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      initHero();
      initSplitLines();
      initFades();
      initCards();
      initCounters();
      initStepsRail();
      initChart();
      initCaptureRows();
      initFloatingChips();
    });

    const disposeTilt = initTilt();
    const disposeNav = initNavState();
    const disposeLenis = initLenis();
    const cleanupTypers = initTypers(reduced);

    return () => {
      ctx.revert();
      disposeTilt();
      disposeNav();
      disposeLenis();
      cleanupTypers();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return null;
}

/* ---------- static fallback (reduced motion / no gsap) ---------- */
function revealAllStatic() {
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    el.textContent = el.dataset.count ?? "";
  });
  const area = document.getElementById("curveArea");
  const dotG = document.getElementById("curveDot");
  const note = document.getElementById("chartNote");
  area?.setAttribute("opacity", "1");
  dotG?.setAttribute("opacity", "1");
  if (note) note.style.opacity = "1";
  document.querySelectorAll<HTMLElement>(".chat-srcs,.ask-srcs").forEach((el) => {
    el.style.opacity = "1";
  });
}

/* ---------- lenis smooth scroll ---------- */
function initLenis(): () => void {
  const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  const onScroll = () => ScrollTrigger.update();
  lenis.on("scroll", onScroll);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  const handlers: { el: HTMLAnchorElement; fn: (e: Event) => void }[] = [];
  anchors.forEach((a) => {
    const fn = (e: Event) => {
      const id = a.getAttribute("href");
      if (id && id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        lenis.scrollTo(id, { offset: -90 });
      }
    };
    a.addEventListener("click", fn);
    handlers.push({ el: a, fn });
  });

  return () => {
    handlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}

/* ---------- nav shadow ---------- */
function initNavState(): () => void {
  const nav = document.getElementById("nav");
  if (!nav) return () => {};
  const on = () => nav.classList.toggle("scrolled", window.scrollY > 30);
  on();
  window.addEventListener("scroll", on, { passive: true });
  return () => window.removeEventListener("scroll", on);
}

/* ---------- hero intro: word-by-word blur reveal ---------- */
function initHero() {
  const h1 = document.getElementById("heroH1");
  if (!h1) return;

  const wrapWords = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        (child.textContent ?? "").split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const w = document.createElement("span");
            w.className = "w";
            w.textContent = part;
            frag.appendChild(w);
          }
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1) {
        wrapWords(child);
      }
    });
  };
  wrapWords(h1);

  const words = h1.querySelectorAll(".w");
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
  gsap.set(words, { y: 90, opacity: 0, rotate: 4, filter: "blur(10px)" });
  tl.to(words, { y: 0, opacity: 1, rotate: 0, filter: "blur(0px)", duration: 1.15, stagger: 0.085 }, 0.15)
    .to(".hero-inner [data-fade]", { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" }, 0.6)
    .to("[data-stage]", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0.95)
    .to(".chip", { opacity: 1, duration: 0.7, stagger: 0.15, ease: "power2.out" }, 1.5);
}

/* ---------- split-line reveals for section headings ---------- */
function initSplitLines() {
  document.querySelectorAll<HTMLElement>(".split-lines").forEach((h) => {
    const parts = h.innerHTML.split(/<br\s*\/?>/i);
    h.innerHTML = parts.map((p) => `<span class="sl"><span>${p}</span></span>`).join("");
    const inners = h.querySelectorAll(".sl > span");
    gsap.set(inners, { yPercent: 115 });
    gsap.to(inners, {
      yPercent: 0,
      duration: 1.05,
      stagger: 0.11,
      ease: "power4.out",
      scrollTrigger: { trigger: h, start: "top 85%" },
    });
  });
}

/* ---------- generic fades ---------- */
function initFades() {
  document.querySelectorAll<HTMLElement>("[data-fade]").forEach((el) => {
    if (el.closest(".hero-inner")) return;
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });
}

/* ---------- cards rise with stagger per section ---------- */
function initCards() {
  const groups = new Map<Element, HTMLElement[]>();
  document.querySelectorAll<HTMLElement>("[data-card]").forEach((el) => {
    const key = el.parentElement;
    if (!key) return;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)?.push(el);
  });
  groups.forEach((els) => {
    if (els.length === 0) return;
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.95,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: els[0], start: "top 87%" },
    });
  });
}

/* ---------- count-up numbers ---------- */
function initCounters() {
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const target = parseFloat(el.dataset.count ?? "0");
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        }),
    });
  });
}

/* ---------- steps rail fill (scrubbed) ---------- */
function initStepsRail() {
  const fill = document.getElementById("railFill");
  if (!fill) return;
  gsap.to(fill, {
    width: "100%",
    ease: "none",
    scrollTrigger: { trigger: "[data-steps]", start: "top 75%", end: "bottom 55%", scrub: 0.5 },
  });
}

/* ---------- compounding curve draw ---------- */
function initChart() {
  const line = document.getElementById("curveLine") as SVGPathElement | null;
  if (!line) return;
  const len = line.getTotalLength();
  gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
  const tl = gsap.timeline({
    scrollTrigger: { trigger: "[data-chart]", start: "top 80%", once: true },
  });
  tl.to(line, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" })
    .to("#curveArea", { attr: { opacity: 1 }, duration: 0.7 }, "-=0.5")
    .to("#curveDot", { attr: { opacity: 1 }, duration: 0.4 }, "-=0.3")
    .to("#chartNote", { opacity: 1, duration: 0.5 }, "-=0.2");
}

/* ---------- capture rows cascade ---------- */
function initCaptureRows() {
  const rows = document.querySelectorAll("[data-caprow]");
  if (!rows.length) return;
  gsap.set(rows, { opacity: 0, x: -18 });
  gsap.set(".cap-memory", { opacity: 0, y: 14 });
  const tl = gsap.timeline({
    scrollTrigger: { trigger: ".capture-mock", start: "top 82%", once: true },
  });
  tl.to(rows, { opacity: 1, x: 0, duration: 0.55, stagger: 0.22, ease: "power2.out" }).to(
    ".cap-memory",
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    "-=0.1",
  );
}

/* ---------- floating hero chips (gentle bob + scroll drift) ---------- */
function initFloatingChips() {
  document.querySelectorAll<HTMLElement>("[data-float]").forEach((chip) => {
    const n = Number(chip.dataset.float ?? "1");
    gsap.to(chip, {
      y: `+=${8 + n * 3}`,
      duration: 2.2 + n * 0.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: n * 0.3,
    });
  });
  gsap.to(".chip-a", { y: -46, scrollTrigger: { trigger: ".stage", start: "top 80%", end: "bottom top", scrub: 1 } });
  gsap.to(".chip-b", { y: -74, scrollTrigger: { trigger: ".stage", start: "top 80%", end: "bottom top", scrub: 1 } });
  gsap.to(".chip-c", { y: -30, scrollTrigger: { trigger: ".stage", start: "top 80%", end: "bottom top", scrub: 1 } });
}

/* ---------- subtle 3D tilt on the hero window ---------- */
function initTilt(): () => void {
  const win = document.querySelector<HTMLElement>("[data-tilt]");
  if (!win || window.matchMedia("(hover: none)").matches) return () => {};
  const qx = gsap.quickTo(win, "rotationX", { duration: 0.6, ease: "power3.out" });
  const qy = gsap.quickTo(win, "rotationY", { duration: 0.6, ease: "power3.out" });
  const stage = win.closest(".stage");
  if (!stage) return () => {};

  const onMove = (e: Event) => {
    const me = e as MouseEvent;
    const r = stage.getBoundingClientRect();
    const px = (me.clientX - r.left) / r.width - 0.5;
    const py = (me.clientY - r.top) / r.height - 0.5;
    qx(py * -5);
    qy(px * 6);
  };
  const onLeave = () => {
    qx(0);
    qy(0);
  };
  stage.addEventListener("mousemove", onMove);
  stage.addEventListener("mouseleave", onLeave);
  return () => {
    stage.removeEventListener("mousemove", onMove);
    stage.removeEventListener("mouseleave", onLeave);
  };
}

/* ---------- typewriters (hero + bento ask card) ---------- */
function initTypers(reduced: boolean): () => void {
  const heroText =
    "Short-lived tokens were chosen after the March session-store outage took the whole app down. Stateless JWTs removed that single point of failure — the accepted trade-off was a 15-minute revocation window. Dinesh pushed for the refresh-rotation you see today.";
  const askText =
    "Payments was extracted after the Q1 checkout stall traced to a shared connection pool. Its own service means deploy isolation and a contained PCI scope. A feature-flagged monorepo module was considered — rejected for blast-radius reasons.";

  const disposers: (() => void)[] = [];
  disposers.push(setupTyper("#heroTyped", heroText, "#heroSrcs", 2100, true, reduced));
  disposers.push(scrollTyper("#askTyped", askText, "#askSrcs", ".ask-mock", reduced));
  return () => disposers.forEach((d) => d());
}

function setupTyper(
  sel: string,
  text: string,
  srcSel: string,
  delay: number,
  autostart: boolean,
  reduced: boolean,
): () => void {
  const el = document.querySelector<HTMLElement>(sel);
  const srcs = document.querySelector<HTMLElement>(srcSel);
  if (!el) return () => {};
  if (reduced) {
    el.textContent = text;
    if (srcs) srcs.style.opacity = "1";
    return () => {};
  }
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let disposeType: (() => void) | undefined;
  if (autostart) {
    timeoutId = setTimeout(() => {
      disposeType = typeInto(el, text, srcs);
    }, delay);
  }
  return () => {
    clearTimeout(timeoutId);
    disposeType?.();
  };
}

function scrollTyper(
  sel: string,
  text: string,
  srcSel: string,
  trigger: string,
  reduced: boolean,
): () => void {
  const el = document.querySelector<HTMLElement>(sel);
  const srcs = document.querySelector<HTMLElement>(srcSel);
  if (!el) return () => {};
  if (reduced || !ScrollTrigger) {
    el.textContent = text;
    if (srcs) srcs.style.opacity = "1";
    return () => {};
  }
  let played = false;
  let disposeType: (() => void) | undefined;
  const st = ScrollTrigger.create({
    trigger,
    start: "top 78%",
    onEnter: () => {
      if (!played) {
        played = true;
        disposeType = typeInto(el, text, srcs, 11);
      }
    },
  });
  return () => {
    st.kill();
    disposeType?.();
  };
}

function typeInto(el: HTMLElement, text: string, srcs: HTMLElement | null, speed = 13): () => void {
  let i = 0;
  let disposed = false;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const caret = document.createElement("span");
  caret.className = "caret";
  el.textContent = "";
  el.appendChild(caret);

  const tick = () => {
    if (disposed) return;
    if (i <= text.length) {
      caret.remove();
      el.textContent = text.slice(0, i);
      el.appendChild(caret);
      i += 1 + (Math.random() < 0.3 ? 1 : 0);
      timeoutId = setTimeout(tick, speed + Math.random() * 20);
    } else {
      timeoutId = setTimeout(() => caret.remove(), 800);
      if (srcs) gsap.to(srcs, { opacity: 1, duration: 0.6 });
    }
  };
  tick();

  return () => {
    disposed = true;
    clearTimeout(timeoutId);
  };
}
