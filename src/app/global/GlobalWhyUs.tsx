"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const insights = [
  {
    category: "AI",
    title: "How RAG Pipelines Are Transforming Enterprise Knowledge Management",
    date: "July 2026",
    readTime: "6 min read",
    accent: "#E5231B",
    summary: "Retrieval-Augmented Generation is no longer a research curiosity — it's the backbone of the next generation of enterprise software.",
    body: [
      {
        heading: "What is RAG and why does it matter?",
        text: "Traditional LLMs are trained on static snapshots of the internet. The moment you need them to answer a question about your proprietary knowledge base — your internal wiki, your customer contracts, your past project documentation — they fail. RAG (Retrieval-Augmented Generation) solves this by combining a vector database of your own data with an LLM that retrieves relevant context before generating an answer. The result: a model that reasons over your data, not just the internet's.",
      },
      {
        heading: "The three components of a production RAG system",
        text: "A solid RAG pipeline has three parts: (1) Ingestion — your documents are chunked, embedded using a model like text-embedding-3-large, and stored in a vector store such as Pinecone, Weaviate, or Supabase pgvector. (2) Retrieval — at query time, the user's question is embedded and semantically matched against your vector store, returning the top-k relevant chunks. (3) Generation — the retrieved chunks are injected as context into a system prompt, and the LLM (GPT-4o, Claude 3.5, Gemini 1.5 Pro) generates a grounded, cited answer.",
      },
      {
        heading: "Where enterprises are deploying RAG today",
        text: "We're seeing three dominant use cases in 2026: Internal knowledge assistants (replace your slow, outdated intranet search with a conversational AI trained on your SOPs), Customer-facing support bots (ground every response in product documentation so the AI never hallucinates a feature), and Legal & compliance review (allow legal teams to query across thousands of contracts in seconds). Each of these can reduce operational overhead by 30–60% when implemented correctly.",
      },
      {
        heading: "The pitfalls nobody talks about",
        text: "RAG implementations fail when teams skip evaluation. Chunk size, overlap, embedding model choice, and retrieval strategy (BM25 vs dense vs hybrid) all dramatically affect answer quality. We run systematic evals using frameworks like RAGAS to benchmark precision, recall, and faithfulness before any RAG system goes to production. If you're building RAG without evals, you're flying blind.",
      },
    ],
  },
  {
    category: "Engineering",
    title: "Building for Scale: Architecture Patterns for Global SaaS Products",
    date: "June 2026",
    readTime: "8 min read",
    accent: "#6366f1",
    summary: "The decisions you make in week one can either accelerate your path to $10M ARR or force a painful, expensive rewrite at 10,000 users.",
    body: [
      {
        heading: "Start with the right data model",
        text: "Multi-tenancy is the single most important architectural decision in a SaaS product. Row-level tenancy (storing all customers in shared tables, filtered by tenant_id) is fast to build but becomes a nightmare at scale — a single slow query from one customer can degrade performance for everyone. Schema-per-tenant or database-per-tenant provides true isolation but increases operational overhead. The right answer depends on your compliance requirements, customer size, and growth trajectory. For most early-stage products, row-level tenancy with aggressive indexing and query budgets is fine until 500+ enterprise customers.",
      },
      {
        heading: "Event-driven architecture from day one",
        text: "Synchronous, monolithic request-response cycles work fine for CRUD applications. But the moment you need to send a welcome email, provision infrastructure, update analytics, and notify a Slack channel when a user signs up — you have a distributed systems problem. Queues (SQS, RabbitMQ, Kafka) decouple your core application from side effects, making each operation independently retryable and observable. We architect all SaaS products with an event bus from day one, even if the initial event consumers are trivial.",
      },
      {
        heading: "The observability stack that actually works",
        text: "Logs, metrics, and traces. You need all three. OpenTelemetry has become the standard instrumentation layer — instrument once, export anywhere. For the data plane: Grafana + Loki for logs, Prometheus for metrics, Tempo or Jaeger for distributed traces. For error tracking: Sentry. For uptime: Better Uptime or Checkly. This stack adds ~$200/month at startup scale but saves weeks of debugging when things go wrong in production — and they will.",
      },
      {
        heading: "Database choices that don't age poorly",
        text: "PostgreSQL remains our default for transactional workloads. It's battle-tested, supports JSONB for flexible schemas, has excellent geospatial support via PostGIS, and Supabase makes it trivially deployable with a great developer experience. For search, OpenSearch or Typesense. For time-series, TimescaleDB (a Postgres extension). For global replication with low write latency, PlanetScale or CockroachDB. Choose boring technology — your database should never be the most interesting thing in your architecture.",
      },
    ],
  },
  {
    category: "Design",
    title: "The ROI of Design Systems: Why Investing Upfront Pays Back 10x",
    date: "June 2026",
    readTime: "5 min read",
    accent: "#10b981",
    summary: "Most engineering teams treat design systems as a nice-to-have. The teams that win treat them as infrastructure.",
    body: [
      {
        heading: "What a design system actually is",
        text: "A design system is not a Figma component library. It's not a style guide PDF. A true design system is a living, versioned, documented contract between design and engineering that defines how your product looks, behaves, and communicates — and it's reflected symmetrically in both Figma and code. Tokens for color, spacing, typography, and elevation. Accessible, reusable components with documented variants and states. Usage guidelines that enforce consistency without stifling creativity.",
      },
      {
        heading: "The real cost of not having one",
        text: "Without a design system, every new feature is a negotiation. Designers redraw components from scratch. Engineers make micro-decisions about padding, border radius, and color that diverge imperceptibly over time. Six months later, your product looks like it was built by five different companies. Fixing this requires a design audit, a migration sprint, and weeks of cross-functional work. We've seen startups spend $80,000+ retrofitting consistency that a $15,000 design system would have prevented.",
      },
      {
        heading: "What it looks like to do it right",
        text: "We build design systems in Figma with auto-layout, component properties, and token-driven styling using the DTCG (Design Token Community Group) format. On the engineering side, we use CSS custom properties or a solution like Stitches/vanilla-extract so tokens are truly platform-agnostic. Every component ships with Storybook documentation, accessibility annotations, and a contract test that prevents visual regressions. Design-to-code handoff becomes a 30-minute PR review instead of a 3-day back-and-forth.",
      },
      {
        heading: "When to invest — and when to wait",
        text: "Pre-product-market fit, a design system can be premature optimization. If you're iterating on core UX weekly, a rigid system will slow you down. The right time to invest is when you have 3+ surfaces, 2+ designers, and a feature roadmap that extends 6 months out. At that point, the multiplicative efficiency gains compound for every feature you ship thereafter. We typically recommend a 'foundation tier' system (tokens + 15 core components) as the starting point, built in 3–4 weeks.",
      },
    ],
  },
  {
    category: "Growth",
    title: "Performance Marketing in 2026: What's Working Across Global Markets",
    date: "May 2026",
    readTime: "7 min read",
    accent: "#f59e0b",
    summary: "The channels that drove growth in 2022 are saturated. Here's where we're seeing real returns today — market by market.",
    body: [
      {
        heading: "The death of the generic ad funnel",
        text: "Broad CPM-based campaigns with generic creative are finished. iOS 14 shattered mobile attribution. Rising CPCs on Google and Meta have compressed margins. In 2026, the brands generating positive ROAS are those that have invested in first-party data, creative differentiation, and channel-specific content strategies. If your ad looks like an ad, it performs like an ad — poorly.",
      },
      {
        heading: "What's actually working: market by market",
        text: "In the US and UK, YouTube pre-roll with UGC-style creative is outperforming polished brand spots by 3:1 for D2C brands. In the Middle East (UAE/KSA), WhatsApp broadcast campaigns for B2C and LinkedIn thought leadership for B2B are generating extraordinary engagement — the digital ad market there is less saturated and users are less ad-fatigued. In Southeast Asia (Singapore, Malaysia), short-form video on TikTok and Instagram Reels with localized content in the native language is the single highest-ROI channel we've tested.",
      },
      {
        heading: "SEO is back — but it looks different",
        text: "Programmatic SEO, topical authority, and entity optimization are the three pillars of modern search strategy. AI overviews from Google have compressed click-through rates on informational queries, but commercial and navigational queries are still extremely valuable. The brands winning in search are building tight content clusters around their core offering — not chasing isolated high-volume keywords — and earning links through genuine expertise rather than link-building schemes.",
      },
      {
        heading: "The measurement frameworks that don't lie",
        text: "Last-click attribution is a lie that makes Meta look great and brand activity look useless. We advocate for incrementality testing (geo-holdout experiments or ghost bidding) to measure true channel contribution, and Media Mix Modeling (MMM) for longer-term budget allocation across channels. This is harder than looking at ROAS in the ads dashboard — but it's the only methodology that survives privacy changes and gives you real strategic insight.",
      },
    ],
  },
  {
    category: "Automation",
    title: "Replacing Manual Workflows: A Step-by-Step AI Automation Playbook",
    date: "May 2026",
    readTime: "9 min read",
    accent: "#8b5cf6",
    summary: "Most automation projects fail not because of the technology, but because teams pick the wrong processes to automate first.",
    body: [
      {
        heading: "The process selection framework",
        text: "Not every manual process is a good automation candidate. The best targets share three characteristics: (1) High frequency — the task happens at least weekly and takes 30+ minutes each time. (2) Rule-based — the decision logic can be written down and documented, even if it's complex. (3) Data-in, data-out — the inputs and outputs are digital and structured. Use this matrix to score your processes before you commit engineering resources. We've seen companies spend months automating a process that happens twice a year — a complete waste of leverage.",
      },
      {
        heading: "The modern automation stack",
        text: "For simple, no-code automation: Zapier, Make (formerly Integromat), or n8n (self-hosted). For business process automation with human-in-the-loop steps: Retool Workflows or Temporal. For AI-native workflows that need reasoning, tool use, and long-running tasks: LangGraph or CrewAI on the orchestration layer, with function-calling LLMs as the core intelligence. For document processing specifically: Unstructured.io for extraction, LlamaParse for PDFs. The right stack depends on complexity — don't over-engineer simple automations.",
      },
      {
        heading: "A real example: automating customer onboarding",
        text: "A B2B SaaS client of ours was spending 4 hours per enterprise customer on manual onboarding — gathering requirements, provisioning accounts, configuring integrations, and sending welcome documentation. We built an AI agent using GPT-4o with tool calls that: (1) reads the CRM deal to extract the customer's configuration requirements, (2) calls the provisioning API to set up the customer environment, (3) generates a personalized welcome document using the customer's details, (4) sends a structured Slack message to the customer success team with a summary. Total engineering time: 3 weeks. Time saved per onboarding: 3.5 hours. ROI: 6 months.",
      },
      {
        heading: "Where automation fails and how to avoid it",
        text: "Automation fails when it's treated as 'set and forget.' Every automated workflow needs monitoring (did the automation run? did it produce the right output?), fallback handling (what happens when the API is down?), and a human escalation path (who reviews when the AI isn't confident?). We build all automation with an audit log — every action taken by an automated system is recorded with timestamps, inputs, and outputs. This is non-negotiable for compliance-sensitive industries and invaluable for debugging when something breaks at 2am.",
      },
    ],
  },
];

