import type { ReactNode } from "react";

const STEPS: { n: string; title: string; body: ReactNode }[] = [
  {
    n: "01",
    title: "Connect",
    body: "Install the Lore GitHub App on your repos — and, optionally, the Scribe commit hook. Two clicks, nothing to migrate.",
  },
  {
    n: "02",
    title: "Capture",
    body: (
      <>
        Every merged pull request — its description and review discussion — and any
        commit with a <code className="why">Why:</code> line is distilled into the Canon
        automatically. Install backfills your recent history too. Nobody writes a doc.
      </>
    ),
  },
  {
    n: "03",
    title: "Recall",
    body: (
      <>
        Anyone types <code className="why">/lore</code> in the editor, the terminal, or
        asks — and gets the reasoning back in seconds, cited.
      </>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="sec" id="how">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow" data-fade="">
            How it works
          </span>
          <h2 className="h2 split-lines">
            Live in one standup,
            <br />
            valuable for <em>years.</em>
          </h2>
        </div>

        <div className="steps" data-steps="">
          <div className="step-rail" aria-hidden="true">
            <span id="railFill" />
          </div>
          {STEPS.map((step) => (
            <article className="step" data-step="" key={step.n}>
              <span className="step-n">{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>

        {/* compounding line */}
        <div className="compound" data-card="">
          <div className="compound-head">
            <h3>Memory that compounds</h3>
            <p>
              Month one is a nice demo. Month eighteen is your company’s institutional
              memory — near-impossible to rip out.
            </p>
          </div>
          <div className="compound-chart" data-chart="">
            <svg viewBox="0 0 640 220" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fc9117" stopOpacity=".25" />
                  <stop offset="100%" stopColor="#fc9117" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                id="curveArea"
                d="M20 200 C 180 196, 320 170, 430 120 S 590 30, 620 18 L 620 220 L 20 220 Z"
                fill="url(#curveFill)"
                opacity="0"
              />
              <path
                id="curveLine"
                d="M20 200 C 180 196, 320 170, 430 120 S 590 30, 620 18"
                fill="none"
                stroke="#fc9117"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <g id="curveDot" opacity="0">
                <circle cx="620" cy="18" r="6" fill="#fc9117" />
                <circle cx="620" cy="18" r="12" fill="#fc9117" opacity=".2" />
              </g>
            </svg>
            <div className="chart-x">
              <span>Month 1</span>
              <span>Month 6</span>
              <span>Month 18</span>
            </div>
            <div className="chart-note" id="chartNote">
              ← value of the memory · switching cost
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
