import React from "react";
import Card from "../Card";
import Reveal from "../Reveal";
import { Timeline, TimelineItem } from "../Timeline";
import { Code2, Wallpaper, Server, BrainCircuit, Cloud, Database, GraduationCap } from "lucide-react";

const SKILLS = [
  {
    title: "Languages",
    icon: <Code2 size={24} strokeWidth={1.75} color="#ffffff" />,
    iconColor: "bg-stone-700",
    elements: ["TypeScript", "Python", "JavaScript", "Go", "SQL", "Bash"],
  },
  {
    title: "AI / ML",
    icon: <BrainCircuit size={24} strokeWidth={1.75} color="#ffffff" />,
    iconColor: "bg-violet-500",
    elements: [
      "Claude / Anthropic",
      "LangGraph",
      "LangChain",
      "RAG (pgvector)",
      "Agentic Workflows",
      "PyTorch",
      "XGBoost",
      "HMM",
      "Chronos-T5 + LoRA",
      "scikit-learn",
    ],
  },
  {
    title: "Frontend",
    icon: <Wallpaper size={24} strokeWidth={1.75} color="#ffffff" />,
    iconColor: "bg-blue-400",
    elements: ["Next.js", "React", "React Native / Expo", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Backend & APIs",
    icon: <Server size={24} strokeWidth={1.75} color="#ffffff" />,
    iconColor: "bg-emerald-500",
    elements: ["Node.js", "Express", "Fastify / Nest", "Hono", "FastAPI", "Prisma", "REST · WebSockets · SSE", "Microservices"],
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud size={24} strokeWidth={1.75} color="#ffffff" />,
    iconColor: "bg-amber-500",
    elements: [
      "AWS (EC2, S3, RDS, Lambda, CloudFront, ALB)",
      "Cloudflare (Workers, D1, R2, KV, Durable Objects)",
      "Docker",
      "Terraform",
      "GitHub Actions",
      "Nginx",
      "PM2",
      "Vercel",
      "Linux",
    ],
  },
  {
    title: "Databases",
    icon: <Database size={24} strokeWidth={1.75} color="#ffffff" />,
    iconColor: "bg-rose-500",
    elements: ["PostgreSQL", "MongoDB", "Redis", "pgvector", "SQLite"],
  },
];

const SkillsSection: React.FC = () => {
  return (
    <div>
      <div className="text-center p-3">
        <h2 className="text-2xl font-permanent">Skills and Education</h2>
      </div>

      <hr className="h-px m-6 bg-neutral-quaternary" />

      <div className="skills-shit p-3 m-2 sm:p-4 sm:m-4 border-2 rounded-2xl border-stone-300">
        <h2 className="pb-4 text-2xl font-permanent">My Skills</h2>
        <div className="lg:grid lg:grid-cols-2">
          {SKILLS.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <Card title={s.title} icon={s.icon} elements={s.elements} iconColor={s.iconColor} />
            </Reveal>
          ))}
        </div>
      </div>

      <hr className="h-px m-10 bg-neutral-quaternary" />

      <div className="Education-shit p-3 m-2 sm:p-4 sm:m-4 border-2 rounded-2xl border-stone-300">
        <h2 className="pb-4 text-2xl font-permanent">My Education</h2>
        <Timeline>
          <TimelineItem date="2023 - 2027 (expected)">
            <Reveal>
              <Card
                title="B.Tech, Computer Science & Artificial Intelligence"
                icon={<GraduationCap size={24} strokeWidth={1.75} color="#ffffff" />}
                iconTitle="Rishihood University"
                text="Sonipat, Haryana"
                elements={["Machine Learning", "Deep Learning", "Systems", "Full-Stack Engineering"]}
                iconColor="bg-indigo-500"
              />
            </Reveal>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
};

export default SkillsSection;
