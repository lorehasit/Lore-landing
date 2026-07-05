import type { CSSProperties } from "react";

function sparkHeight(h: string): CSSProperties {
  return { "--h": h } as CSSProperties;
}

export function ProductBento() {
  return (
    <section className="sec sec-tint" id="product">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow" data-fade="">
            The product
          </span>
          <h2 className="h2 split-lines">
            Stop losing the <em>why.</em>
          </h2>
          <p className="lede" data-fade="">
            Lore reads where decisions actually get made, distills the reasoning into
            durable memory, and answers anyone who asks — no new habits to adopt.
          </p>
        </div>

        <div className="bento">
          {/* big card: capture */}
          <article className="bcard bcard-wide" data-card="">
            <div className="bcard-copy">
              <h3>Reasoning, captured the moment it’s created</h3>
              <p>
                Each decision becomes a structured memory — what was decided, why, the
                trade-offs, who was involved — linked to its evidence.
              </p>
              <ul className="ticks">
                <li>Reads GitHub PRs — description + review threads</li>
                <li>Distills decisions into structured memory</li>
                <li>Links every answer to its source</li>
              </ul>
            </div>
            <div className="bcard-visual">
              <div className="capture-mock">
                <div className="cap-row" data-caprow="">
                  <span className="cap-src gh">PR</span>
                  <div className="cap-line">
                    <b>#517 merged</b> — retry queue → dead-letter
                  </div>
                  <span className="cap-st">captured</span>
                </div>
                <div className="cap-row" data-caprow="">
                  <span className="cap-src sl">#</span>
                  <div className="cap-line">
                    <b>#backend</b> — “DLQ. Backoff hid the outage.”
                  </div>
                  <span className="cap-st">captured</span>
                </div>
                <div className="cap-row" data-caprow="">
                  <span className="cap-src gh">PR</span>
                  <div className="cap-line">
                    <b>#482</b> — short-lived JWT + refresh rotation
                  </div>
                  <span className="cap-st">captured</span>
                </div>
                <div className="cap-memory">
                  <div className="cap-mem-head">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 3v18M5 8l14 8M19 8L5 16" />
                    </svg>{" "}
                    Decision memory
                  </div>
                  <div className="cap-mem-line">
                    Why we use a dead-letter queue <span>→ 3 sources</span>
                  </div>
                  <div className="cap-mem-line">
                    Why auth is stateless <span>→ 4 sources</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* stat card */}
          <article className="bcard bcard-stat" data-card="">
            <div className="stat-big">
              <span data-count="80">0</span>%
            </div>
            <p>fewer repeat “why is it like this?” questions</p>
            <div className="stat-spark" aria-hidden="true">
              {["70%", "55%", "62%", "40%", "34%", "22%", "14%"].map((h, i) => (
                <i key={i} style={sparkHeight(h)} />
              ))}
            </div>
          </article>

          {/* stat card */}
          <article className="bcard bcard-stat" data-card="">
            <div className="stat-big">
              <span data-count="10">0</span>×
            </div>
            <p>faster ramp for every new hire — they answer their own questions</p>
            <div className="stat-orbit" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </article>

          {/* big card: ask */}
          <article className="bcard bcard-wide bcard-flip" data-card="">
            <div className="bcard-copy">
              <h3>One command. The whole story.</h3>
              <p>
                Type <code className="why">/lore</code> in your editor, terminal, or on
                the PR and get the actual decision — trade-offs, constraints, and who
                fought for it. Not a keyword search: the real reasoning, sourced.
              </p>
              <ul className="ticks">
                <li>New hires ramp themselves</li>
                <li>Seniors stop being human search engines</li>
                <li>Judgement stays when people leave</li>
              </ul>
            </div>
            <div className="bcard-visual">
              <div className="ask-mock">
                <div className="ask-q">
                  <code className="why">/lore</code> is payments a separate service?
                </div>
                <div className="ask-a" id="askTyped" />
                <div className="ask-srcs" id="askSrcs">
                  <span>PR #311</span>
                  <span>#arch-review</span>
                  <span>Q1 outage retro</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
