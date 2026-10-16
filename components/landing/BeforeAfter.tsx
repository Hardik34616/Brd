"use client";
import { useState } from "react";
import { ChevronsLeftRight, FileText } from "lucide-react";
import { Eyebrow } from "./UI";
export default function BeforeAfter() {
  const [split, setSplit] = useState(48);
  return (
    <section className="comparison-section">
      <div className="section">
        <div className="center-heading" data-reveal>
          <Eyebrow>SAME IDEA. A CLEARER WAY FORWARD.</Eyebrow>
          <h2>
            Less ambiguity. <em>More alignment.</em>
          </h2>
          <p>Move the handle. See what a little structure can do.</p>
        </div>
        <div className="comparison" data-reveal>
          <div className="comparison-after">
            <div className="comparison-paper">
              <span className="mini-label">AFTER · A SHARED UNDERSTANDING</span>
              <h3>
                <FileText size={25} /> Farmer Connect
              </h3>
              <dl>
                <dt>Business objective</dt>
                <dd>Help farmers make informed crop decisions.</dd>
                <dt>Stakeholders</dt>
                <dd>Farmers, agronomists, platform administrators.</dd>
                <dt>FR-002 · Weather alerts</dt>
                <dd>Send location-based severe weather notifications.</dd>
                <dt>User story</dt>
                <dd>
                  As a farmer, I want local alerts so I can protect my crops.
                </dd>
                <dt>Acceptance criteria</dt>
                <dd>
                  An opted-in farmer receives an alert for their saved location.
                </dd>
              </dl>
            </div>
          </div>
          <div
            className="comparison-before"
            style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
          >
            <div className="messy-paper">
              <span className="mini-label">BEFORE · A VERY GOOD START</span>
              <h3>Some thoughts for the app…</h3>
              <p>farmers need weather updates!!</p>
              <p className="scribble-note">who’s going to manage all this?</p>
              <p>→ crop photos? disease detection?</p>
              <p className="crossed">figure out the details later</p>
              <p className="scribble-note">SMS or push? both maybe.</p>
              <p>Need to talk to the team.</p>
            </div>
          </div>
          <div className="comparison-divider" style={{ left: `${split}%` }}>
            <span>
              <ChevronsLeftRight size={23} />
            </span>
          </div>
          <input
            className="comparison-range"
            type="range"
            min="0"
            max="100"
            value={split}
            onChange={(e) => setSplit(Number(e.target.value))}
            aria-label="Before and after comparison"
            aria-valuetext={`${split}% rough notes, ${100 - split}% structured requirements`}
          />
        </div>
        <div className="comparison-captions">
          <span>THE MESSY FIRST THOUGHT</span>
          <span>THE PLAN YOU CAN BUILD</span>
        </div>
      </div>
    </section>
  );
}
