import Link from "next/link";
import { BrandMark } from "@/components/nav";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-inner">
        <div className="foot-brand">
          <a className="brand brand-ink" href="#top">
            <BrandMark size={20} />
            Lore
          </a>
          <p>Institutional memory for engineering teams.</p>
          <span className="status">
            <span className="status-dot" />
            Private beta · onboarding design partners
          </span>
        </div>
        <div className="foot-col">
          <h5>Product</h5>
          <a href="#problem">Why Lore</a>
          <a href="#surfaces">Product</a>
          <a href="#how">How it works</a>
          <Link href="/docs">Docs</Link>
        </div>
        <div className="foot-col">
          <h5>Company</h5>
          <a href="#customers">Outcomes</a>
          <Link href="/docs">Docs</Link>
          <a href="#cta">Request access</a>
        </div>
        <div className="foot-col">
          <h5>Legal</h5>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/security">Security</Link>
          <Link href="/accessibility">Accessibility</Link>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© 2026 Lore</span>
        <span className="foot-tag">
          Stop losing the <em>why.</em>
        </span>
      </div>
    </footer>
  );
}
