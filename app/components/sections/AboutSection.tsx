import React from "react";
import Card from "../Card";
import Avatar from "../Avatar";
import { Timeline, TimelineItem } from "../Timeline";
import { Rocket, Cloud, Server, Trophy, PartyPopper } from "lucide-react";

const AboutSection: React.FC = () => {
  return (
    <div>
      <div className="flex justify-evenly items-center rounded-lg p-3 gap-4">
        <div>
          <h2 className="mb-4 text-xl font-permanent">Who am I ?</h2>
          <p className="text-3xl font-semibold">Shivansh Gupta</p>
          <p className="text-xl md:text-2xl text-stone-700">AI &amp; Full-Stack Engineer · Founder</p>
          <p className="text-base md:text-lg text-stone-500">Cloud + DevOps · CS &amp; AI @ Rishihood University</p>
        </div>
        <div className="shrink-0">
          <Avatar size={180} className="shadow-lg" />
        </div>
      </div>

      <hr className="h-px m-6 bg-neutral-quaternary" />

      <div className="p-4 m-4 border-2 rounded-2xl border-stone-300">
        <h2 className="mb-4 text-2xl font-permanent">Presentation</h2>
        <p className="text-justify">
          Hey, I&apos;m Shivansh — a builder who ships end-to-end. <br />
          <br />
          I&apos;m the founder of <b>Arth Saathi</b>, an AI-first operating system for India&apos;s small shops, and I
          spend my days moving between three things I love: <b>product</b> (vertical SaaS with real users),{" "}
          <b>applied AI/ML</b> (agentic workflows, RAG, and honest ML research), and the{" "}
          <b>cloud &amp; DevOps</b> that holds it all up. <br />
          <br />
          My default stack is <b>Next.js + TypeScript + PostgreSQL/Prisma</b> with <b>Claude / LangGraph</b> for
          orchestration, <b>Python</b> for ML and quant work, and a healthy obsession with <b>AWS, Cloudflare, Docker
          and Terraform</b> — I like infrastructure that&apos;s boring, reproducible and observable. I&apos;m currently
          studying <b>Computer Science &amp; Artificial Intelligence</b> at Rishihood University (graduating 2027). <br />
          <br />
          I care about <b>honest engineering</b>: shipping things that actually work, measuring them, and being clear
          about trade-offs instead of hiding them. <br />
          <br />
          <span className="text-xl">-&gt; Download my CV as a PDF: &nbsp;</span>
          <a
            href="/docs/shivansh-gupta-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline text-xl">
            Here
          </a>
        </p>
      </div>

      <hr className="h-px m-10 bg-neutral-quaternary" />

      <div className="p-4 m-4 border-2 rounded-2xl border-stone-300">
        <h2 className="mb-4 text-2xl font-permanent">My work experience</h2>
        <Timeline>
          <TimelineItem date="Jan 2025 - Present">
            <Card
              title="Founder & Full-Stack / AI Engineer"
              icon={<Rocket size={24} strokeWidth={1.75} color="#ffffff" />}
              iconTitle="Arth Saathi"
              iconColor="bg-emerald-500">
              <p>
                <b>AI-first operating system for India&apos;s 5–50 employee shops</b> — attendance, payroll, GST and
                embedded fintech, in a Hindi/Hinglish app the owner simply talks to.
              </p>
              <ul className="list-disc list-inside pl-5 mt-4 space-y-2">
                <li>
                  Built a <b>pnpm monorepo</b>: Next.js 14 web + admin, Expo/React Native mobile, a Fastify/Nest
                  backend, and Prisma/PostgreSQL on AWS RDS.
                </li>
                <li>
                  Designed a <b>confirm-before-write LangGraph agent</b> architecture (Claude tool-calling) where every
                  AI-driven mutation is gated by explicit human approval.
                </li>
                <li>
                  Owns the full product surface — PRD, GTM, and architecture — with a live pilot and an open pre-seed
                  round.
                </li>
              </ul>
            </Card>
          </TimelineItem>
          <TimelineItem date="Apr 2025 - Aug 2025">
            <Card
              title="Full Stack Developer, Intern"
              icon={<Cloud size={24} strokeWidth={1.75} color="#ffffff" />}
              iconTitle="Wonder Creative Studio"
              text="Bengaluru, Remote"
              iconColor="bg-blue-400">
              <ul className="list-disc list-inside pl-5 mt-2 space-y-2">
                <li>
                  Developed backend APIs for an <b>architect–client collaboration portal</b> covering project
                  customization, media management, and role-based access control.
                </li>
                <li>
                  Managed <b>AWS infrastructure</b> (EC2, S3, Docker, Nginx) including provisioning, CI/CD, monitoring,
                  and zero-downtime deploys.
                </li>
              </ul>
            </Card>
          </TimelineItem>
          <TimelineItem date="Jan 2025 - Mar 2025">
            <Card
              title="Back End Developer, Intern"
              icon={<Server size={24} strokeWidth={1.75} color="#ffffff" />}
              iconTitle="RenewBuy"
              text="Gurugram, India"
              iconColor="bg-amber-500">
              <ul className="list-disc list-inside pl-5 mt-2 space-y-2">
                <li>
                  Cut API latency by <b>20–35%</b> and raised cache hit rate from 25% to 45% by building a{" "}
                  <b>Redis caching layer</b> for high-traffic health-insurance APIs.
                </li>
                <li>
                  Boosted return-user completion by <b>8–18%</b> with a progress-persistence system that recovers
                  mid-funnel drop-offs in multi-step purchase flows.
                </li>
                <li>
                  Eliminated regression risk on critical workflows (OTP, KYC, policy issuance) by authoring a
                  comprehensive <b>Pytest</b> suite for secure insurance edge cases.
                </li>
              </ul>
            </Card>
          </TimelineItem>
        </Timeline>
      </div>

      <hr className="h-px m-10 bg-neutral-quaternary" />

      <div className="p-4 m-4 border-2 rounded-2xl border-stone-300">
        <h2 className="mb-4 text-2xl font-permanent">Leadership & Community</h2>
        <Timeline>
          <TimelineItem date="Feb 2024 - Feb 2026">
            <Card
              title="Core Committee"
              icon={<Trophy size={24} strokeWidth={1.75} color="#ffffff" />}
              iconTitle="Neutron Techfest"
              iconColor="bg-red-400">
              <p>
                Led marketing and social media across two editions — driving <b>2,000+ registrations</b> and{" "}
                <b>1,400+ on-ground footfall</b>.
              </p>
            </Card>
          </TimelineItem>
          <TimelineItem date="Aug 2025 - Jan 2026">
            <Card
              title="Board Member"
              icon={<PartyPopper size={24} strokeWidth={1.75} color="#ffffff" />}
              iconTitle="Damru Cultural Fest"
              iconColor="bg-pink-500">
              <p>Oversaw the inaugural fest end-to-end, from concept to execution.</p>
            </Card>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
};

export default AboutSection;
