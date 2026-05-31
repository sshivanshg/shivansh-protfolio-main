"use client"; // Make this a 'client component' (gets executed on client side) instead of on the server natively (server component)

import Tab from "./components/Tab";
import ScotchedPhoto from "./components/ScotchedPhoto";
import StickerLabel from "./components/StickerLabel";
import { Linkedin, Github } from "lucide-react";

import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ContactSection from "./components/sections/ContactSection";
import TiltScreenModal from "./components/TiltScreenModal";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [animationClass, setAnimationClass] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const folderContainerRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tabName: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    if (activeTab === tabName) {
      setAnimationClass("animate-put-back");
        setTimeout(() => {
          setActiveTab(null);
        }, 450);
    } else {
      if (activeTab) {
        setAnimationClass("animate-put-back");
        setTimeout(() => {
          setActiveTab(tabName);
          setAnimationClass("animate-pull-over");
        }, 450);
      } else {
        setActiveTab(tabName);
        setAnimationClass("animate-pull-over");
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isAnimating) {
        return;
      }
      if (
        folderContainerRef.current &&
        !folderContainerRef.current.contains(event.target as Node)
      ) {
        if (activeTab) {
          setIsAnimating(true);
          setAnimationClass("animate-put-back");
          setTimeout(() => {
            setActiveTab(null);
          }, 450);
        }
      }
    };

    if (activeTab) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeTab, isAnimating]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 450);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    // The screen is the positioning context for our centered div.
    <div className="relative h-screen bg-sky-50 dark:bg-stone-600">
      <TiltScreenModal />
      <div
        ref={folderContainerRef}
        className="absolute top-0 bottom-0 left-0 right-0 m-auto w-[80vw] h-[60vw] max-w-[106.67vh] max-h-[80vh] z-100">
        {/* Tabs over the folder */}
        <nav className="absolute w-2/3 h-1/6 right-0 z-20 -translate-y-2/3 lg:-translate-y-1/2">
          <ul className="flex w-full h-full gap-x-1">
            <Tab bgColor="bg-emerald-500" text="About" onClick={() => handleTabClick("About")} />
            <Tab bgColor="bg-blue-400" text="Skills" onClick={() => handleTabClick("Skills")} />
            <Tab bgColor="bg-red-400" text="Projects" onClick={() => handleTabClick("Projects")} />
            <Tab bgColor="bg-amber-400" text="Contact" onClick={() => handleTabClick("Contact")} />
          </ul>
        </nav>

        {/* Back of the folder */}
        <div className="absolute inset-0 z-10 origin-bottom skew-x-3 w-full rounded-lg bg-orange-200 p-4 mt-1 shadow-lg"></div>

        {/* Document Inside of the folder */}
        <div
          ref={scrollContainerRef}
          className={`absolute inset-x-0 bottom-0 top-6 z-20 w-full rounded-b-lg bg-lined-paper p-4 shadow-lg text-black overflow-y-auto ${animationClass}`}>
          {activeTab === "About" && <AboutSection />}
          {activeTab === "Skills" && <SkillsSection />}
          {activeTab === "Projects" && <ProjectsSection />}
          {activeTab === "Contact" && <ContactSection />}
        </div>
        {/* Front of the folder */}
        <div className="absolute inset-0 z-40 origin-bottom -skew-x-3 w-full rounded-lg bg-orange-200 p-4 shadow-lg">
          <StickerLabel text="Shivansh's Stuff" containerClassName=" -rotate-9 translate-y-1/2" />

          <ScotchedPhoto
            image={{ src: "/profile.jpg", width: 300, height: 300, alt: "Shivansh Gupta" }}
            containerClassName=" w-1/2 translate-y-1/3 translate-x-3/4 skew-x-3 rotate-12 z-20"
          />
        </div>
        <div className="fixed bottom-3 left-0 right-0 z-[120] flex items-center justify-center gap-4 text-stone-700 dark:text-white pointer-events-none">
          <span className="pointer-events-auto">Shivansh Gupta {new Date().getFullYear()}</span>
          <span className="text-stone-400">·</span>
          <a
            href="https://www.linkedin.com/in/shivansh-gupta-a0400827b/"
            aria-label="LinkedIn"
            className="pointer-events-auto transition-transform hover:-translate-y-0.5"
            target="_blank"
            rel="noopener noreferrer">
            <Linkedin size={22} strokeWidth={1.75} color="#0A66C2" />
          </a>
          <a
            href="https://github.com/sshivanshg"
            aria-label="GitHub"
            className="pointer-events-auto transition-transform hover:-translate-y-0.5 text-stone-800 dark:text-white"
            target="_blank"
            rel="noopener noreferrer">
            <Github size={22} strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </div>
  );
}
