import { WaitlistForm } from "@/components/waitlist-form";

export function FinalCta() {
  return (
    <section className="final" id="cta">
      <div className="wrap">
        <div className="final-card" data-card="">
          <div className="final-glow" aria-hidden="true" />
          <span className="eyebrow eyebrow-light" data-fade="">
            Design-partner beta
          </span>
          <h2 className="final-h2 split-lines">
            A company that never forgets why it built what it built.
          </h2>
          <p className="final-lede" data-fade="">
            We’re onboarding a handful of teams by hand. Founding pricing, direct line to
            the founders, memory from week one.
          </p>
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
