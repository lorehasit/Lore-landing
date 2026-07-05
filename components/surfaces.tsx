export function Surfaces() {
  return (
    <section className="sec sec-tint" id="surfaces">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow" data-fade="">
            Ways to use it
          </span>
          <h2 className="h2 split-lines">
            Ask <em>/lore</em> wherever you work.
          </h2>
          <p className="lede" data-fade="">
            One memory, three surfaces — your editor, your terminal, and the pull
            request itself. Every answer cited.
          </p>
        </div>

        <div className="prob-grid">
          <article className="pcard" data-card="">
            <div className="pcard-ic">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="2" y="3" width="20" height="18" rx="2" />
                <path d="M3 15l6-3-6-3v6ZM12 18h9" />
              </svg>
            </div>
            <h3>VS Code extension</h3>
            <p>
              A <code className="why">/lore</code> side-panel in your editor. Or select
              code → <em>“Why is this here?”</em> → the reasoning, cited to the exact PR.
            </p>
          </article>
          <article className="pcard" data-card="">
            <div className="pcard-ic">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M6 9l3 3-3 3M13 15h5" />
              </svg>
            </div>
            <h3>Terminal app</h3>
            <p>
              Run <code className="why">lore</code> for a full-screen prompt, or{" "}
              <code className="why">lore recall &quot;…&quot;</code> in a script. One{" "}
              <code className="why">npm i -g</code> and go.
            </p>
          </article>
          <article className="pcard" data-card="">
            <div className="pcard-ic">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M9 19c-4 1.5-4-2-6-2m12 4v-3.5a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.5 11.5 0 0 0-6 0C6.9 2.7 5.9 3 5.9 3a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.5 9.4c0 4.6 2.8 5.6 5.5 6a3 3 0 0 0-.8 2.3V21" />
              </svg>
            </div>
            <h3>GitHub App</h3>
            <p>
              Install once. Every <strong>merged PR is captured automatically</strong>,
              and when a new PR opens Lore comments with{" "}
              <em>what it understood and what it’ll remember</em> — signed, verified,
              zero effort.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
