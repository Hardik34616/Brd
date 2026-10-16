"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, Check, Languages, RotateCcw, Sparkles } from "lucide-react";
import { DemoLabel, Eyebrow, Paper, Waveform } from "./UI";
const stages = [
  "Your idea",
  "In your language",
  "Find the structure",
  "The details matter",
  "Ready to build",
];
export default function TransformationStory() {
  const root = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [channel, setChannel] = useState("Both");
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      () => {
        root.current?.classList.add("story-is-pinned");
        const section = root.current;
        const ctx = gsap.context(() => {
          const panels = gsap.utils.toArray<HTMLElement>(".story-panel");
          gsap.set(panels.slice(1), { autoAlpha: 0, y: 60, scale: 0.95 });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=300%",
              pin: true,
              scrub: 0.8,
            },
          });
          timeline.current = tl;
          panels.forEach((panel, i) => {
            if (i === 0) return;
            tl.to(
              panels[i - 1],
              { autoAlpha: 0, y: -45, scale: 0.94, duration: 0.35 },
              i - 0.35,
            )
              .to(
                panel,
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 },
                i - 0.15,
              )
              .to(
                `.stage-dot-${i}`,
                { backgroundColor: "#103f36", color: "#faf9f3", duration: 0.2 },
                i - 0.15,
              );
          });
          // The same idea travels left, is extracted into rows, and settles into paper.
          tl.to(".story-quote", { x: -100, rotate: -5, duration: 0.7 }, 0.3)
            .from(
              ".language-transform > div:first-child",
              { x: 90, rotate: -5, duration: 0.7 },
              0.8,
            )
            .from(
              ".language-transform > div:last-child",
              { x: -90, rotate: 5, duration: 0.7 },
              0.8,
            )
            .from(
              ".requirement-stack > div",
              { x: -140, y: 24, rotate: -3, stagger: 0.12, duration: 0.55 },
              1.8,
            )
            .to(
              ".requirement-stack > div",
              { x: 100, scale: 0.9, stagger: 0.07, duration: 0.35 },
              2.6,
            )
            .from(
              ".final-panel .paper-wrap",
              { x: -130, y: 40, rotate: -12, scale: 0.75, duration: 0.8 },
              3.7,
            )
            .from(
              ".final-panel .paper-section",
              { x: -25, opacity: 0, stagger: 0.08, duration: 0.3 },
              4,
            );
          tl.to(
            ".story-progress-fill",
            { scaleX: 1, duration: 4.6, ease: "none" },
            0,
          );
          tl.to({}, { duration: 0.3 });
        }, root);
        return () => {
          timeline.current = null;
          ctx.revert();
          section?.classList.remove("story-is-pinned");
        };
      },
    );
    return () => mm.revert();
  }, []);
  return (
    <section className="transformation" id="how-it-works" ref={root}>
      <div className="story-inner">
        <div className="story-heading">
          <Eyebrow>A LITTLE THOUGHT. A WHOLE NEW POSSIBILITY.</Eyebrow>
          <h2>
            Watch an idea become <em>a blueprint.</em>
          </h2>
          <div className="story-meta">
            <DemoLabel />
            <button
              className="replay"
              onClick={() => {
                const trigger = timeline.current?.scrollTrigger;
                if (trigger)
                  window.scrollTo({ top: trigger.start, behavior: "instant" });
                else
                  document
                    .getElementById("story-first")
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              <RotateCcw size={13} /> Replay story
            </button>
          </div>
        </div>
        <div className="story-stage">
          <article className="story-panel raw-panel" id="story-first">
            <span className="mini-label">01 — YOUR IDEA</span>
            <div className="story-quote">
              <span className="quote-mark">“</span>
              <p>
                We need an app for farmers. It should tell them{" "}
                <mark>when to water crops</mark>, warn them about{" "}
                <mark>the weather</mark>, and maybe identify plant diseases.
              </p>
              <Waveform compact />
            </div>
            <span className="story-aside">No perfect words needed.</span>
          </article>
          <article className="story-panel language-panel">
            <span className="mini-label">02 — UNDERSTOOD IN YOUR LANGUAGE</span>
            <div className="language-transform">
              <div>
                <span className="pill">ಕನ್ನಡ · KANNADA</span>
                <p lang="kn">
                  ರೈತರಿಗೆ ಹವಾಮಾನ
                  <br />
                  ಮಾಹಿತಿ ಬೇಕು.
                </p>
                <Waveform compact />
              </div>
              <span className="processing-icon">
                <Languages size={29} />
              </span>
              <div>
                <span className="pill">UNDERSTOOD</span>
                <p>
                  Farmers need
                  <br />
                  weather information.
                </p>
                <small>Language processing concept · Sarvam AI</small>
              </div>
            </div>
          </article>
          <article className="story-panel extraction-panel">
            <span className="mini-label">
              03 — STRUCTURED WITH INTELLIGENCE
            </span>
            <h3>The details find their place.</h3>
            <div className="requirement-stack">
              {[
                "Farmers can monitor soil moisture.",
                "The platform provides weather alerts.",
                "Farmers can upload crop images for disease analysis.",
              ].map((t, i) => (
                <div key={t}>
                  <span>FR-00{i + 1}</span>
                  <p>{t}</p>
                  <Check size={17} />
                </div>
              ))}
            </div>
            <small>
              Suggested requirement for clarification: who manages platform
              activity?
            </small>
          </article>
          <article className="story-panel question-panel">
            <span className="mini-label">04 — THE DETAILS MATTER</span>
            <Sparkles size={26} />
            <h3>
              How should farmers
              <br />
              receive weather alerts?
            </h3>
            <div className="choice-row">
              {["Push notifications", "SMS", "Both"].map((c) => (
                <button
                  aria-pressed={channel === c}
                  className={channel === c ? "selected" : ""}
                  key={c}
                  onClick={() => setChannel(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="clarified-result" aria-live="polite">
              <Check size={16} />
              <span>
                FR-002 · Send weather alerts via{" "}
                {channel === "Both"
                  ? "push notifications and SMS"
                  : channel.toLowerCase()}
                .
              </span>
            </div>
          </article>
          <article className="story-panel final-panel">
            <div>
              <span className="mini-label">05 — READY TO BUILD</span>
              <h3>
                From a simple thought
                <br />
                to a plan your team
                <br />
                <em>can build.</em>
              </h3>
              <p>
                Objectives. Stakeholders. Requirements.
                <br />
                User stories. Testable acceptance criteria.
              </p>
              <span className="ready-badge">
                <Check size={14} /> A clearer starting point
              </span>
              <p className="formats">
                PDF <span>·</span> DOCX <span>·</span> MARKDOWN
              </p>
            </div>
            <Paper detailed />
          </article>
        </div>
        <div className="story-footer">
          <div className="story-progress">
            <span className="story-progress-fill" />
          </div>
          <div className="story-stages">
            {stages.map((s, i) => (
              <span key={s}>
                <i className={`stage-dot-${i}`}>0{i + 1}</i>
                {s}
              </span>
            ))}
          </div>
          <span className="scroll-hint">
            SCROLL TO SEE THE IDEA UNFOLD <ArrowDown size={12} />
          </span>
        </div>
      </div>
    </section>
  );
}
