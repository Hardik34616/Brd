"use client";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  AudioLines,
  ChartNoAxesColumnIncreasing,
  FileText,
  Layers,
  ListChecks,
  Target,
} from "lucide-react";
export function Logo() {
  return (
    <span className="logo">
      <span className="logo-icon">
        <FileText size={24} />
        <Layers size={15} />
      </span>
      <span>
        Bhasha <span className="logo-brd">BRD</span>
      </span>
    </span>
  );
}
export function Button({
  children,
  onClick,
  light = false,
}: {
  children: ReactNode;
  onClick: () => void;
  light?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  return (
    <button
      ref={ref}
      className={`button ${light ? "button-light" : ""}`}
      onClick={onClick}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        ref.current!.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.07}px ${(e.clientY - r.top - r.height / 2) * 0.1}px`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.translate = "0 0";
      }}
    >
      {children}
      <ArrowUpRight size={17} />
    </button>
  );
}
export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "light" : ""}`}>
      <span />
      {children}
    </p>
  );
}
export function Waveform({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`waveform ${compact ? "compact" : ""}`} aria-hidden="true">
      {Array.from({ length: 37 }, (_, i) => (
        <i
          key={i}
          style={
            {
              "--bar-height": `${(10 + Math.abs(Math.sin(i * 0.72) * Math.cos(i * 0.24)) * 36).toFixed(2)}px`,
              "--delay": `${(-i * 0.13).toFixed(2)}s`,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}
const sections = [
  {
    icon: FileText,
    title: "Problem statement",
    text: "Give farmers timely, actionable crop guidance.",
  },
  {
    icon: Target,
    title: "Objectives",
    text: "Better decisions. Healthier crops. Less guesswork.",
  },
  {
    icon: ListChecks,
    title: "Requirements",
    text: "Weather alerts · Crop insights · Admin tools",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Success criteria",
    text: "Clear, measurable outcomes for every feature.",
  },
];
export function Paper({
  detailed = false,
  className = "",
}: {
  detailed?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  return (
    <div
      className={`paper-wrap ${className}`}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse" || !ref.current) return;
        const r = e.currentTarget.getBoundingClientRect();
        ref.current.style.transform = `perspective(900px) rotateX(${-(e.clientY - r.top - r.height / 2) / 70}deg) rotateY(${(e.clientX - r.left - r.width / 2) / 70}deg)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      <div className="paper-back" />
      <article ref={ref} className="paper">
        <div className="paper-top">
          <FileText size={19} />
          <span>
            BHASHA BRD
            <br />
            PROJECT / 001
          </span>
        </div>
        <h3>
          Business Requirements
          <br />
          Document
        </h3>
        <div className="paper-subtitle">FARMER CONNECT · VERSION 1.0</div>
        {sections.map(({ icon: Icon, title, text }) => (
          <div className="paper-section" key={title}>
            <Icon size={17} />
            <div>
              <h4>{title}</h4>
              {detailed ? (
                <p>{text}</p>
              ) : (
                <>
                  <span className="ink-line" />
                  <span className="ink-line short" />
                  {title === "Requirements" && (
                    <span className="ink-line medium" />
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        <div className="paper-footer">
          <span>FROM CONVERSATION TO CLARITY</span>
          <span>01</span>
        </div>
      </article>
    </div>
  );
}
export function AnimatedSample({
  children,
  sampleKey,
}: {
  children: ReactNode;
  sampleKey: string;
}) {
  return (
    <motion.div
      key={sampleKey}
      initial={{ opacity: 0.4, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}
export function DemoLabel() {
  return (
    <span className="demo-label">
      <AudioLines size={12} /> Interactive example · no live AI processing
    </span>
  );
}
