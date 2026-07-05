"use client";

import { useEffect } from "react";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <>
      <Nav />
      <main className="state-page">
        <span className="state-code">Something broke</span>
        <h1>That request hit an unhandled error.</h1>
        <p>
          It&apos;s been logged. Try again, or head back to somewhere that works.
        </p>
        <div className="state-actions">
          <button type="button" className="btn btn-orange btn-lg" onClick={() => reset()}>
            Try again
          </button>
          <Link href="/" className="btn btn-plain btn-lg">
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
