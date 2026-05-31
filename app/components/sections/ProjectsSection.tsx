"use client";

import React, { useState } from "react";
import Card from "../Card";
import CategoryDivider from "../CategoryDivider";

const link = "text-blue-500 underline";

interface Project {
  emoji: string;
  name: string;
  title: string;
  tags: string[];
  body: React.ReactNode;
  accent?: string;
}

interface Category {
  key: string;
  emoji: string;
  title: string;
  subtitle: string;
  chipColor: string;
  accent: string;
  projects: Project[];
}

const CATEGORIES: Category[] = [
  {
    key: "devops",
    emoji: "☁️",
    title: "Cloud & DevOps",
    subtitle: "infra, IaC & shipping — my home turf",
    chipColor: "bg-sky-500",
    accent: "bg-sky-600",
    projects: [
      {
        emoji: "🛠️",
        name: "Production Infra",
        title: "Multi-cloud infra, IaC & zero-downtime deploys",
        tags: ["AWS", "Azure", "Cloudflare", "Docker", "Terraform", "GitHub Actions", "Nginx", "PM2", "Redis"],
        body: (
          <p className="text-justify mb-4">
            DevOps is where I&apos;m happiest. I architect and operate the production infrastructure behind everything I
            ship — multi-cloud by necessity: <b>AWS</b> (EC2, S3, RDS, CloudFront, ALB), <b>Azure Container Apps</b>, and{" "}
            <b>Cloudflare</b> (R2, Workers). Everything is containerized with <b>Docker</b>, provisioned as code with{" "}
            <b>Terraform</b>, and shipped through <b>GitHub Actions</b> CI/CD behind <b>Nginx</b> reverse proxies with{" "}
            <b>PM2</b> process management and <b>zero-downtime deploys</b>. <br />
            <br />
            I tune for cost and latency, not just uptime: a <b>Redis</b> caching layer cut API latency 20–35% at RenewBuy,
            and S3 caching + batched calls trimmed AWS spend on TinyTales.
          </p>
        ),
      },
      {
        emoji: "🛍️",
        name: "Devops Ecom",
        title: "E-commerce on a full IaC + CI/CD pipeline",
        tags: ["Terraform", "Docker", "Render", "CI/CD", "MongoDB", "Node.js"],
        body: (
          <p className="text-justify mb-4">
            A personalized e-commerce platform shipped on a complete DevOps pipeline — <b>Terraform</b> IaC, Dockerized
            services, Render deploys, and scripted automation, with a documented split-commit git workflow. The app layer
            adds AI-style recommendations via a <b>MongoDB aggregation pipeline</b>, a Size×Color variant inventory with
            individual SKU tracking, and role-based Guest / User / VIP / Admin experiences. <br />
            <br />
            View the source:&nbsp;
            <a href="https://github.com/sshivanshg/Devops_ecom" target="_blank" rel="noopener noreferrer" className={link}>
              GitHub
            </a>
          </p>
        ),
      },
    ],
  },
  {
    key: "ml",
    emoji: "🧠",
    title: "Machine Learning Core",
    subtitle: "research, quant & honest ML",
    chipColor: "bg-blue-400",
    accent: "bg-violet-500",
    projects: [
      {
        emoji: "📈",
        name: "RAMT",
        title: "Regime-Adaptive Multimodal Transformer",
        tags: ["Python", "PyTorch", "Chronos-T5", "LoRA", "HMM", "XGBoost", "Streamlit", "Docker"],
        body: (
          <p className="text-justify mb-4">
            3rd-year capstone on cross-sectional equity return forecasting over the <b>NIFTY 200</b> universe. I built a
            full research ladder — XGBoost/LSTM baselines → a custom Transformer (RegimeCrossAttention + Mixture-of-Experts
            + TournamentRankingLoss) → a <b>Chronos-T5 + LoRA</b> foundation-model fine-tune — with a 3-state{" "}
            <b>HMM</b> layered in as a regime-aware risk gate. <br />
            <br />
            <b>Honest finding:</b> the custom transformer collapsed (data scarcity at rebalance scale, not features). The
            production momentum + HMM strategy delivered <b>Sharpe 0.83 / 13.5% CAGR / 64% win rate</b> over 25 monthly
            rebalances — beating the index by 5.8pp after friction — while the Chronos-LoRA fine-tune hit the best
            single-window Sharpe of 1.34. Takeaway: <i>&quot;HMM is conditional insurance, not always-on alpha.&quot;</i>{" "}
            Shipped with an IEEE-style 10-page report, full ablation, and a Dockerized Streamlit dashboard. <br />
            <br />
            View the source &amp; report:&nbsp;
            <a href="https://github.com/sshivanshg/regime-adaptive-transformer" target="_blank" rel="noopener noreferrer" className={link}>
              GitHub
            </a>
          </p>
        ),
      },
      {
        emoji: "📡",
        name: "SpatiaLaw",
        title: "WiFi CSI Human-Presence Detection",
        tags: ["Python", "scikit-learn", "Signal Processing", "Streamlit"],
        body: (
          <p className="text-justify mb-4">
            A privacy-first alternative to cameras: detect human presence from the way bodies distort WiFi{" "}
            <b>Channel State Information</b>. Hand-engineered Variance / Entropy / Doppler features over noisy Intel 5300
            CSI drove a Random Forest to <b>99.4% test accuracy</b>, served live through a Streamlit dashboard. No video,
            no audio — just signal physics. <br />
            <br />
            View the source &amp; paper:&nbsp;
            <a href="https://github.com/sshivanshg/spatialaw" target="_blank" rel="noopener noreferrer" className={link}>
              GitHub
            </a>
          </p>
        ),
      },
      {
        emoji: "📉",
        name: "StP",
        title: "Single-Stock Return Prediction (XGBoost)",
        tags: ["Python", "XGBoost", "Walk-forward", "Backtesting"],
        body: (
          <p className="text-justify mb-4">
            A quant-style pipeline that predicts <b>next-day return</b> (not raw price) with XGBoost and{" "}
            <b>walk-forward validation</b>. It cleanly separates training, daily inference, risk sizing and backtesting
            so predictions never bake in position sizing — the disciplined backbone that grew into the RAMT research.{" "}
            <br />
            <br />
            View the source:&nbsp;
            <a href="https://github.com/sshivanshg/StP" target="_blank" rel="noopener noreferrer" className={link}>
              GitHub
            </a>
          </p>
        ),
      },
    ],
  },
  {
    key: "ai",
    emoji: "🤖",
    title: "Applied AI & Agentic Products",
    subtitle: "the studio & the products people use",
    chipColor: "bg-emerald-500",
    accent: "bg-emerald-600",
    projects: [
      {
        emoji: "🟠",
        name: "Brixloop",
        title: "Digital product studio — Build & Ship Faster",
        accent: "bg-orange-500",
        tags: ["Co-founder", "Next.js", "TypeScript", "Tailwind", "Studio"],
        body: (
          <p className="text-justify mb-4">
            The digital product studio I <b>co-founded</b> — <i>&quot;Build and Ship Faster.&quot;</i> Brixloop designs
            and ships products end-to-end, and it&apos;s home to two of them: <b>Arth Saathi</b>, an AI operating system
            for India&apos;s small shops, and <b>LexVault</b>, an AI contract-lifecycle platform — both detailed below.{" "}
            <br />
            <br />
            Visit the studio:&nbsp;
            <a href="https://brixloop.com" target="_blank" rel="noopener noreferrer" className={link}>
              brixloop.com
            </a>
          </p>
        ),
      },
      {
        emoji: "🇮🇳",
        name: "Arth Saathi",
        title: "AI Operating System for India's Shops",
        tags: ["Brixloop", "Next.js", "Fastify", "Prisma", "Expo", "LangGraph", "Claude", "AWS"],
        body: (
          <p className="text-justify mb-4">
            <b>A Brixloop product.</b> An AI-first, Hindi/Hinglish operating system for India&apos;s 5–50 employee shops —
            attendance, payroll, GST and embedded fintech in an app the owner simply <i>talks to</i>. A pnpm monorepo
            (Next.js 14 web/admin, Expo mobile, Fastify/Nest backend, Prisma/Postgres on AWS RDS) built around a{" "}
            <b>confirm-before-write LangGraph agent</b> that gates every AI mutation behind explicit human approval.
            Currently running a live pilot. <br />
            <br />
            See it live:&nbsp;
            <a href="https://arthsaathi.co.in" target="_blank" rel="noopener noreferrer" className={link}>
              arthsaathi.co.in
            </a>
          </p>
        ),
      },
      {
        emoji: "⚖️",
        name: "LexVault",
        title: "AI Contract Lifecycle with line-level citations",
        tags: ["Brixloop", "Next.js", "Express", "pgvector", "Claude", "RAG", "Liveblocks"],
        body: (
          <p className="text-justify mb-4">
            <b>A Brixloop product.</b> Draft, review, sign and collaborate on legal contracts with AI that&apos;s grounded
            in <b>exact line-level citations</b> — not vibes. Hybrid RAG over Neon Postgres + pgvector, Claude for review
            / rewrite / clause-generation, real-time co-editing via Liveblocks, DAG approval workflows, and a Cloudflare
            R2 document vault. Next.js 14 + Express with rotating JWT (RS256) auth. <br />
            <br />
            See it live:&nbsp;
            <a href="https://www.lexvault.in" target="_blank" rel="noopener noreferrer" className={link}>
              lexvault.in
            </a>
          </p>
        ),
      },
      {
        emoji: "🎬",
        name: "TinyTales",
        title: "Personalized AI storybooks + videos for kids",
        tags: ["Next.js", "Express", "Prisma", "AWS S3", "Fal.ai", "ElevenLabs", "FFmpeg", "Socket.IO"],
        body: (
          <p className="text-justify mb-4">
            A live consumer platform (<b>2,000–3,000 MAUs, ~10% paid conversion</b>) that turns a child&apos;s photo and
            a theme into an illustrated storybook and a narrated animated video. A multi-stage agentic pipeline — Fal.ai
            PuLID for face-consistent art, Grok Imagine for animation, ElevenLabs for voiceover, FFmpeg for assembly —
            runs on Next.js 15 + Express + Prisma/Postgres + AWS S3, with Socket.IO live progress and Razorpay payments.
            Trimmed AWS spend via S3 caching, batched <code>ListObjectsV2</code>, and batch deletes. <br />
            <br />
            See it live:&nbsp;
            <a href="https://tinytalesvideos.com" target="_blank" rel="noopener noreferrer" className={link}>
              tinytalesvideos.com
            </a>
          </p>
        ),
      },
      {
        emoji: "🏛️",
        name: "Agora",
        title: "Self-hostable multi-agent AI debate platform",
        tags: ["Next.js", "Hono", "LangGraph", "pgvector", "Drizzle", "Vercel AI SDK"],
        body: (
          <p className="text-justify mb-4">
            Open-source (Apache-2.0). Distinct AI personas debate live topics in structured, fact-checked rounds, driven
            by a <b>LangGraph state machine</b> that persists to Postgres at every transition — debates are resumable and
            streamed over SSE. Bring-your-own-key with <b>AES-256-GCM</b> encryption; personas are just markdown files,
            so adding one needs zero code. Hono API, Next.js 15, Postgres + pgvector + Drizzle. Boring infra, exciting
            product. <br />
            <br />
            View the source:&nbsp;
            <a href="https://github.com/sshivanshg/agora" target="_blank" rel="noopener noreferrer" className={link}>
              GitHub
            </a>
          </p>
        ),
      },
    ],
  },
  {
    key: "sys",
    emoji: "🧩",
    title: "Systems Core",
    subtitle: "desktop apps & developer tooling",
    chipColor: "bg-amber-400",
    accent: "bg-amber-600",
    projects: [
      {
        emoji: "⚙️",
        name: "DevHelp",
        title: "Clone any OSS repo → a working dev env",
        tags: ["Node.js", "TypeScript", "CLI", "MCP", "Docker"],
        body: (
          <p className="text-justify mb-4">
            A CLI that does the 45 minutes of setup you&apos;d otherwise do by hand — detects <b>29 ecosystems</b>, picks
            the package manager from the lockfile, installs, copies env files, generates Prisma clients — then{" "}
            <b>proves it actually runs</b> by booting the dev server and polling its URL (<code>--verify</code>).
            Stress-tested on 20 real OSS repos, lifting clean-setup rate from <b>25% to 75%</b> with zero silent
            failures. Also runs as an MCP server. <br />
            <br />
            Source:&nbsp;
            <a href="https://github.com/sshivanshg/devhelp" target="_blank" rel="noopener noreferrer" className={link}>
              GitHub
            </a>
            &nbsp;· Install:&nbsp;
            <a href="https://www.npmjs.com/package/devhelp-cli" target="_blank" rel="noopener noreferrer" className={link}>
              npm · devhelp-cli
            </a>
          </p>
        ),
      },
      {
        emoji: "🗂️",
        name: "File Organizer",
        title: "Desktop file explorer that auto-organizes your mess",
        tags: ["Electron", "React", "TypeScript", "Vite", "Tailwind"],
        body: (
          <p className="text-justify mb-4">
            A cross-platform desktop app that browses your filesystem and <b>auto-sorts, categorizes and cleans up</b>{" "}
            cluttered folders like Downloads and Desktop. Built on Electron with a React + TypeScript renderer (Vite,
            Tailwind) and a separate main-process tsconfig — a clean split between the Electron shell and the UI. <br />
            <br />
            View the source:&nbsp;
            <a href="https://github.com/sshivanshg/File-Organizer" target="_blank" rel="noopener noreferrer" className={link}>
              GitHub
            </a>
          </p>
        ),
      },
      {
        emoji: "🐹",
        name: "burrow",
        title: "CLI that reclaims disk from dev junk",
        tags: ["Bun", "TypeScript", "CLI"],
        body: (
          <p className="text-justify mb-4">
            A Mole-inspired CLI that scans for dev junk (<code>node_modules</code>, <code>.next</code>, caches, build
            artifacts), shows the total reclaimable space up front, and deletes only what you multi-select —{" "}
            <b>safe by default</b>. Hard guardrails refuse to touch the scan root, <code>$HOME</code>, <code>/</code>, or
            anything outside the target; <code>--list</code> and <code>--dry-run</code> let you look without touching.
            Bun + TypeScript, shipped as a single compiled standalone binary. <br />
            <br />
            <span className="text-stone-500">A live run reclaimed 388&nbsp;MB on first scan.</span>
          </p>
        ),
      },
    ],
  },
];

