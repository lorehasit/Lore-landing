const QUOTES = [
  {
    text: "New hires stop asking the same twenty questions — they ask Lore, get a sourced answer, and your seniors keep their afternoons.",
    caption: "Faster onboarding",
  },
  {
    text: "When a tech lead leaves, four years of hard-won context doesn’t walk out the door with them.",
    caption: "Knowledge that stays",
  },
  {
    text: "No more rebuilding what you already tried and abandoned — Lore remembers why you walked away the first time.",
    caption: "Less rework",
  },
  {
    text: "Every answer cites the exact PR — so the team trusts it instead of guessing “I think it was because…”.",
    caption: "Answers you can trust",
  },
];

export function Marquee() {
  return (
    <section className="marquee-sec">
      <p className="marquee-label" data-fade="">
        What changes once the memory kicks in
      </p>
      <div className="marquee" data-marquee="">
        <div className="marquee-track">
          {QUOTES.map((q) => (
            <figure className="quote" key={q.caption}>
              <blockquote>{q.text}</blockquote>
              <figcaption>{q.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
