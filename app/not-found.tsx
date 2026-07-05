import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="state-page">
        <span className="state-code">404</span>
        <h1>This page wandered off without a citation.</h1>
        <p>
          We couldn’t find what you were looking for. It might have moved, or the link
          might be out of date.
        </p>
        <div className="state-actions">
          <Link href="/" className="btn btn-orange btn-lg">
            Back to home
          </Link>
          <Link href="/docs" className="btn btn-plain btn-lg">
            Read the docs
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