export default function GlobalInsights() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="insights" className="bg-white py-24 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5 text-[11px] font-bold tracking-[0.3em] uppercase text-[#0a0a0a]/40"
            >
              <span className="w-6 h-px bg-[#E5231B]" />
              Insights
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-black text-[#0a0a0a] leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}
            >
              Thinking out loud.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-xs text-sm text-[#0a0a0a]/40 leading-relaxed font-light"
          >
            Deep dives from our engineering, design, and growth teams — no fluff, just what's actually working.
          </motion.p>
        </div>

        {/* Article list */}
        <div className="flex flex-col">
          {insights.map((article, i) => {
            const isOpen = expanded === i;
            return (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
                className="border-t last:border-b border-[#0a0a0a]/8"
              >
                {/* Clickable row */}
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="group w-full text-left py-8 sm:py-10 cursor-pointer"
                >
                  <div className="flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-8 items-start sm:items-center">
                    {/* Category badge */}
                    <div className="sm:col-span-2">
                      <span
                        className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: `${article.accent}18`, color: article.accent }}
                      >
                        {article.category}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="sm:col-span-7">
                      <h3
                        className="font-black text-[#0a0a0a] leading-tight tracking-tight group-hover:text-[#E5231B] transition-colors duration-300"
                        style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)" }}
                      >
                        {article.title}
                      </h3>
                      <p className="text-sm text-[#0a0a0a]/40 mt-1.5 font-light leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="hidden sm:flex sm:col-span-2 flex-col items-end gap-1">
                      <span className="text-xs text-[#0a0a0a]/30 font-mono">{article.date}</span>
                      <span className="text-xs text-[#0a0a0a]/30">{article.readTime}</span>
                    </div>

                    {/* Toggle icon */}
                    <div className="sm:col-span-1 flex justify-end self-start sm:self-center">
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#0a0a0a]/10 group-hover:bg-[#0a0a0a] group-hover:border-[#0a0a0a] transition-all duration-300"
                      >
                        <ArrowUpRight
                          size={14}
                          className="text-[#0a0a0a]/40 group-hover:text-white transition-colors duration-300"
                        />
                      </motion.div>
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pb-12 sm:pb-16">
                        {/* Meta row on mobile */}
                        <div className="flex items-center gap-4 mb-8 sm:hidden">
                          <span className="text-xs text-[#0a0a0a]/30 font-mono">{article.date}</span>
                          <span className="text-xs text-[#0a0a0a]/30">{article.readTime}</span>
                        </div>

                        {/* Article body */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                          {/* Sidebar accent */}
                          <div className="hidden lg:flex lg:col-span-2 justify-start pt-1">
                            <div className="w-0.5 h-full rounded-full" style={{ background: article.accent, opacity: 0.2 }} />
                          </div>

                          {/* Content */}
                          <div className="lg:col-span-8 flex flex-col gap-8">
                            {article.body.map((section, j) => (
                              <motion.div
                                key={section.heading}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: j * 0.1, duration: 0.4, ease: EASE }}
                              >
                                <h4 className="text-base sm:text-lg font-black text-[#0a0a0a] mb-3 tracking-tight">
                                  {section.heading}
                                </h4>
                                <p className="text-sm sm:text-base text-[#0a0a0a]/60 leading-[1.8] font-light">
                                  {section.text}
                                </p>
                              </motion.div>
                            ))}

                            {/* CTA */}
                            <div
                              className="mt-4 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                              style={{ background: `${article.accent}0d`, border: `1px solid ${article.accent}20` }}
                            >
                              <div>
                                <p className="text-sm font-bold text-[#0a0a0a] mb-1">Want to apply this to your business?</p>
                                <p className="text-xs text-[#0a0a0a]/50 font-light">Our team has done this for clients across 15+ countries. Let's talk.</p>
                              </div>
                              <a
                                href="#contact"
                                className="shrink-0 rounded-full px-5 py-2.5 text-[13px] font-bold text-white transition-all duration-300"
                                style={{ background: article.accent }}
                              >
                                Book a strategy call
                              </a>
                            </div>
                          </div>

                          <div className="hidden lg:block lg:col-span-2" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
