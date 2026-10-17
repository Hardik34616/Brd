"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  FolderOpen,
  LayoutGrid,
  LogOut,
  MessageCircle,
  Paperclip,
  Plus,
  Search,
  Send,
  Settings2,
  Sparkles,
  Trash2,
  Upload,
  X,
  Target,
  Flag,
  Users,
  ListChecks,
  ShieldCheck,
  ChartNoAxesColumnIncreasing,
  Layers,
  UserRound,
  Pencil,
} from "lucide-react";

type Section = "Chat" | "My BRDs" | "Templates" | "Trash";
type Message = { id: number; text: string; attachment?: string };

const brdSections = [
  { title: "Problem statement", icon: Target },
  { title: "Objectives", icon: Flag },
  { title: "User personas", icon: Users },
  { title: "Functional requirements", icon: ListChecks },
  { title: "Non-functional requirements", icon: ShieldCheck },
  { title: "Stakeholders", icon: Users },
  { title: "Success criteria", icon: ChartNoAxesColumnIncreasing },
];

function subscribeToIdentity(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

const templates = [
  {
    title: "Product requirements",
    description: "Shape a product idea into a clear plan.",
    tag: "PRODUCT",
    icon: FileText,
  },
  {
    title: "Project proposal",
    description: "Set out the need, approach, and expected impact.",
    tag: "PROJECT",
    icon: FolderOpen,
  },
  {
    title: "Business case",
    description: "Make the case for a new initiative or investment.",
    tag: "BUSINESS",
    icon: LayoutGrid,
  },
  {
    title: "Feature brief",
    description: "Describe a feature, its users, and what success means.",
    tag: "FEATURE",
    icon: Sparkles,
  },
];

export default function Dashboard() {
  const [section, setSection] = useState<Section>("Chat");
  const email = useSyncExternalStore(
    subscribeToIdentity,
    () => window.localStorage.getItem("bhasha-demo-email") || "",
    () => "",
  );
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [attachment, setAttachment] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [notice, setNotice] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const composer = useRef<HTMLTextAreaElement>(null);
  const outline = useRef<HTMLDialogElement>(null);
  const [outlineExpanded, setOutlineExpanded] = useState(false);

  const name = email.split("@")[0]?.split(/[._-]/)[0] || "there";
  const displayName = email
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : "there";
  const initials = email ? name.slice(0, 2).toUpperCase() : "";
  const flash = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2800);
  };
  const newBrd = () => {
    setSection("Chat");
    setDraft("");
    setAttachment("");
    setSelectedTemplate("");
    setMessages([]);
    window.setTimeout(() => composer.current?.focus(), 0);
  };
  const submitMessage = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.trim() && !attachment) return;
    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        text: draft.trim(),
        attachment: attachment || undefined,
      },
    ]);
    setDraft("");
    setAttachment("");
    flash("Note added to this tab. AI assistance is not connected yet.");
  };
  const selectTemplate = (title: string) => {
    setSelectedTemplate(title);
    setSection("Chat");
    setMessages([]);
    setDraft("");
    setAttachment("");
    window.setTimeout(() => composer.current?.focus(), 0);
  };

  const showOutline = (index = 0) => {
    outline.current?.showModal();
    window.requestAnimationFrame(() =>
      document
        .getElementById(`brd-outline-${index}`)
        ?.scrollIntoView({ block: "nearest" }),
    );
  };

  return (
    <main className="workspace-shell">
      <header className="workspace-topbar">
        <Link href="/" className="workspace-brand" aria-label="Bhasha BRD home">
          <span className="workspace-brand-mark">
            <FileText size={26} />
            <Layers size={19} />
          </span>
          <span>
            Bhasha <b>BRD</b>
          </span>
        </Link>
        <div className="workspace-top-actions">
          <button className="workspace-new-top" onClick={newBrd}>
            <Plus size={17} /> New BRD
          </button>
          <span className="workspace-top-divider" />
          <div className="workspace-popover-wrap">
            <button
              className={`workspace-icon-button ${notificationsOpen ? "is-active" : ""}`}
              aria-label="Notifications"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
            >
              <Bell size={19} />
            </button>
            {notificationsOpen && (
              <div className="workspace-popover notification-popover">
                <strong>You’re all caught up</strong>
                <p>There are no new notifications.</p>
              </div>
            )}
          </div>
          <span className="workspace-top-divider" />
          <div className="workspace-popover-wrap">
            <button
              className="workspace-profile"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              aria-expanded={profileOpen}
            >
              <span className="workspace-avatar">
                {initials || <UserRound size={19} />}
              </span>
              <span className="workspace-profile-name">
                {email ? displayName : "Your workspace"}
              </span>
              <ChevronDown size={15} />
            </button>
            {profileOpen && (
              <div className="workspace-popover profile-popover">
                <div className="profile-popover-user">
                  <b>{email ? displayName : "Your workspace"}</b>
                  {email && <span>{email}</span>}
                </div>
                <button
                  onClick={() =>
                    flash(
                      "Profile settings will be available when accounts are connected.",
                    )
                  }
                >
                  <Settings2 size={16} /> Settings
                </button>
                <Link href="/login">
                  <LogOut size={16} /> Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div
        className={`workspace-layout ${section === "Chat" ? "workspace-layout-chat" : ""}`}
      >
        <aside className="workspace-sidebar">
          <button className="workspace-new-button" onClick={newBrd}>
            <Plus size={19} /> New BRD
          </button>
          <nav className="workspace-nav" aria-label="Workspace">
            <NavButton
              label="Chat"
              selected={section === "Chat"}
              onClick={() => setSection("Chat")}
              icon={<MessageCircle size={19} />}
            />
            <NavButton
              label="My BRDs"
              selected={section === "My BRDs"}
              onClick={() => setSection("My BRDs")}
              icon={<FileText size={19} />}
            />
            <NavButton
              label="Templates"
              selected={section === "Templates"}
              onClick={() => setSection("Templates")}
              icon={<LayoutGrid size={19} />}
            />
            <NavButton
              label="Trash"
              selected={section === "Trash"}
              onClick={() => setSection("Trash")}
              icon={<Trash2 size={19} />}
            />
          </nav>
          <div className="workspace-recent">
            <div className="workspace-recent-title">
              <span>Recent</span>
            </div>
            <div className="workspace-recent-empty">
              <FolderOpen size={23} />
              <p>
                Your ideas will find
                <br />a home here.
              </p>
            </div>
          </div>
          <div className="workspace-sidebar-bottom">
            <span className="sidebar-status-dot" /> Demo workspace
          </div>
        </aside>

        <section className="workspace-main" aria-live="polite">
          {section === "Chat" && (
            <ChatView
              displayName={displayName}
              messages={messages}
              draft={draft}
              setDraft={setDraft}
              attachment={attachment}
              setAttachment={setAttachment}
              submitMessage={submitMessage}
              selectedTemplate={selectedTemplate}
              fileInput={fileInput}
              composer={composer}
            />
          )}
          {section === "My BRDs" && (
            <EmptyCollection
              title="Your BRDs, all in one place."
              description="When you start a conversation and create a BRD, it will show up here."
              icon={<FileText size={25} />}
              action="Start a new BRD"
              onAction={newBrd}
            />
          )}
          {section === "Trash" && (
            <EmptyCollection
              title="Nothing in the trash."
              description="Deleted BRDs will stay here until you decide what to do with them."
              icon={<Trash2 size={25} />}
              action="Back to chat"
              onAction={() => setSection("Chat")}
            />
          )}
          {section === "Templates" && (
            <div className="templates-view">
              <div className="workspace-page-heading">
                <span className="workspace-eyebrow">
                  A CLEAR PLACE TO BEGIN
                </span>
                <h1>Templates</h1>
                <p>Choose a starting point for your next idea.</p>
              </div>
              <div className="template-toolbar">
                <span>{templates.length} starting points</span>
                <label className="template-search">
                  <Search size={16} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Find a template"
                    aria-label="Find a template"
                  />
                  {query && (
                    <button
                      aria-label="Clear search"
                      onClick={() => setQuery("")}
                    >
                      <X size={15} />
                    </button>
                  )}
                </label>
              </div>
              <div className="template-grid">
                {templates
                  .filter((item) =>
                    `${item.title} ${item.description} ${item.tag}`
                      .toLowerCase()
                      .includes(query.toLowerCase()),
                  )
                  .map(({ title, description, tag, icon: Icon }) => (
                    <article className="template-card" key={title}>
                      <div className="template-card-top">
                        <span className="template-icon">
                          <Icon size={20} />
                        </span>
                        <span className="template-tag">{tag}</span>
                      </div>
                      <h2>{title}</h2>
                      <p>{description}</p>
                    <button onClick={() => selectTemplate(title)}>
                        Use this template <ArrowRight size={16} />
                      </button>
                    </article>
                  ))}
              </div>
              {templates.filter((item) =>
                `${item.title} ${item.description} ${item.tag}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              ).length === 0 && (
                <div className="template-no-results">
                  No templates match “{query}”.
                </div>
              )}
              <button className="template-blank-link" onClick={newBrd}>
                <Plus size={17} /> Start with a blank BRD
              </button>
            </div>
          )}
        </section>
        {section === "Chat" && (
          <aside
            className={`brd-panel ${outlineExpanded ? "brd-panel-expanded" : ""}`}
            aria-label="BRD outline"
          >
            <button
              className="brd-mobile-toggle"
              onClick={() => setOutlineExpanded(!outlineExpanded)}
              aria-expanded={outlineExpanded}
            >
              <FileText size={19} /> Your BRD outline <ChevronDown size={18} />
            </button>
            <div className="brd-panel-content">
              <div className="brd-panel-heading">
                <h2>Your BRD</h2>
                <span
                  className="brd-empty-indicator"
                  aria-label="No BRD created"
                />
              </div>
              <p className="brd-panel-subtitle">
                From conversation to clarity.
              </p>
              <div className="brd-draft-empty">
                <span>
                  <FileText size={21} />
                </span>
                <div>
                  <h3>No BRD yet</h3>
                  <p>A fresh start for your next idea.</p>
                </div>
              </div>
              <div className="brd-outline-label">DOCUMENT OUTLINE</div>
              <div className="brd-section-list">
                {brdSections.map(({ title, icon: Icon }, index) => (
                  <button
                    className="brd-section-item"
                    key={title}
                    onClick={() => showOutline(index)}
                  >
                    <Icon size={22} />
                    <span>
                      <strong>{title}</strong>
                      <small>No content yet</small>
                    </span>
                  </button>
                ))}
              </div>
              <button
                className="brd-view-outline"
                onClick={() => showOutline()}
              >
                <FileText size={20} /> View BRD outline{" "}
                <ChevronRight size={18} />
              </button>
            </div>
          </aside>
        )}
      </div>
      <dialog
        ref={outline}
        className="brd-outline-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) outline.current?.close();
        }}
      >
        <div className="brd-dialog-heading">
          <div>
            <span className="workspace-eyebrow">A PLACE FOR EVERY DETAIL</span>
            <h2>Your BRD outline</h2>
          </div>
          <button
            className="workspace-icon-button"
            aria-label="Close BRD outline"
            onClick={() => outline.current?.close()}
          >
            <X size={21} />
          </button>
        </div>
        <p className="brd-dialog-intro">
          Your document will take shape here. There’s no BRD content yet.
        </p>
        {brdSections.map(({ title, icon: Icon }, index) => (
          <section
            className="brd-dialog-section"
            id={`brd-outline-${index}`}
            key={title}
          >
            <h3>
              <Icon size={20} />
              {title}
            </h3>
            <p>No content yet.</p>
          </section>
        ))}
      </dialog>
      {notice && (
        <div className="workspace-toast" role="status">
          <Check size={16} />
          {notice}
        </div>
      )}
    </main>
  );
}

function NavButton({
  label,
  selected,
  onClick,
  icon,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      className={`workspace-nav-item ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {selected && <ChevronRight className="workspace-nav-chevron" size={15} />}
    </button>
  );
}

function ChatView({
  displayName,
  messages,
  draft,
  setDraft,
  attachment,
  setAttachment,
  submitMessage,
  selectedTemplate,
  fileInput,
  composer,
}: {
  displayName: string;
  messages: Message[];
  draft: string;
  setDraft: (value: string) => void;
  attachment: string;
  setAttachment: (value: string) => void;
  submitMessage: (event: FormEvent) => void;
  selectedTemplate: string;
  fileInput: React.RefObject<HTMLInputElement | null>;
  composer: React.RefObject<HTMLTextAreaElement | null>;
}) {
  return (
    <div className="chat-workspace">
      <div className="chat-heading">
        <h1>{displayName === "there" ? "Hi there" : `Hi, ${displayName}`}</h1>
        <p>Let’s turn your ideas into a clear BRD.</p>
        <div className="chat-heading-orbit" aria-hidden="true">
          <span className="chat-idea-rays">
            <i />
            <i />
            <i />
          </span>
          <span>
            Same ideas.
            <br />A clearer tomorrow.
          </span>
          <div className="chat-growth-bars">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div
        className={`chat-conversation ${messages.length ? "has-messages" : ""}`}
      >
        {messages.length === 0 ? (
          <div className="chat-empty-state">
            <span className="chat-empty-icon">
              <FileText size={30} />
              <Layers size={20} />
            </span>
            <h2>
              {selectedTemplate
                ? `Start your ${selectedTemplate.toLowerCase()}.`
                : "Every clear plan starts with an idea."}
            </h2>
            <p>
              A thought, a problem, a possibility.
              <br />
              Start with what’s on your mind.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div className="chat-user-message" key={message.id}>
              {message.attachment && (
                <span className="chat-attached-file">
                  <FileText size={15} />
                  {message.attachment}
                </span>
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          ))
        )}
      </div>
      <div className="chat-bottom-area">
        {messages.length === 0 && (
          <div className="chat-quick-actions">
            <button
              onClick={() => {
                setDraft("I have a new idea I’d like to explore…");
                composer.current?.focus();
              }}
            >
              <Sparkles size={24} />
              <span>
                Start with an idea<small>Begin with a blank page</small>
              </span>
            </button>
            <button onClick={() => fileInput.current?.click()}>
              <Upload size={24} />
              <span>
                Upload your notes<small>Bring your ideas together</small>
              </span>
            </button>
            <button
              onClick={() => {
                setDraft("Help me define the problem I’m trying to solve…");
                composer.current?.focus();
              }}
            >
              <Pencil size={24} />
              <span>
                Define a problem<small>Find a clear starting point</small>
              </span>
            </button>
          </div>
        )}
        <form className="chat-composer" onSubmit={submitMessage}>
          <input
            ref={fileInput}
            className="chat-file-input"
            type="file"
            accept=".pdf,.doc,.docx,.txt,.md,.csv"
            onChange={(event) =>
              setAttachment(event.target.files?.[0]?.name || "")
            }
          />
          <button
            type="button"
            className="chat-attach-button"
            aria-label="Attach a file"
            onClick={() => fileInput.current?.click()}
          >
            <Paperclip size={19} />
          </button>
          <div className="chat-composer-content">
            {attachment && (
              <span className="chat-file-chip">
                <FileText size={14} />
                {attachment}
                <button
                  type="button"
                  aria-label="Remove attachment"
                  onClick={() => setAttachment("")}
                >
                  <X size={13} />
                </button>
              </span>
            )}
            <textarea
              ref={composer}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder="Describe your idea, or upload a file…"
              rows={1}
              aria-label="Message Bhasha BRD"
            />
          </div>
          <span className="chat-enter-hint">Enter to send</span>
          <button
            type="submit"
            className="chat-send-button"
            aria-label="Send message"
            disabled={!draft.trim() && !attachment}
          >
            <Send size={18} />
          </button>
        </form>
        <p className="chat-demo-note">
          AI assistance isn’t connected yet. Your notes stay in this tab.
        </p>
      </div>
    </div>
  );
}

function EmptyCollection({
  title,
  description,
  icon,
  action,
  onAction,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="collection-empty">
      <div className="workspace-page-heading">
        <span className="workspace-eyebrow">YOUR WORKSPACE</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="collection-empty-card">
        <span className="collection-empty-icon">{icon}</span>
        <span className="collection-empty-lines">
          <i />
          <i />
          <i />
        </span>
        <span className="collection-empty-check">
          <Check size={17} />
        </span>
      </div>
      <button className="collection-primary-button" onClick={onAction}>
        <Plus size={17} />
        {action}
      </button>
    </div>
  );
}
