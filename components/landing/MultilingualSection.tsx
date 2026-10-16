"use client";
import { useState } from "react";
import { ArrowDown, Check, FileText } from "lucide-react";
import { AnimatedSample, DemoLabel, Eyebrow, Waveform } from "./UI";
const languages = [
  {
    name: "Hindi",
    label: "हिन्दी",
    code: "hi",
    sample: "किसानों को मौसम की जानकारी चाहिए।",
  },
  {
    name: "Kannada",
    label: "ಕನ್ನಡ",
    code: "kn",
    sample: "ರೈತರಿಗೆ ಹವಾಮಾನ ಮಾಹಿತಿ ಬೇಕು.",
  },
  {
    name: "Tamil",
    label: "தமிழ்",
    code: "ta",
    sample: "விவசாயிகளுக்கு வானிலை தகவல் தேவை.",
  },
  {
    name: "Telugu",
    label: "తెలుగు",
    code: "te",
    sample: "రైతులకు వాతావరణ సమాచారం కావాలి.",
  },
  {
    name: "Marathi",
    label: "मराठी",
    code: "mr",
    sample: "शेतकऱ्यांना हवामानाची माहिती हवी आहे.",
  },
  {
    name: "English",
    label: "English",
    code: "en",
    sample: "Farmers need weather information.",
  },
];
export default function MultilingualSection() {
  const [active, setActive] = useState(1);
  return (
    <section className="language-section" id="languages">
      <div className="section language-grid">
        <div data-reveal>
          <Eyebrow light>THINK IN YOUR OWN WORDS</Eyebrow>
          <h2>
            Your best ideas
            <br />
            shouldn’t need
            <br />
            <em>translation first.</em>
          </h2>
          <p>
            Explain what you want in the language that comes naturally. Get
            requirements your whole team can understand.
          </p>
          <div className="language-buttons" aria-label="Example language">
            {languages.map((l, i) => (
              <button
                key={l.name}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
                className={active === i ? "active" : ""}
              >
                <span lang={l.code}>{l.label}</span>
                <small>{l.name}</small>
              </button>
            ))}
          </div>
          <span className="language-credit">
            Indian-language-first. Designed with Sarvam AI in mind.
          </span>
        </div>
        <div className="language-visual" data-reveal>
          <svg viewBox="0 0 500 520" aria-hidden="true">
            <ellipse
              cx="250"
              cy="260"
              rx="220"
              ry="155"
              transform="rotate(-30 250 260)"
            />
            <ellipse
              cx="250"
              cy="260"
              rx="180"
              ry="240"
              transform="rotate(30 250 260)"
            />
            <circle cx="60" cy="170" r="5" />
            <circle cx="428" cy="376" r="5" />
          </svg>
          <span className="orbit-glyph glyph-1" aria-hidden="true">
            अ
          </span>
          <span className="orbit-glyph glyph-2" aria-hidden="true">
            ಕ
          </span>
          <span className="orbit-glyph glyph-3" aria-hidden="true">
            తె
          </span>
          <div className="language-note">
            <span className="mini-label">
              YOUR WORDS · {languages[active].name.toUpperCase()}
            </span>
            <AnimatedSample sampleKey={languages[active].code}>
              <p lang={languages[active].code}>{languages[active].sample}</p>
            </AnimatedSample>
            <Waveform compact />
          </div>
          <ArrowDown className="language-arrow" size={22} />
          <div className="language-output">
            <FileText size={20} />
            <span>
              <small>FUNCTIONAL REQUIREMENT · FR-002</small>
              <strong>Provide local weather information to farmers.</strong>
            </span>
            <Check size={15} />
          </div>
          <DemoLabel />
        </div>
      </div>
    </section>
  );
}
