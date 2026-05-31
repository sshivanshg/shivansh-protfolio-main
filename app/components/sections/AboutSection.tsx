import React from "react";
import Card from "../Card";
import Avatar from "../Avatar";
import Reveal from "../Reveal";
import { Timeline, TimelineItem } from "../Timeline";
import { Rocket, Cloud, Server, Trophy, PartyPopper } from "lucide-react";

const AboutSection: React.FC = () => {
  return (
    <div>
      <Reveal>
        <div className="flex flex-col items-center gap-4 rounded-lg p-3 text-center sm:flex-row sm:justify-evenly sm:text-left">
          <div>
            <h2 className="mb-4 text-xl font-permanent">Who am I ?</h2>
            <p className="text-2xl font-semibold sm:text-3xl">Shivansh Gupta</p>
            <p className="text-lg sm:text-xl md:text-2xl text-stone-700">Cloud / DevOps · AI &amp; Full-Stack Engineer</p>
            <p className="text-sm sm:text-base md:text-lg text-stone-500">
              Co-Founder @ Brixloop · CS &amp; AI @ Rishihood University
            </p>
          </div>
          <div className="shrink-0">
            <Avatar size={140} className="h-[140px] w-[140px] shadow-lg sm:h-[180px] sm:w-[180px]" />
          </div>
        </div>
      </Reveal>

      <hr className="h-px m-6 bg-neutral-quaternary" />

      <Reveal>
        <div className="p-3 m-2 sm:p-4 sm:m-4 border-2 rounded-2xl border-stone-300">
          <h2 className="mb-4 text-2xl font-permanent">Presentation</h2>
          <p className="text-justify">
            Hey, I&apos;m Shivansh — a builder who ships end-to-end, happiest in the <b>cloud &amp; DevOps</b> layer.{" "}
            <br />
            <br />
            I co-founded <b>Brixloop</b>, a digital product studio, where we build and <i>run</i> products like{" "}
            <b>Arth Saathi</b> (an AI OS for India&apos;s small shops) and <b>LexVault</b> (AI contract lifecycle). My
            first love is <b>infrastructure</b> — I architect and operate multi-cloud, containerized systems and like
            them boring, reproducible and observable — and from there I build out the <b>full stack</b> and the{" "}
            <b>applied AI/ML</b> on top (agentic workflows, RAG, and honest ML research). <br />
            <br />
            My toolkit: <b>AWS, Azure, Cloudflare, Docker, Terraform, GitHub Actions, Nginx</b> for infra;{" "}
            <b>Next.js + TypeScript + PostgreSQL/Prisma</b> with <b>Claude / LangGraph</b> for products; and{" "}
            <b>Python</b> for ML and quant work. I&apos;m currently studying <b>Computer Science &amp; Artificial
            Intelligence</b> at Rishihood University (graduating 2027). <br />
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
      </Reveal>

      <hr className="h-px m-10 bg-neutral-quaternary" />

      <div className="p-3 m-2 sm:p-4 sm:m-4 border-2 rounded-2xl border-stone-300">
        <h2 className="mb-4 text-2xl font-permanent">My work experience</h2>
        <Timeline>
          <TimelineItem date="2025 - Present">
            <Reveal>
              <Card
                title="Co-Founder & Engineer"
                icon={<Rocket size={24} strokeWidth={1.75} color="#ffffff" />}
                iconTitle="Brixloop"
                iconColor="bg-orange-500">
                <p>
                  Digital product studio — we design, build and <b>operate</b> products end-to-end. Home to{" "}
                  <b>Arth Saathi</b> (an AI OS for India&apos;s small shops) and <b>LexVault</b> (AI contract lifecycle).
                </p>
                <ul className="list-disc list-inside pl-5 mt-4 space-y-2">
                  <li>
                    <b>Own the cloud &amp; DevOps:</b> multi-cloud (AWS, Azure Container Apps, Cloudflare), Dockerized
                    services, <b>Terraform</b> IaC, <b>GitHub Actions</b> CI/CD, Nginx + PM2, and zero-downtime deploys.
                  </li>
                  <li>
                    Built a <b>pnpm monorepo</b> (Next.js web/admin, Expo mobile, Fastify/Nest backend, Prisma/Postgres)
                    and a <b>confirm-before-write LangGraph agent</b> (Claude tool-calling) gating every AI mutation
                    behind human approval.
                  </li>
                  <li>Drive products end-to-end — architecture, PRD and GTM — across live pilots.</li>
                </ul>
              </Card>
            </Reveal>
          </TimelineItem>
          <TimelineItem date="Apr 2025 - Aug 2025">
            <Reveal delay={80}>
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
            </Reveal>
          </TimelineItem>
          <TimelineItem date="Jan 2025 - Mar 2025">
            <Reveal delay={160}>
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
            </Reveal>
          </TimelineItem>
        </Timeline>
      </div>

      <hr className="h-px m-10 bg-neutral-quaternary" />

      <div className="p-3 m-2 sm:p-4 sm:m-4 border-2 rounded-2xl border-stone-300">
        <h2 className="mb-4 text-2xl font-permanent">Leadership & Community</h2>
        <Timeline>
          <TimelineItem date="Feb 2024 - Feb 2026">
            <Reveal>
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
            </Reveal>
          </TimelineItem>
          <TimelineItem date="Aug 2025 - Jan 2026">
            <Reveal delay={80}>
              <Card
                title="Board Member"
                icon={<PartyPopper size={24} strokeWidth={1.75} color="#ffffff" />}
                iconTitle="Damru Cultural Fest"
                iconColor="bg-pink-500">
                <p>Oversaw the inaugural fest end-to-end, from concept to execution.</p>
              </Card>
            </Reveal>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
};

export default AboutSection;
