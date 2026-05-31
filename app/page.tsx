"use client"; // Make this a 'client component' (gets executed on client side) instead of on the server natively (server component)

import Tab from "./components/Tab";
import ScotchedPhoto from "./components/ScotchedPhoto";
import StickerLabel from "./components/StickerLabel";
import ScrollHint from "./components/ScrollHint";
import { Linkedin, Github, ChevronsDown } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ContactSection from "./components/sections/ContactSection";
import TiltScreenModal from "./components/TiltScreenModal";

import { useState, useEffect, useRef, useCallback } from "react";

const TAB_ORDER: string[] = ["About", "Projects", "Skills", "Contact"];

// Direction-aware cross-slide for swapping the section content. `dir` is +1 when
// moving forward (down the deck) and -1 when moving back. A soft spring on the
// transform gives a calm, organic settle; opacity tweens gently alongside.
const sectionVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, y: dir >= 0 ? 30 : -30, scale: 0.98 }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
      mass: 0.8,
      opacity: { duration: 0.4, ease: "easeOut" },
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir >= 0 ? -20 : 20,
    scale: 0.99,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [animationClass, setAnimationClass] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const folderContainerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{ activeTab: string | null; isAnimating: boolean }>({ activeTab: null, isAnimating: false });

  // Keep the latest values readable from inside stable event handlers.
  useEffect(() => {
    stateRef.current = { activeTab, isAnimating };
  }, [activeTab, isAnimating]);

  // Single source of truth for opening / switching / closing a tab with the
  // folder animation. Stable identity so listeners don't re-bind every render.
  const animateToTab = useCallback((tabName: string | null) => {
    const { activeTab: current, isAnimating: animating } = stateRef.current;
    if (animating) return;

    // Close to the cover (explicit null, or toggling the already-open tab).
    if (!tabName || tabName === current) {
      if (!current) return;
      setIsAnimating(true);
      setAnimationClass("animate-put-back");
      setTimeout(() => setActiveTab(null), 500);
      return;
    }

    // Forward = moving down the deck, back = up.
    const curIdx = current ? TAB_ORDER.indexOf(current) : -1;
    setDirection(TAB_ORDER.indexOf(tabName) >= curIdx ? 1 : -1);
    setIsAnimating(true);

    if (current) {
      // Already open → cross-slide the content (Framer); the folder stays open.
      setActiveTab(tabName);
    } else {
      // Opening from the cover → flip the folder open.
      setAnimationClass("animate-pull-over");
      setActiveTab(tabName);
    }
  }, []);

  const handleTabClick = (tabName: string) => animateToTab(tabName);

  // Click outside the folder closes the open tab.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (folderContainerRef.current && !folderContainerRef.current.contains(event.target as Node)) {
        animateToTab(null);
      }
    };
    if (activeTab) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeTab, animateToTab]);

  // Release the animation lock after the transition.
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 900);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // "Master scroll": at the bottom of a section keep scrolling to advance to the
  // next tab (and up at the top to go back) — like full-page sections. An
  // accumulator + cooldown make it feel intentional rather than jumpy.
  useEffect(() => {
    let overscroll = 0;
    let lastTime = 0;
    let cooldownUntil = 0;
    let armedDir = 0; // edge the CURRENT gesture began at: +1 bottom, -1 top, 0 otherwise
    // Low threshold: once a gesture is armed (began at an edge), a single
    // deliberate scroll advances — no need to scroll several times.
    const THRESHOLD = 50;

    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      const newGesture = now - lastTime > 250; // a >250ms pause starts a fresh gesture
      lastTime = now;

      const { activeTab: current, isAnimating: animating } = stateRef.current;
      if (animating || now < cooldownUntil) return;

      const el = scrollContainerRef.current;
      if (!el) return;
      const idx = current ? TAB_ORDER.indexOf(current) : -1; // -1 = closed cover
      const atTop = el.scrollTop <= 2;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;

      // Arm a jump only when a NEW gesture *begins* already at an edge. If you
      // merely reach the edge partway through a scroll, nothing happens — you
      // stop, then scroll once more to move to the next / previous section.
      if (newGesture) {
        overscroll = 0;
        if (atTop && atBottom) armedDir = e.deltaY > 0 ? 1 : -1;
        else armedDir = atBottom ? 1 : atTop ? -1 : 0;
      }

      if (armedDir === 1 && atBottom && idx < TAB_ORDER.length - 1) {
        if (e.deltaY > 0) {
          overscroll += e.deltaY;
          if (overscroll > THRESHOLD) {
            overscroll = 0;
            armedDir = 0;
            cooldownUntil = now + 1500;
            animateToTab(TAB_ORDER[idx + 1]);
          }
        } else overscroll = 0;
      } else if (armedDir === -1 && atTop && idx > 0) {
        if (e.deltaY < 0) {
          overscroll += e.deltaY;
          if (overscroll < -THRESHOLD) {
            overscroll = 0;
            armedDir = 0;
            cooldownUntil = now + 1500;
            animateToTab(TAB_ORDER[idx - 1]);
          }
        } else overscroll = 0;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [animateToTab]);

  const activeIdx = activeTab ? TAB_ORDER.indexOf(activeTab) : -1;
  const nextLabel = activeTab && activeIdx < TAB_ORDER.length - 1 ? TAB_ORDER[activeIdx + 1] : null;

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
            <Tab bgColor="bg-red-400" text="Projects" onClick={() => handleTabClick("Projects")} />
            <Tab bgColor="bg-blue-400" text="Skills" onClick={() => handleTabClick("Skills")} />
            <Tab bgColor="bg-amber-400" text="Contact" onClick={() => handleTabClick("Contact")} />
          </ul>
        </nav>

        {/* Back of the folder */}
        <div className="absolute inset-0 z-10 origin-bottom skew-x-3 w-full rounded-lg bg-orange-200 p-4 mt-1 shadow-lg"></div>

        {/* Document Inside of the folder */}
        <div
          ref={scrollContainerRef}
          className={`absolute inset-x-0 bottom-0 top-6 z-20 w-full rounded-b-lg bg-lined-paper p-4 shadow-lg text-black overflow-y-auto ${animationClass}`}>
          <AnimatePresence
            mode="wait"
            custom={direction}
            initial={false}
            onExitComplete={() => {
              if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
            }}>
            {activeTab && (
              <motion.div
                key={activeTab}
                custom={direction}
                variants={sectionVariants}
                initial="enter"
                animate="center"
                exit="exit">
                {activeTab === "About" && <AboutSection />}
                {activeTab === "Projects" && <ProjectsSection />}
                {activeTab === "Skills" && <SkillsSection />}
                {activeTab === "Contact" && <ContactSection />}
              </motion.div>
            )}
          </AnimatePresence>
          <ScrollHint targetRef={scrollContainerRef} activeTab={activeTab} nextLabel={nextLabel} />
        </div>
        {/* Front of the folder */}
        <div className="absolute inset-0 z-40 origin-bottom -skew-x-3 w-full rounded-lg bg-orange-200 p-4 shadow-lg">
          <StickerLabel text="Shivansh's Stuff" containerClassName=" -rotate-9 translate-y-1/2" />

          <ScotchedPhoto
            image={{ src: "/profile.jpg", width: 300, height: 300, alt: "Shivansh Gupta" }}
            containerClassName=" w-1/2 translate-y-1/3 translate-x-3/4 skew-x-3 rotate-12 z-20"
          />
        </div>

        {/* On the closed cover, nudge visitors to scroll in. */}
        {!activeTab && (
          <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center text-stone-500 dark:text-stone-200">
            <span className="font-kalam text-base md:text-lg">scroll to explore</span>
            <ChevronsDown size={22} strokeWidth={2} className="animate-bounce" />
          </div>
        )}

        <div className="fixed bottom-3 left-0 right-0 z-[120] flex items-center justify-center gap-4 text-stone-700 dark:text-white pointer-events-none">
          <span className="pointer-events-auto">Shivansh Gupta</span>
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
