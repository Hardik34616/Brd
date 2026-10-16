"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDownToLine, X } from "lucide-react";
import MotionProvider from "../animations/MotionProvider";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ScatteredIdeas from "./ScatteredIdeas";
import InputMethods from "./InputMethods";
import TransformationStory from "./TransformationStory";
import MultilingualSection from "./MultilingualSection";
import Intelligence from "./Intelligence";
import BeforeAfter from "./BeforeAfter";
import UseCases from "./UseCases";
import FinalCTA from "./FinalCTA";
import { Logo } from "./UI";
const info: Record<string, { title: string; body: string }> = {
  Privacy: {
    title: "Your ideas stay with you.",
    body: "This landing-page preview does not upload your input, record audio, or call AI services. Demo inputs stay in this page and reset when it reloads. Hosting services may process standard access logs. A full product privacy policy will be available before the application launches.",
  },
  Terms: {
    title: "A preview of what’s possible.",
    body: "This is an illustrative product experience. The examples and readiness scores demonstrate planned workflows; they are not live AI outputs or a guarantee of completeness. Review sample documents before using them. Product terms will be available at launch.",
  },
  Contact: {
    title: "Let’s keep the conversation going.",
    body: "A public contact channel has not been announced yet. In the meantime, explore the interactive story or download the sample BRD to share with your team.",
  },
};
export default function LandingPage() {
  const router = useRouter();
  const [modal, setModal] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (modal) dialog.current?.showModal();
    else dialog.current?.close();
  }, [modal]);
  const start = () => {
    // Keep this isolated so authentication can replace the destination later.
    router.push("/dashboard");
  };
  return (
    <MotionProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="scroll-progress" />
      <Navbar onStart={start} />
      <main id="main">
        <Hero onStart={start} />
        <ScatteredIdeas />
        <InputMethods />
        <TransformationStory />
        <MultilingualSection />
        <Intelligence />
        <BeforeAfter />
        <UseCases />
        <FinalCTA onStart={start} onInfo={setModal} />
      </main>
      <dialog
        ref={dialog}
        className="preview-dialog"
        onCancel={() => setModal(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModal(null);
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close dialog"
          onClick={() => setModal(null)}
        >
          <X size={22} />
        </button>
        <Logo />
        <span className="mini-label">
          {modal === "start" ? "THE NEXT CHAPTER IS COMING" : modal}
        </span>
        <h2>
          {modal === "start"
            ? "Good ideas deserve a good beginning."
            : modal
              ? info[modal]?.title
              : ""}
        </h2>
        <p>
          {modal === "start"
            ? "Bhasha BRD is in the making. For now, explore the experience and take a sample blueprint with you. No signup or recording needed."
            : modal
              ? info[modal]?.body
              : ""}
        </p>
        {(modal === "start" || modal === "Contact") && (
          <a className="button" href="/sample-brd.md" download>
            Download a sample BRD <ArrowDownToLine size={17} />
          </a>
        )}
        <button
          className="text-link"
          onClick={() => {
            setModal(null);
            document
              .getElementById("how-it-works")
              ?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              });
          }}
        >
          Explore the interactive story
        </button>
      </dialog>
    </MotionProvider>
  );
}
