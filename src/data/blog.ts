export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "agentic-workflows-openai-agents-sdk",
    title: "Designing Agentic Workflows with the OpenAI Agents SDK",
    excerpt:
      "Handoffs, guardrails, tool-calling and memory: the architecture decisions that turn a chatbot demo into a production agent.",
    date: "2026-09-14",
    readTime: "6 min read",
    tags: ["Agentic AI", "OpenAI Agents SDK", "Architecture"],
    body: [
      "Most agent tutorials stop at 'the model called a function'. Building a real agent starts one step later: deciding which decisions belong to the model and which belong to your code.",
      "With the OpenAI Agents SDK, I structure every workflow around three questions. First, what tools does the agent genuinely need — not the ten wrappers a demo would give it, but the two or three that map to real system capabilities. Second, when should the agent hand off to a specialist instead of trying to answer everything itself. Third, what must never happen — and that becomes a guardrail, not a prompt instruction.",
      "Handoffs are the underrated feature. A general assistant that can delegate to a focused 'report builder' or 'data analyst' agent produces far more reliable multi-step work than one bloated agent with twenty tools. The key is writing each specialist's instructions so narrowly that failure is obvious and debuggable.",
      "Guardrails deserve the same rigor as business logic. Checking that extracted fields exist, that a tool's inputs are within range, that an email actually contains a body — these are cheap, deterministic checks that catch most of the failure modes prompt tweaks never will.",
      "Memory is the last piece. For multi-turn conversations I keep the transcript in the app and resend it each turn, trimming to the last relevant window. Context engineering here matters more than the model choice: a well-trimmed history on a mid-tier model beats a bloated context on a frontier model, at a fraction of the cost.",
      "The result of these decisions was my production chatbot: multi-turn conversation, tool-calling, structured memory and a custom Chainlit UI — with system prompts iteratively optimized against real user inputs, not imagined ones.",
    ],
  },
  {
    slug: "prompt-engineering-in-production",
    title: "Prompt Engineering in Production: What Actually Changed My Agents",
    excerpt:
      "Forget magic words. In production, prompt quality comes from structure, examples, and measuring against real inputs.",
    date: "2026-08-02",
    readTime: "5 min read",
    tags: ["Prompt Engineering", "Context Engineering", "LLMs"],
    body: [
      "The biggest shift in my prompt engineering practice was treating prompts like code: versioned, tested against a small set of real inputs, and changed one variable at a time.",
      "Structure beats verbosity. I now write every production prompt in the same shape: role and scope, an explicit contract of what the output must contain, constraints and refusal rules, then two or three worked examples showing edge cases. The examples do more work than any adjective.",
      "Context engineering is the quieter half of the job. Deciding what the model sees — what gets trimmed from history, what gets compressed into summaries, what gets passed as structured data instead of prose — moves quality more than rewording the instruction ever will.",
      "Testing changed everything for me. I keep a small file of real user inputs that historically broke the agent, including the weird ones. Any prompt change gets replayed against them before it ships. It is the same discipline as unit tests, and it catches regressions that 'it seemed better' never will.",
      "One practical lesson across Claude, GPT-4, Gemini and Qwen: formatting instructions travel better than phrasing. If your prompt depends on a specific sentence, it is fragile. If it depends on a clear contract with examples, it ports across models — which matters when you want to swap or route models later.",
    ],
  },
  {
    slug: "shipping-streamlit-apps-people-use",
    title: "Shipping Streamlit Apps People Actually Use",
    excerpt:
      "Lessons from running a Streamlit system in daily production at a utility company — reliability, data handling, and designing for non-developers.",
    date: "2026-06-20",
    readTime: "6 min read",
    tags: ["Streamlit", "Python", "Production"],
    body: [
      "A demo Streamlit app and a production one differ in exactly one way: somebody depends on it every morning. My attendance automation system at K-Electric taught me what that gap looks like from the inside.",
      "First, the data is never clean. Biometric device exports come with duplicates, missing punches, and shift-boundary confusion. The pipeline's real job is making defensible decisions: shift-aware check-in/check-out pairing, duplicate rejection, late detection — each rule explicit, documented, and consistent day over day.",
      "Second, non-developer users judge software by its worst screen. Every error message in a production Streamlit app should say what happened and what to do next. A traceback is a developer's problem; a clear 'this file has 3 duplicate rows, they were skipped' message is a user's answer.",
      "Third, outputs are the product. The system generates multi-sheet Excel reports because that is the artifact HR actually files. Knowing the downstream consumer of your data matters more than any UI polish.",
      "Finally, expect the app to outlive your assumptions. Log the inputs, version the logic, and make the report generation idempotent. The day the device firmware changes its export format, you want a system that fails loudly and clearly instead of silently producing wrong numbers.",
      "Streamlit is often dismissed as a prototyping tool. With the right structure — clear pipeline stages, deterministic reporting, user-proof messaging — it runs real operations just fine.",
    ],
  },
];
