export type ProjectStatus = "Draft" | "In Review" | "Completed";

export type DemoProject = {
  id: string;
  title: string;
  initials: string;
  color: string;
  updated: string;
  language: string;
  score: number;
  status: ProjectStatus;
};

export type Requirement = { id: string; title: string; type: "Functional" | "Non-functional"; priority: "Must" | "Should"; status: "Clear" | "Needs review"; description: string; sourceQuote: string };
export type Gap = { id: string; severity: "High" | "Medium" | "Low"; issue: string; question: string; resolved: boolean };

export const demoBRD = {
  id: "smart-farming",
  title: "Smart Farming Platform",
  inputLanguage: "Kannada",
  status: "In Review" as ProjectStatus,
  readinessScore: 92,
  executiveSummary: "A multilingual mobile platform that helps farmers make timely decisions through localized weather alerts, crop recommendations, live market prices, and an operations dashboard for agricultural officers.",
  objectives: ["Provide timely weather alerts", "Recommend crops and treatments", "Make market prices easier to compare", "Give officers a clear management view"],
  stakeholders: ["Farmers", "Agricultural officers", "Administrators", "Market data partners"],
  constraints: ["Must work in low-connectivity rural areas", "Language support should be extensible", "Market data freshness depends on partner feeds"],
  assumptions: ["Farmers have access to an Android smartphone", "Agricultural officers maintain regional crop data", "Users opt in to location-based alerts"],
  transcript: "ನಮಗೆ ರೈತರಿಗಾಗಿ ಒಂದು mobile platform ಬೇಕು. ಅದರಲ್ಲಿ weather alerts, crop suggestions, market prices ಮತ್ತು admin dashboard ಇರಬೇಕು.",
  translation: "We need a mobile platform for farmers with weather alerts, crop suggestions, market prices, and an admin dashboard.",
  requirements: [
    { id: "REQ-001", title: "User registration", type: "Functional", priority: "Must", status: "Clear", description: "Users must be able to register securely using a mobile number or email address.", sourceQuote: "Users should be able to create an account and login." },
    { id: "REQ-002", title: "Localized weather alerts", type: "Functional", priority: "Must", status: "Clear", description: "The platform must notify farmers about relevant weather changes for their selected location.", sourceQuote: "Farmers need alerts before the weather changes." },
    { id: "REQ-003", title: "Crop recommendations", type: "Functional", priority: "Must", status: "Clear", description: "Farmers should receive crop and treatment suggestions based on season, soil, and local conditions.", sourceQuote: "It should suggest what to grow." },
    { id: "REQ-004", title: "Market prices", type: "Functional", priority: "Should", status: "Needs review", description: "Users should be able to compare current crop prices across nearby markets.", sourceQuote: "Show market prices so farmers can decide where to sell." },
    { id: "REQ-005", title: "Officer dashboard", type: "Functional", priority: "Must", status: "Clear", description: "Agricultural officers need a dashboard to manage alerts, content, and regional insights.", sourceQuote: "There should be an admin dashboard." },
    { id: "REQ-006", title: "Low-bandwidth experience", type: "Non-functional", priority: "Should", status: "Needs review", description: "Core alerts and saved recommendations should remain useful on intermittent connectivity.", sourceQuote: "Many farmers may not have a good connection." },
  ] as Requirement[],
  userStories: [{ id: "US-001", story: "As a farmer, I want to receive weather alerts, so that I can make informed decisions about irrigation.", criteria: ["Alert is generated for registered locations", "User receives a notification", "Alert includes severity and timing", "Alert is available in the selected language"] }, { id: "US-002", story: "As an agricultural officer, I want to publish localized recommendations, so that farmers receive trusted guidance.", criteria: ["Officer can draft and publish an update", "Updates are tagged by region and crop", "Farmers see the latest published version"] }],
  gaps: [{ id: "GAP-001", severity: "High", issue: "Authentication method is not fully defined.", question: "Should users sign in using email, phone number, or an organization account?", resolved: false }, { id: "GAP-002", severity: "Medium", issue: "Admin permissions are unclear.", question: "What actions should administrators and agricultural officers be allowed to perform?", resolved: false }, { id: "GAP-003", severity: "Low", issue: "Performance expectations are not specified.", question: "How many concurrent users should the platform support during severe weather?", resolved: true }],
};

export const demoProjects: DemoProject[] = [
  { id: "college-management", title: "College Management System", initials: "CM", color: "#dbeee5", updated: "2 hours ago", language: "Kannada", score: 87, status: "Draft" },
  { id: "ecommerce-platform", title: "E-commerce Platform", initials: "EP", color: "#e7eef5", updated: "Yesterday", language: "English", score: 92, status: "In Review" },
  { id: "smart-farming", title: "Smart Farming App", initials: "SF", color: "#f3eeda", updated: "2 days ago", language: "Hindi", score: 96, status: "Completed" },
  { id: "healthcare-appointments", title: "Healthcare Appointment System", initials: "HA", color: "#f4e2dc", updated: "4 days ago", language: "Tamil", score: 74, status: "Draft" },
];

export const demoTemplates = [
  { id: "agriculture", title: "Agriculture", description: "Capture crop, weather, field, and market workflows.", complexity: "Medium", language: "Kannada · Hindi" },
  { id: "edtech", title: "EdTech", description: "Structure learning journeys, roles, and outcomes.", complexity: "Medium", language: "English · Marathi" },
  { id: "healthcare", title: "Healthcare", description: "Map patient, provider, appointment, and care flows.", complexity: "High", language: "English · Tamil" },
  { id: "ecommerce", title: "E-commerce", description: "Define catalog, checkout, fulfillment, and support.", complexity: "High", language: "English · Telugu" },
  { id: "fintech", title: "Fintech", description: "Clarify secure money movement and compliance needs.", complexity: "High", language: "English" },
  { id: "government", title: "Government Services", description: "Plan citizen services, departments, and approvals.", complexity: "High", language: "Hindi · Kannada" },
  { id: "internal-tools", title: "Internal Tools", description: "Turn operational workflows into clear product scope.", complexity: "Low", language: "English" },
];

export const supportedLanguages = ["English", "हिन्दी", "ಕನ್ನಡ", "தமிழ்", "తెలుగు", "मराठी"];
