import React from "react";
import Reveal from "../Reveal";
import { Github, Linkedin, Mail, Code2 } from "lucide-react";

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shivansh-gupta-a0400827b/",
    icon: <Linkedin size={30} strokeWidth={1.75} color="#0A66C2" />,
    external: true,
  },
  {
    label: "X",
    href: "https://x.com/sshivanshg",
    icon: (
      <svg width={30} height={30} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/sshivanshg",
    icon: <Github size={30} strokeWidth={1.75} color="#0FBF3E" />,
    external: true,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/shivansh_7394/",
    icon: <Code2 size={30} strokeWidth={1.75} color="#FFA116" />,
    external: true,
  },
  {
    label: "Mail",
    href: "mailto:sshivanshg@gmail.com",
    icon: <Mail size={30} strokeWidth={1.75} color="#c71610" />,
    external: false,
  },
];

const ContactSection: React.FC = () => {
  return (
    <div>
      <div className="text-center p-3">
        <h2 className="text-2xl font-permanent">Contact Me</h2>
      </div>
      <hr className="h-px m-6 bg-neutral-quaternary" />

      <div className="w-full">
        <h3 className="text-xl font-bold text-center">Via my socials</h3>

        <div className="flex justify-evenly md:justify-center flex-wrap">
          {SOCIALS.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <a
                href={s.href}
                className="flex flex-col items-center min-w-[5.5rem] bg-white rounded-xl p-4 m-2 sm:p-6 sm:m-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <p>{s.label}</p>
                {s.icon}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
