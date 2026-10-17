"use client";
import { Button, Eyebrow, Logo, Paper } from "./UI";
import { navLinks } from "./Navbar";
export default function FinalCTA({
  onStart,
  onInfo,
}: {
  onStart: () => void;
  onInfo: (kind: string) => void;
}) {
  return (
    <>
      <section className="final-cta">
        <div className="final-ghost" aria-hidden="true">
          <Paper />
        </div>
        <div className="final-content" data-reveal>
          <Eyebrow light>FROM IDEAS TO IMPACT</Eyebrow>
          <h2>
            Your next big idea deserves
            <br />
            more than a blank page.
            <br />
            <em>Just start talking.</em>
          </h2>
          <Button light onClick={onStart}>
            Create your first BRD
          </Button>
          <p>Your language. Your ideas. A clearer path forward.</p>
        </div>
        <span className="final-fragment final-fragment-one" aria-hidden="true">
          “What if we could…”
        </span>
        <span className="final-fragment final-fragment-two" aria-hidden="true">
          “I have an idea…”
        </span>
      </section>
      <footer className="section footer">
        <div className="footer-main">
          <div>
            <a href="#home" aria-label="Bhasha BRD home">
              <Logo />
            </a>
            <p>From ideas to impact.</p>
          </div>
          <div className="footer-links">
            {navLinks.slice(0, 3).map(([label, href]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
            <button onClick={onStart}>Get started</button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Built for ideas in every language.</span>
          <div>
            {["Privacy", "Terms", "Contact"].map((label) => (
              <button key={label} onClick={() => onInfo(label)}>
                {label}
              </button>
            ))}
          </div>
          <span>Bhasha BRD · Product prototype</span>
        </div>
      </footer>
    </>
  );
}
