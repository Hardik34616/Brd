"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MessageSquare, FileText, Mic } from "lucide-react";
import { Eyebrow } from "./UI";
const fragments = [
  "An admin panel, maybe?",
  "Should there be payments?",
  "ನಮ್ಮ ರೈತರಿಗೆ ಒಂದು ಆ್ಯಪ್ ಬೇಕು…",
  "How will users register?",
  "Something for students…",
];
export default function ScatteredIdeas() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: "top 15%",
              end: "+=650",
              pin: true,
              scrub: 1,
            },
          });
          gsap.utils
            .toArray<HTMLElement>(".fragment")
            .forEach((el, i) =>
              tl.to(
                el,
                {
                  x: 0,
                  y: (i - 2) * 16,
                  rotate: 0,
                  opacity: 0.12,
                  duration: 1,
                },
                0,
              ),
            );
          tl.fromTo(
            ".organized-thought",
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 0.6 },
            0.6,
          );
        }, ref);
        return () => ctx.revert();
      },
    );
    return () => mm.revert();
  }, []);
  return (
    <section className="ideas-section section" id="idea-story" ref={ref}>
      <div className="ideas-copy" data-reveal>
        <Eyebrow>IT STARTS WITH A LITTLE MESS</Eyebrow>
        <h2>
          Great ideas don’t
          <br />
          start as <em>documents.</em>
        </h2>
        <p>
          They start as conversations. Half-formed thoughts.
          <br />
          Notes. Questions. In a language that feels like you.
        </p>
        <span className="quiet-caption">THAT’S WHERE WE COME IN.</span>
      </div>
      <div className="fragment-stage">
        {fragments.map((t, i) => (
          <div className={`fragment fragment-${i}`} key={t}>
            {i % 2 ? <Mic size={15} /> : <MessageSquare size={15} />}
            <span>{t}</span>
          </div>
        ))}
        <div className="organized-thought">
          <FileText size={30} />
          <span>
            We bring structure
            <br />
            to the way you think.
          </span>
        </div>
      </div>
    </section>
  );
}
