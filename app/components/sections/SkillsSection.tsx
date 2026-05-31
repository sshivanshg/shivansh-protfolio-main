import React from "react";
import Card from "../Card";
import { Timeline, TimelineItem } from "../Timeline";
import { Code2, Wallpaper, Server, BrainCircuit, Cloud, Database, GraduationCap } from "lucide-react";

const SkillsSection: React.FC = () => {
  return (
    <div>
      <div className="text-center p-3">
        <h2 className="text-2xl font-permanent">Skills and Education</h2>
      </div>

      <hr className="h-px m-6 bg-neutral-quaternary" />

      <div className="skills-shit p-4 m-4 border-2 rounded-2xl border-stone-300">
        <h2 className="pb-4 text-2xl font-permanent">My Skills</h2>
        <div className="lg:grid lg:grid-cols-2">
          <Card
            title="Languages"
            icon={<Code2 size={24} strokeWidth={1.75} color="#ffffff" />}
            elements={["TypeScript", "Python", "JavaScript", "Go", "SQL", "Bash"]}
            iconColor="bg-stone-700"
          />
          <Card
            title="AI / ML"
            icon={<BrainCircuit size={24} strokeWidth={1.75} color="#ffffff" />}
            elements={[
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
            ]}
            iconColor="bg-violet-500"
          />
          <Card
            title="Frontend"
            icon={<Wallpaper size={24} strokeWidth={1.75} color="#ffffff" />}
            elements={["Next.js", "React", "React Native / Expo", "Tailwind CSS", "shadcn/ui"]}
            iconColor="bg-blue-400"
          />
          <Card
            title="Backend & APIs"
            icon={<Server size={24} strokeWidth={1.75} color="#ffffff" />}
            elements={[
              "Node.js",
              "Express",
              "Fastify / Nest",
              "Hono",
              "FastAPI",
              "Prisma",
              "REST · WebSockets · SSE",
              "Microservices",
            ]}
            iconColor="bg-emerald-500"
          />
          <Card
            title="Cloud & DevOps"
            icon={<Cloud size={24} strokeWidth={1.75} color="#ffffff" />}
            elements={[
              "AWS (EC2, S3, RDS, Lambda, CloudFront, ALB)",
              "Cloudflare (Workers, D1, R2, KV, Durable Objects)",
              "Docker",
              "Terraform",
              "GitHub Actions",
              "Nginx",
              "PM2",
              "Vercel",
              "Linux",
            ]}
            iconColor="bg-amber-500"
          />
          <Card
            title="Databases"
            icon={<Database size={24} strokeWidth={1.75} color="#ffffff" />}
            elements={["PostgreSQL", "MongoDB", "Redis", "pgvector", "SQLite"]}
            iconColor="bg-rose-500"
          />
        </div>
      </div>

      <hr className="h-px m-10 bg-neutral-quaternary" />

      <div className="Education-shit p-4 m-4 border-2 rounded-2xl border-stone-300">
        <h2 className="pb-4 text-2xl font-permanent">My Education</h2>
        <Timeline>
          <TimelineItem date="2023 - 2027 (expected)">
            <Card
              title="B.Tech, Computer Science & Artificial Intelligence"
              icon={<GraduationCap size={24} strokeWidth={1.75} color="#ffffff" />}
              iconTitle="Rishihood University"
              text="Sonipat, Haryana · SGPA 7.0"
              elements={["Machine Learning", "Deep Learning", "Systems", "Full-Stack Engineering"]}
              iconColor="bg-indigo-500"
            />
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
};

export default SkillsSection;
