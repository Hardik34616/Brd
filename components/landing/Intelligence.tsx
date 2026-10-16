"use client";
import { useState } from "react";
import {
  Check,
  Circle,
  GitBranch,
  MessageSquare,
  ScanLine,
  Sparkles,
} from "lucide-react";
import { AnimatedSample, DemoLabel, Eyebrow } from "./UI";
export default function Intelligence() {
  const [answer, setAnswer] = useState("");
  const [criteria, setCriteria] = useState(false);
  const score = 50 + (answer ? 25 : 0) + (criteria ? 25 : 0);
  return (
    <section className="section intelligence" id="features">
      <div className="section-heading" data-reveal>
        <div>
          <Eyebrow>A THOUGHTFUL PARTNER</Eyebrow>
          <h2>
            Not just answers.
            <br />
            <em>The right questions.</em>
          </h2>
        </div>
        <p>
          Good requirements don’t leave room for guesswork.
          <br />
          Find what’s missing. Make every detail count.
        </p>
      </div>
      <div className="clarification-layout" id="clarification" data-reveal>
        <div className="clarification-card">
          <div className="card-label">
            <Sparkles size={15} /> YOUR REQUIREMENTS PARTNER{" "}
            <span>EXAMPLE</span>
          </div>
          <p className="raw-requirement">
            “Users should receive <mark>notifications.</mark>”
          </p>
          <div className="ambiguity">
            <span /> A little vague. Let’s make it specific.
          </div>
          <h3>Which notifications matter most?</h3>
          <div className="choice-row">
            {["Order updates", "Security alerts", "All important events"].map(
              (a) => (
                <button
                  key={a}
                  aria-pressed={a === answer}
                  className={a === answer ? "selected" : ""}
                  onClick={() => setAnswer(a)}
                >
                  {a}
                </button>
              ),
            )}
          </div>
          <div className="requirement-result" aria-live="polite">
            <span className="mini-label">
              FR-005 ·{" "}
              {answer ? "CLARIFIED REQUIREMENT" : "WAITING FOR YOUR INPUT"}
            </span>
            <AnimatedSample sampleKey={answer}>
              <p>
                {answer
                  ? `Notify users about ${answer.toLowerCase()} through their preferred notification channel.`
                  : "Choose an answer to turn a vague request into a clear requirement."}
              </p>
            </AnimatedSample>
            {answer && (
              <span className="ready-badge">
                <Check size={13} /> Clarified
              </span>
            )}
          </div>
          <DemoLabel />
        </div>
        <div className="readiness-card">
          <span className="mini-label">A CLEARER PICTURE, STEP BY STEP</span>
          <div className="score-ring">
            <svg viewBox="0 0 160 160" aria-hidden="true">
              <circle cx="80" cy="80" r="67" />
              <circle
                cx="80"
                cy="80"
                r="67"
                style={{ strokeDashoffset: 421 * (1 - score / 100) }}
              />
            </svg>
            <div aria-live="polite">
              <strong>
                {score}
                <span>%</span>
              </strong>
              <small>BRD readiness</small>
            </div>
          </div>
          <div className="readiness-checks">
            {[
              ["Objectives defined", true],
              ["Requirements clarified", !!answer],
              ["Acceptance criteria specified", criteria],
              ["Open questions resolved", !!answer && criteria],
            ].map(([label, done]) => (
              <div key={String(label)} className={done ? "done" : ""}>
                {done ? <Check size={16} /> : <Circle size={14} />}
                <span>{label}</span>
              </div>
            ))}
          </div>
          <button className="text-link" onClick={() => setCriteria(!criteria)}>
            {criteria ? "Remove example criteria" : "Add acceptance criteria"}{" "}
            <span>{criteria ? "−" : "+"}</span>
          </button>
          {criteria && (
            <p className="criteria-copy">
              Example: an opted-in user receives one notification within 60
              seconds of an event.
            </p>
          )}
          <small className="score-caption">
            Illustrative score: 50% base + 25% per completed step.
          </small>
        </div>
      </div>
      <div className="feature-notes" data-reveal>
        <div>
          <ScanLine size={23} />
          <h3>Find the signal.</h3>
          <p>
            Extract objectives, stakeholders, and requirements from the way
            people actually talk.
          </p>
        </div>
        <div>
          <MessageSquare size={23} />
          <h3>Close the gaps.</h3>
          <p>
            Surface ambiguity with guided interviews before it becomes a
            development question.
          </p>
        </div>
        <div>
          <GitBranch size={23} />
          <h3>Keep getting clearer.</h3>
          <p>
            Refine user stories and acceptance criteria as your idea evolves.
          </p>
        </div>
      </div>
    </section>
  );
}
