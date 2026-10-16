"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Lightbulb,
  Users,
  Search,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";
import { AnimatedSample, Eyebrow } from "./UI";
const cases = [
  {
    name: "Founders",
    icon: Lightbulb,
    title: "Give your next big idea\na place to begin.",
    copy: "Turn the idea you can’t stop thinking about into a specification your first team can act on.",
    artifact: "The next big thing",
    items: [
      "The problem worth solving",
      "A focused first release",
      "A shared definition of done",
    ],
  },
  {
    name: "Product managers",
    icon: Users,
    title: "Everyone heard.\nEvery detail captured.",
    copy: "Bring stakeholder discussions into one clear product direction, with decisions your team can trace.",
    artifact: "The product direction",
    items: [
      "Stakeholder needs",
      "Prioritized requirements",
      "Release acceptance criteria",
    ],
  },
  {
    name: "Business analysts",
    icon: Search,
    title: "Less transcribing.\nMore understanding.",
    copy: "Spend your time on the questions that matter. Give every requirement context and a clear outcome.",
    artifact: "The requirements brief",
    items: [
      "Business objectives",
      "Functional requirements",
      "Measurable outcomes",
    ],
  },
  {
    name: "Agencies & consultants",
    icon: BriefcaseBusiness,
    title: "A clearer brief.\nA better beginning.",
    copy: "Turn client conversations into a shared scope, so expectations line up before the work begins.",
    artifact: "The client brief",
    items: ["Project scope", "Client stakeholders", "Agreed deliverables"],
  },
  {
    name: "Students & builders",
    icon: GraduationCap,
    title: "A small spark.\nA real plan.",
    copy: "Take your project from a half-formed concept to an organized plan you can confidently build.",
    artifact: "The project blueprint",
    items: ["Project concept", "Core features", "A practical build plan"],
  },
];
export default function UseCases() {
  const [active, setActive] = useState(0);
  const current = cases[active];
  const Icon = current.icon;
  return (
    <section className="section use-cases" id="use-cases">
      <div className="section-heading" data-reveal>
        <div>
          <Eyebrow>BUILT FOR YOUR KIND OF IDEA</Eyebrow>
          <h2>
            From the first spark
            <br />
            to the <em>final specification.</em>
          </h2>
        </div>
      </div>
      <div className="use-tabs" aria-label="Use cases">
        {cases.map((c, i) => (
          <button
            key={c.name}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={i === active ? "active" : ""}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="use-panel" data-reveal>
        <AnimatedSample sampleKey={current.name}>
          <div className="use-copy">
            <span className="use-case-icon">
              <Icon size={24} />
            </span>
            <h3>{current.title}</h3>
            <p>{current.copy}</p>
            <a className="text-link" href="#how-it-works">
              See the idea take shape <ArrowUpRight size={16} />
            </a>
          </div>
        </AnimatedSample>
        <div className="use-art">
          <div className="use-art-orbit" />
          <div className="use-art-paper">
            <span className="mini-label">A LITTLE MORE CLARITY</span>
            <AnimatedSample sampleKey={current.artifact}>
              <h4>{current.artifact}</h4>
              {current.items.map((item, i) => (
                <p key={item}>
                  <span>0{i + 1}</span>
                  {item}
                  <Check size={15} />
                </p>
              ))}
            </AnimatedSample>
            <span className="paper-stamp">LET’S BUILD SOMETHING.</span>
          </div>
          <span className="spark-label">It starts with “what if…”</span>
        </div>
      </div>
      <div className="teams-note" id="for-teams" data-reveal>
        <Users size={24} />
        <h3>
          Different perspectives.
          <br />
          <em>One shared understanding.</em>
        </h3>
        <p>
          Give your team a clear starting point.
          <br />
          Share a professional BRD in PDF, DOCX, or Markdown
          <br />
          and keep the conversation moving.
        </p>
      </div>
    </section>
  );
}
