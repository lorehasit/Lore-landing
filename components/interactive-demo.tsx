"use client";

import { useEffect, useRef } from "react";

type Demo = { q: string; a: string; src: string[] };

const DEMOS: Demo[] = [
  {
    q: "why is auth stateless?",
    a: "We moved off server-side sessions after a Redis failover logged every user out at once. Short-lived JWTs plus refresh tokens removed that single point of failure.",
    src: ["PR #482", "#incident-042"],
  },
  {
    q: "why Postgres and not Mongo?",
    a: "Our data is highly relational and we wanted real constraints and transactions. We'd been burned by schema drift on a prior Mongo project.",
    src: ["ADR-004"],
  },
  {
    q: "why not microservices?",
    a: "At our size the operational overhead outweighed the benefits. We split out only payments, whose compliance and deploy cadence differ.",
    src: ["ADR-007", "PR #311"],
  },
  {
    q: "did we build feature flags ourselves?",
    a: "Yes — boolean + percentage rollouts didn't justify per-seat pricing. The tripwire: if we ever need targeting rules, we buy instead.",
    src: ["ADR-011"],
  },
];

function esc(s: string) {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] ?? c);
}

function provHtml(src: string[]) {
  return `<div class="prov">${src.map((s) => `<span>${esc(s)}</span>`).join("")}</div>`;
}

export function InteractiveDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const edLogRef = useRef<HTMLDivElement>(null);
  const edChipsRef = useRef<HTMLDivElement>(null);
  const tmIORef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const edLog = edLogRef.current;
    const edChips = edChipsRef.current;
    const tmIO = tmIORef.current;
    const section = sectionRef.current;
    if (!edLog || !edChips || !tmIO || !section) return;

    let edTimer: ReturnType<typeof setTimeout> | undefined;
    let edType: ReturnType<typeof setInterval> | undefined;
    let tmTimer: ReturnType<typeof setTimeout> | undefined;
    let tmType: ReturnType<typeof setInterval> | undefined;
    let disposed = false;

    const chipButtons: HTMLButtonElement[] = DEMOS.map((d, i) => {
      const b = document.createElement("button");
      b.className = "demo-chip";
      b.textContent = d.q;
      b.type = "button";
      b.onclick = () => edPlay(i);
      edChips.appendChild(b);
      return b;
    });

    function edActive(i: number) {
      chipButtons.forEach((b, j) => b.classList.toggle("on", j === i));
    }

    function edPlay(i: number) {
      if (disposed) return;
      clearTimeout(edTimer);
      clearInterval(edType);
      edActive(i);
      const d = DEMOS[i];
      if (!edLog || !d) return;
      edLog.innerHTML =
        '<div class="demo-msg user"><span class="who">You</span><div class="bub"><span class="sl">/lore</span> <span class="q"></span></div></div>';
      const q = edLog.querySelector<HTMLElement>(".q");

      function answer() {
        if (!edLog) return;
        const b = document.createElement("div");
        b.className = "demo-msg bot";
        b.innerHTML = '<span class="who">Lore</span><div class="bub think">recalling…</div>';
        edLog.appendChild(b);
        setTimeout(() => {
          if (disposed) return;
          const bub = b.querySelector<HTMLElement>(".bub");
          if (!bub || !d) return;
          bub.classList.remove("think");
          bub.innerHTML = esc(d.a) + provHtml(d.src);
          edTimer = setTimeout(() => edPlay((i + 1) % DEMOS.length), 4200);
        }, 650);
      }

      if (reduce) {
        if (q) q.textContent = d.q;
        answer();
        return;
      }
      let k = 0;
      edType = setInterval(() => {
        if (!q) return;
        q.textContent = d.q.slice(0, ++k);
        if (k >= d.q.length) {
          clearInterval(edType);
          answer();
        }
      }, 30);
    }

    function tmPlay(i: number) {
      if (disposed || !tmIO) return;
      clearTimeout(tmTimer);
      clearInterval(tmType);
      const d = DEMOS[i];
      if (!d) return;
      tmIO.innerHTML =
        '<div class="line"><span class="sl">/lore</span> <span class="q"></span><span class="caret"></span></div>';
      const q = tmIO.querySelector<HTMLElement>(".q");
      const caret = tmIO.querySelector<HTMLElement>(".caret");

      function answer() {
        caret?.remove();
        if (!tmIO || !d) return;
        const a = document.createElement("div");
        a.className = "ans";
        a.innerHTML = esc(d.a) + provHtml(d.src);
        tmIO.appendChild(a);
        tmTimer = setTimeout(() => tmPlay((i + 1) % DEMOS.length), 4600);
      }

      if (reduce) {
        if (q) q.textContent = d.q;
        answer();
        return;
      }
      let k = 0;
      tmType = setInterval(() => {
        if (!q) return;
        q.textContent = d.q.slice(0, ++k);
        if (k >= d.q.length) {
          clearInterval(tmType);
          answer();
        }
      }, 34);
    }

    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            edPlay(0);
            tmPlay(1);
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(section);

    return () => {
      disposed = true;
      io.disconnect();
      clearTimeout(edTimer);
      clearInterval(edType);
      clearTimeout(tmTimer);
      clearInterval(tmType);
    };
  }, []);

  return (
    <section className="sec" id="see-it" ref={sectionRef}>
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow" data-fade="">
            See it work
          </span>
          <h2 className="h2 split-lines">
            The same memory, live in <em>both.</em>
          </h2>
          <p className="lede" data-fade="">
            Watch a question get answered in the editor and the terminal — cited to the
            PR. Click a chip to ask your own.
          </p>
        </div>

        <div className="demo-grid">
          {/* editor */}
          <div className="demo-card demo-editor">
            <div className="demo-bar">
              <span className="demo-dot r" />
              <span className="demo-dot y" />
              <span className="demo-dot g" />
              <span className="demo-title">Lore — VS Code</span>
            </div>
            <div className="demo-body">
              <div className="demo-log" ref={edLogRef} />
            </div>
            <div className="demo-chips" ref={edChipsRef} />
          </div>
          {/* terminal */}
          <div className="demo-card demo-term">
            <div className="demo-bar">
              <span className="demo-dot r" />
              <span className="demo-dot y" />
              <span className="demo-dot g" />
              <span className="demo-title">lore — terminal</span>
            </div>
            <div className="demo-body demo-termbody">
              <pre className="demo-banner">{`  ██╗      ██████╗ ██████╗ ███████╗
  ██║     ██╔═══██╗██╔══██╗██╔════╝
  ██║     ██║   ██║██████╔╝█████╗
  ██║     ██║   ██║██╔══██╗██╔══╝
  ███████╗╚██████╔╝██║  ██║███████╗
  ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝`}</pre>
              <div className="demo-term-io" ref={tmIORef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
