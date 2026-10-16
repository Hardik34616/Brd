"use client";
import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  FileUp,
  MessageCircle,
  Mic,
  TextCursorInput,
} from "lucide-react";
import { AnimatedSample, DemoLabel, Eyebrow, Waveform } from "./UI";
const methods = [
  { title: "Speak your mind.", sub: "In your language.", icon: Mic },
  {
    title: "Start with a rough draft.",
    sub: "We’ll find the structure.",
    icon: TextCursorInput,
  },
  {
    title: "Bring your notes.",
    sub: "There’s a good idea in there.",
    icon: FileUp,
  },
  {
    title: "Think it through.",
    sub: "One good question at a time.",
    icon: MessageCircle,
  },
];
export default function InputMethods() {
  const [active, setActive] = useState(0);
  const [text, setText] = useState(
    "An app for farmers. Weather alerts, crop advice, and an admin dashboard.",
  );
  return (
    <section className="section inputs-section" id="inputs">
      <div className="section-heading" data-reveal>
        <div>
          <Eyebrow>FOUR WAYS. ONE CLEAR START.</Eyebrow>
          <h2>
            However your ideas come,
            <br />
            <em>we’re listening.</em>
          </h2>
        </div>
        <p>
          A voice note. A messy draft. That document
          <br />
          on your desktop. Start with what you have.
        </p>
      </div>
      <div className="input-layout" data-reveal>
        <div
          className="input-options"
          role="tablist"
          aria-label="Input methods"
          aria-orientation="vertical"
        >
          {methods.map(({ title, sub, icon: Icon }, i) => (
            <button
              className={`input-option ${i === active ? "active" : ""}`}
              key={title}
              role="tab"
              id={`input-tab-${i}`}
              aria-selected={i === active}
              aria-controls="input-preview"
              tabIndex={i === active ? 0 : -1}
              onKeyDown={(e) => {
                if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 3
                        : (active + (e.key === "ArrowDown" ? 1 : 3)) % 4;
                  setActive(next);
                  document.getElementById(`input-tab-${next}`)?.focus();
                }
              }}
              onClick={() => setActive(i)}
            >
              <span className="input-icon">
                <Icon size={21} />
              </span>
              <span>
                <strong>{title}</strong>
                <small>{sub}</small>
              </span>
              <ArrowUpRight size={19} />
            </button>
          ))}
        </div>
        <div
          className={`input-preview input-preview-${active}`}
          role="tabpanel"
          id="input-preview"
          aria-labelledby={`input-tab-${active}`}
        >
          <span className="mini-label">0{active + 1} / THE STARTING POINT</span>
          <AnimatedSample sampleKey={String(active)}>
            {active === 0 ? (
              <div className="voice-preview">
                <div className="mic-orbit">
                  <span />
                  <span />
                  <Mic size={32} />
                </div>
                <Waveform />
                <blockquote>
                  “We need a platform
                  <br />
                  for our farmers…”
                </blockquote>
                <div className="language-ticker">
                  हिन्दी · ಕನ್ನಡ · தமிழ் · తెలుగు · मराठी · English
                </div>
              </div>
            ) : active === 1 ? (
              <div className="text-preview">
                <label htmlFor="rough-idea">YOUR ROUGH IDEA</label>
                <textarea
                  id="rough-idea"
                  value={text}
                  maxLength={300}
                  onChange={(e) => setText(e.target.value)}
                />
                <ArrowDown size={19} />
                <div className="extracted">
                  <span>CAPTURED FOR YOUR BRD</span>
                  <p>{text.trim() || "Start typing to capture your idea."}</p>
                </div>
                <small>
                  Local writing preview. Extraction is illustrated in the story
                  below.
                </small>
              </div>
            ) : active === 2 ? (
              <div className="upload-preview">
                <div className="file-stack">
                  <span>TXT</span>
                  <span>DOCX</span>
                  <span>PDF</span>
                </div>
                <h3>Your notes have a head start.</h3>
                <p>
                  Meeting notes, existing briefs, and rough plans become the
                  starting point for a better document.
                </p>
                <span className="pill">PDF · DOCX · TXT</span>
                <small>Illustrative upload preview — no files are sent.</small>
              </div>
            ) : (
              <div className="chat-preview">
                <p className="chat-user">I want a learning platform.</p>
                <p className="chat-ai">Who are the main users?</p>
                <p className="chat-user">Students and teachers.</p>
                <p className="chat-ai">Should teachers create courses?</p>
                <a className="text-link" href="#clarification">
                  Try a clarification <ArrowUpRight size={15} />
                </a>
              </div>
            )}
          </AnimatedSample>
          <DemoLabel />
        </div>
      </div>
    </section>
  );
}
