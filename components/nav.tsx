import Link from "next/link";

const BrandMark = ({ size = 22 }: { size?: number }) => (
  <span className="brand-mark">
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10.4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 4.4v15.2M5.4 7.9l13.2 8.2M18.6 7.9L5.4 16.1"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  </span>
);

export function Nav() {
  return (
    <header className="nav" id="nav">
      <div className="nav-pill">
        <a className="brand" href="#top">
          <BrandMark />
          Lore
        </a>
        <nav className="nav-links">
          <a href="#problem">Why</a>
          <a href="#surfaces">Product</a>
          <a href="#how">How it works</a>
          <Link href="/docs">Docs</Link>
          <a href="#faq">FAQ</a>
        </nav>
        <a href="#cta" className="btn btn-ink btn-sm">
          Request access
        </a>
      </div>
    </header>
  );
}

export { BrandMark };
