const CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M17 8l5 5m0-5l-5 5" />
      </svg>
    ),
    title: "Context leaves with people",
    body: "A senior engineer resigns and four years of hard-won reasoning walks out with them. There’s no export button for judgement.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M21 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
        <path d="M12 8v4l2.5 2.5" />
        <path d="M3 3l3 3M21 3l-3 3" />
      </svg>
    ),
    title: "The same 20 questions, every ramp",
    body: "Each new hire pulls three seniors off deep work to re-explain history that was already explained last quarter.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
        <path d="M8 11h6" />
      </svg>
    ),
    title: "Search finds the doc, not the decision",
    body: "Enterprise search retrieves files. The reasoning was never in a file — it was in a thread nobody can find anymore.",
  },
];

export function ProblemSection() {
  return (
    <section className="sec" id="problem">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow" data-fade="">
            The problem
          </span>
          <h2 className="h2 split-lines">
            Docs tell you <em>what.</em>
            <br />
            Nobody wrote down <em>why.</em>
          </h2>
          <p className="lede" data-fade="">
            Every team runs on decisions. The reasoning behind them is the most valuable
            knowledge a company owns — and the least protected.
          </p>
        </div>

        <div className="prob-grid">
          {CARDS.map((card) => (
            <article className="pcard" data-card="" key={card.title}>
              <div className="pcard-ic">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