const ProjectsSection: React.FC = () => {
  const [active, setActive] = useState<string>(CATEGORIES[0].key);
  const visible = active === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.key === active);

  return (
    <div>
      <div className="text-center p-3">
        <h2 className="text-2xl font-permanent">Projects & creations</h2>
        <p className="font-kalam text-stone-500">Pick a category — no endless scrolling.</p>
      </div>

      {/* Sticky category filter */}
      <div className="sticky top-0 z-30 -mx-4 px-3 py-3 bg-[#fffffb]/95 backdrop-blur-sm border-y border-stone-200 shadow-sm flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={`font-permanent text-sm md:text-base px-3 py-1 rounded-md -rotate-1 shadow transition-all duration-200 hover:-translate-y-0.5 ${
            active === "all" ? "bg-stone-700 text-white" : "bg-white text-stone-500 hover:text-stone-800"
          }`}>
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setActive(c.key)}
            className={`font-permanent text-sm md:text-base px-3 py-1 rounded-md -rotate-1 shadow transition-all duration-200 hover:-translate-y-0.5 ${
              active === c.key ? `${c.chipColor} text-stone-900` : "bg-white text-stone-500 hover:text-stone-800"
            }`}>
            {c.emoji}&nbsp;{c.title}
          </button>
        ))}
      </div>

      <div className="p-4 m-4 border-2 rounded-2xl border-stone-300">
        {visible.map((cat) => (
          <React.Fragment key={cat.key}>
            <CategoryDivider emoji={cat.emoji} title={cat.title} subtitle={cat.subtitle} color={cat.chipColor} />
            {cat.projects.map((p) => (
              <Card
                key={p.name}
                icon={<span className="text-2xl">{p.emoji}</span>}
                iconTitle={p.name}
                iconColor={p.accent ?? cat.accent}
                title={p.title}
                elements={p.tags}>
                {p.body}
              </Card>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
