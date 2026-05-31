import React from "react";
import ContactForm from "../ContactForm";
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
                className="flex flex-col items-center w-25 bg-white rounded-xl p-6 m-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <p>{s.label}</p>
                {s.icon}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      <hr className="h-px m-6 bg-neutral-quaternary" />
      <div className="w-full md:w-1/2 md:mx-auto">
        <h3 className="text-xl font-bold text-center">Or directly via this form</h3>
        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
};

export default ContactSection;
