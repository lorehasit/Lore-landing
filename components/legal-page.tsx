import type { ReactNode } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="wrap legal-page">
        <h1>{title}</h1>
        <p className="legal-updated">Last updated {updated}</p>
        <div className="legal-disclaimer">
          This is a template, not legal advice. Have counsel review it before relying on
          it for a real business.
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
}
