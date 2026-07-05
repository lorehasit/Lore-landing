import { flags } from "@/lib/flags";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="sun" />
        <div className="haze" />
      </div>

      <div className="wrap hero-inner">
        {flags.announcementBanner && (
          <a href="#product" className="announce" data-fade="">
            <span className="announce-tag">New</span>
            Ask <code>/lore</code> — get the real answer, with sources
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </a>
        )}

        <h1 className="hero-h1" id="heroH1">
          Your engineering decisions, <em>remembered.</em>
        </h1>

        <p className="hero-lede" data-fade="">
          The why behind your architecture lives in closed PRs, dead Slack threads, and
          the heads of people who might leave. Lore captures it — and hands it back the
          instant anyone asks.
        </p>

        <div className="hero-cta" data-fade="">
          <a href="#cta" className="btn btn-orange btn-lg">
            Request early access
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a href="#how" className="btn btn-plain btn-lg">
            See how it works
          </a>
        </div>

        <div className="hero-meta" data-fade="">
          <span>2-minute setup</span>
          <i />
          <span>GitHub · VS Code · CLI</span>
          <i />
          <span>Every answer cited</span>
        </div>
      </div>

      {/* product window */}
      <div className="stage" data-stage="">
        <div className="chip chip-a" data-float="1">
          <span className="cdot" />
          PR #482 · auth-service
        </div>
        <div className="chip chip-b" data-float="2">
          <span className="cdot" />
          #backend · Mar 12 thread
        </div>
        <div className="chip chip-c" data-float="3">
          <span className="cdot" />
          RFC-07 · Token strategy
        </div>

        <div className="window" data-tilt="">
          <div className="window-top">
            <span className="dot r" />
            <span className="dot y" />
            <span className="dot g" />
            <span className="win-title">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
              </svg>{" "}
              lore · recall
            </span>
            <span className="win-live">
              <span className="live-dot" />
              memory live
            </span>
          </div>
          <div className="window-body">
            <div className="chat-q">
              <div className="chat-av">MK</div>
              <div>
                <div className="chat-name">
                  Maya K. <span>9:41 AM</span>
                </div>
                <div className="chat-text">
                  <code className="why">/lore</code> is auth built on short-lived tokens
                  instead of sessions?
                </div>
              </div>
            </div>
            <div className="chat-a" id="chatAnswer">
              <div className="chat-av av-bot">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    d="M12 4.5v15M5.6 8l12.8 8M18.4 8L5.6 16"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>
              </div>
              <div className="chat-a-main">
                <div className="chat-name">
                  Lore <span className="tag-app">APP</span>
                </div>
                <div className="chat-text typed" id="heroTyped" />
                <div className="chat-srcs" id="heroSrcs">
                  <span className="src-chip">PR #482 — “Move to JWT access tokens”</span>
                  <span className="src-chip">#incidents — session-store outage</span>
                  <span className="src-chip">RFC-07 — Token lifetime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
