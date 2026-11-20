export type ProjectCategory = "AI & Agents" | "Web" | "Mobile" | "Data & Automation";
export type ProjectStatus = "Live" | "In development" | "Prototype" | "Delivered" | "Local only";

export interface Project {
  slug: string;
  emoji: string;
  title: string;
  summary: string;
  tags: string[];
  category: ProjectCategory;
  /** Display month: verified GitHub activity where available, otherwise the supplied project month. */
  date: string;
  dateSource?: "github" | "portfolio";
  /** Exact public repository/path activity, checked on 2026-11-16. */
  updatedAt?: string;
  status: ProjectStatus;
  /** Public demo URL. Stored previews are tracked separately in public/projects/manifest.json. */
  demo?: string;
  repo?: string;
  /** Short note shown when there is no public demo/repo. */
  note?: string;
}

// Project narratives without public repositories come from the supplied portfolio archive.
export const PROJECTS_REVIEWED_ON = "2026-11-16";

const projects: Project[] = [
  {
    slug: "mah-e-noor-ledger",
    emoji: "🏢",
    title: "Mah-e-Noor Apartments — Maintenance Ledger",
    summary:
      "Web app that replaces a month-by-month Excel ledger for an apartment society: income, expenses, flat dues, receipts and PDF monthly reports. Treasurer-only editing with a public read-only view for residents.",
    tags: ["Web App", "Role-Based Access", "PDF Reports", "Data Migration"],
    category: "Web",
    date: "2026-10",
    dateSource: "portfolio",
    status: "In development",
    note: "Private client build",
  },
  {
    slug: "fitness-emporium",
    emoji: "💪",
    title: "Fitness Emporium — Gym Website",
    summary:
      "Conversion-focused marketing website for a Gulshan-e-Iqbal gym in Karachi — responsive, media-rich and built around calls-to-action for memberships and enquiries.",
    tags: ["Next.js", "Responsive UI", "Freelance", "Vercel"],
    category: "Web",
    date: "2026-09",
    dateSource: "portfolio",
    status: "Live",
    demo: "https://fitness-emporium-app.vercel.app/",
  },
  {
    slug: "aura-events",
    emoji: "🎉",
    title: "Aura Events — Event Management Platform",
    summary:
      "Platform for a Karachi event planning & management company with separate client and admin portals, both behind registration and login.",
    tags: ["Web App", "Auth", "Admin Panel", "Vercel"],
    category: "Web",
    date: "2026-09",
    dateSource: "portfolio",
    status: "Live",
    demo: "https://aura-events-seven.vercel.app/",
  },
  {
    slug: "ai-seerathon-bot",
    emoji: "🕌",
    title: "AI Seerathon — Shamail Q&A Bot",
    summary:
      "Hackathon prototype: a web chat bot that answers only from a fixed Shamail + course corpus, always cites its source, falls back safely for out-of-corpus questions and redirects ruling-type questions to a scholar.",
    tags: ["Gemini", "RAG-style Grounding", "Guardrails", "Hackathon"],
    category: "AI & Agents",
    date: "2026-09",
    dateSource: "portfolio",
    status: "Prototype",
    note: "Hackathon entry",
  },
  {
    slug: "digital-fte",
    emoji: "🤖",
    title: "Digital FTE — Personal AI Employee",
    summary:
      "Bronze-tier hackathon implementation using a Python file watcher, an Obsidian task vault and Claude Code. Tracks a local task lifecycle from inbox to completed work.",
    tags: ["Python", "Claude Code", "Obsidian", "Automation"],
    category: "AI & Agents",
    date: "2026-02",
    dateSource: "github",
    updatedAt: "2026-02-22T11:47:17Z",
    status: "Local only",
    repo: "https://github.com/hafizsiddiqui1211/Personal-AI-Employee-Hackathon-0-Bronze-Tier",
    note: "Local-first hackathon project",
  },
  {
    slug: "x-factor-gym",
    emoji: "🏋️",
    title: "The X-Factor Gym — Marketing Website",
    summary:
      "Dark, high-contrast site for a ladies & gents gym in Karachi Lines, highlighting trainers and separate timings — WhatsApp and click-to-call wired, LocalBusiness schema, fully responsive.",
    tags: ["HTML/CSS/JS", "SEO", "JSON-LD", "Freelance"],
    category: "Web",
    date: "2026-07",
    dateSource: "portfolio",
    status: "Delivered",
    note: "Client build — v1 delivered",
  },
  {
    slug: "ke-attendance-automation",
    emoji: "🏢",
    title: "KE Attendance Automation System",
    summary:
      "In production at K-Electric HR — replaced a fully manual biometric review for 45+ employees. Shift-aware CI/CO pairing, ZKTeco data parsing, duplicate rejection, late detection and automated multi-sheet Excel reporting.",
    tags: ["Python", "Streamlit", "Automation", "Enterprise"],
    category: "Data & Automation",
    date: "2026-04",
    dateSource: "portfolio",
    status: "Live",
    demo: "https://rrctisguard.streamlit.app/",
    note: "Source code is private",
  },
  {
    slug: "nikkahnow",
    emoji: "💍",
    title: "NikkahNow — Venue Booking Platform",
    summary:
      "Commercial-scale Flutter app for marriage-venue booking with Customer, Owner and Admin roles — Firebase multi-environment backend (dev/prod/demo) and a complete design system.",
    tags: ["Flutter", "Firebase", "Multi-Role", "Product Design"],
    category: "Mobile",
    date: "2026-06",
    dateSource: "portfolio",
    status: "In development",
    note: "Source code is private",
  },
  {
    slug: "physical-ai-textbook",
    emoji: "📚",
    title: "Physical AI & Humanoid Robotics Textbook",
    summary:
      "Full developer documentation platform built and deployed with Docusaurus — structured technical writing, custom theming and complete information architecture.",
    tags: ["Docusaurus", "React", "Technical Writing", "GitHub Pages"],
    category: "Web",
    date: "2025-12",
    dateSource: "github",
    updatedAt: "2025-12-21T18:36:11Z",
    status: "Live",
    demo: "https://hafizsiddiqui1211.github.io/physical-ai-humanoid-robotics-textbook/",
    repo: "https://github.com/hafizsiddiqui1211/physical-ai-humanoid-robotics-textbook",
  },
  {
    slug: "windows-task-manager",
    emoji: "🖥️",
    title: "Windows Task Manager — Real-Time Web App",
    summary:
      "Live system-monitoring dashboard streaming Windows process and resource data into the browser in real time — Python backend-to-frontend connectivity.",
    tags: ["Python", "Streamlit", "Real-Time", "System Monitoring"],
    category: "Data & Automation",
    date: "2025-11",
    dateSource: "github",
    updatedAt: "2025-11-23T11:23:38Z",
    status: "Local only",
    repo: "https://github.com/hafizsiddiqui1211/Windows-Task-Manager-Clone-Streamlit-",
    note: "Runs locally only — educational project",
  },
  {
    slug: "agentic-ai-chatbot",
    emoji: "🤖",
    title: "Agentic AI Chatbot — OpenAI Agents SDK + Chainlit",
    summary:
      "Chainlit greeting assistant built with OpenAI Agents SDK and Gemini, with session history, GitHub OAuth and a demonstration weather tool.",
    tags: ["OpenAI Agents SDK", "Chainlit", "Tool Calling", "Prompt Engineering"],
    category: "AI & Agents",
    date: "2025-07",
    dateSource: "github",
    updatedAt: "2025-07-25T03:14:57Z",
    status: "Local only",
    repo: "https://github.com/hafizsiddiqui1211/Ramadan-Coding-Nights-2025/tree/main/Advance-Agent",
    note: "Local demo · weather responses are illustrative",
  },
  {
    slug: "flight-management-system",
    emoji: "✈️",
    title: "Flight Management System",
    summary:
      "Streamlit flight management app with SQLite storage, admin and staff roles, flight search, CSV exports and a basic rule-based assistant.",
    tags: ["Streamlit", "Python", "SQLite", "Pandas"],
    category: "Data & Automation",
    date: "2025-11",
    dateSource: "github",
    updatedAt: "2025-11-04T07:44:47Z",
    status: "Live",
    demo: "https://flightmanagementsystembyhafizsiddiqui.streamlit.app/",
    repo: "https://github.com/hafizsiddiqui1211/Flight-Management-System",
  },
  {
    slug: "secure-data-encryption",
    emoji: "🛡️",
    title: "Secure Data Encryption System",
    summary:
      "Register, log in, store sensitive data encrypted and retrieve it securely — PBKDF2-HMAC key derivation, no external database.",
    tags: ["Streamlit", "Cryptography", "PBKDF2 HMAC", "Security"],
    category: "Data & Automation",
    date: "2025-04",
    dateSource: "github",
    updatedAt: "2025-04-24T21:34:58Z",
    status: "Live",
    demo: "https://securedataencryptionsystembyhafizsiddiqui.streamlit.app/",
    repo: "https://github.com/hafizsiddiqui1211/Sir-Zia-Projects/tree/main/Secure-Data-Encryption-System",
  },
  {
    slug: "data-sweeper",
    emoji: "📀",
    title: "Data Sweeper",
    summary: "Streamlit app to convert, clean and visualise CSV and Excel files — a practical data-processing utility.",
    tags: ["Streamlit", "Pandas", "Data Cleaning", "Visualization"],
    category: "Data & Automation",
    date: "2025-03",
    dateSource: "github",
    updatedAt: "2025-03-16T08:01:33Z",
    status: "Live",
    demo: "https://datasweeperbyhafizsiddiqui.streamlit.app/",
    repo: "https://github.com/hafizsiddiqui1211/Sir-Zia-Projects/tree/main/Growth%20Mindset%20Challenge",
  },
  {
    slug: "ai-proposal-triage",
    emoji: "🧭",
    title: "AI Proposal Triage",
    summary: "A proposal-review design combining structured extraction prompts, deterministic Python scoring and human review checkpoints. Includes reproducible ranking output and an optional extraction prototype.",
    tags: ["Python", "Prompt Engineering", "Decision Workflows", "Human Review"],
    category: "AI & Agents",
    repo: "https://github.com/hafizsiddiqui1211/matacs-th-2026-02",
    status: "Prototype",
    note: "Design exercise · live API extraction not yet tested",
    date: "2026-10",
    dateSource: "github",
    updatedAt: "2026-10-28T02:45:32Z",
  },
  {
    slug: "animora",
    emoji: "✦",
    title: "Animora — Immersive Storytelling Website",
    summary: "A React experience with layered depth, canvas particles, Motion animations and responsive pages for stories, worlds and studio information. Includes reduced-motion support.",
    tags: ["React", "Motion", "Vite", "Canvas"],
    category: "Web",
    repo: "https://github.com/hafizsiddiqui1211/Animora",
    status: "Live",
    demo: "https://animora-eta.vercel.app/",
    date: "2026-09",
    dateSource: "github",
    updatedAt: "2026-09-20T02:16:42Z",
  },
  {
    slug: "aptura-python-systems",
    emoji: "🗂️",
    title: "Aptura — Python Management Systems",
    summary: "Internship work covering student records, library management and payroll. The student-record CLI includes JSON persistence, search, validation and a custom merge-sort implementation.",
    tags: ["Python", "JSON", "Algorithms", "Internship"],
    category: "Data & Automation",
    repo: "https://github.com/hafizsiddiqui1211/Aptura-Python-Development-Internship",
    status: "Delivered",
    note: "Source code and technical reports",
    date: "2026-07",
    dateSource: "github",
    updatedAt: "2026-07-26T20:55:38Z",
  },
  {
    slug: "personal-library-manager",
    emoji: "📖",
    title: "Personal Library Manager",
    summary: "A software re-engineering project that turns a monolithic library CLI into layered MVC. Adds validation, duplicate detection, search, reading statistics and automatic JSON backups.",
    tags: ["Python", "MVC", "Refactoring", "JSON"],
    category: "Data & Automation",
    repo: "https://github.com/hafizsiddiqui1211/personal_library_manager",
    status: "Local only",
    note: "Command-line application",
    date: "2026-05",
    dateSource: "github",
    updatedAt: "2026-05-20T19:50:40Z",
  },
  {
    slug: "full-stack-todo",
    emoji: "✓",
    title: "Todo — Full-Stack Task Platform",
    summary: "A spec-driven multi-user task app with a Next.js frontend, FastAPI backend and Neon PostgreSQL. Includes authentication, personal task lists and optimistic UI updates.",
    tags: ["Next.js", "FastAPI", "Neon PostgreSQL", "Better Auth"],
    category: "Web",
    repo: "https://github.com/hafizsiddiqui1211/Hackathon-2-Phase-2",
    status: "Prototype",
    note: "Full-stack hackathon project",
    date: "2026-02",
    dateSource: "github",
    updatedAt: "2026-02-08T19:07:15Z",
  },
  {
    slug: "portalyze",
    emoji: "🔎",
    title: "PORTALYZE — Resume & Profile Analyzer",
    summary: "A Streamlit prototype for resume parsing, ATS-style checks, profile insights and role recommendations. Combines structured models with heuristic feedback and experimental AI integration.",
    tags: ["Python", "Streamlit", "Pydantic", "Document Analysis"],
    category: "AI & Agents",
    repo: "https://github.com/hafizsiddiqui1211/PORTALYZE",
    status: "Prototype",
    note: "Some analysis uses simulated or heuristic responses",
    date: "2026-01",
    dateSource: "github",
    updatedAt: "2026-01-10T04:42:06Z",
  },
];

/** Latest verified activity first; private projects retain their supplied month. */
export const sortedProjects: Project[] = [...projects].sort((a, b) =>
  (b.updatedAt ?? `${b.date}-01`).localeCompare(a.updatedAt ?? `${a.date}-01`)
);
export const categories: ("All" | ProjectCategory)[] = ["All", "AI & Agents", "Web", "Mobile", "Data & Automation"];

export const formatMonth = (ym: string) =>
  new Date(`${ym.slice(0, 7)}-01T00:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
