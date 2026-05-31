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

  // Section deck: when the inner panel is scrolled to an edge, the next wheel/touch
  // gesture advances (or retreats) a tab. Listeners live on the scroll panel so
  // wheel works anywhere over the folder, not only where the paper peeks through.
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const EDGE_TOL = 12; // px slack for treating the panel as scrolled to an edge
    const SWIPE_MIN = 48; // min touch travel (px) to count as a deliberate swipe
    const STEP_INTENT = 90; // accumulated wheel delta a gesture must exert AT an edge to cross
    const GESTURE_GAP = 160; // ms of quiet that separates one gesture / momentum train from the next
    const SETTLE_AFTER_STEP = 600; // ms floor between section changes, regardless of input

    // Wheel intent state. `armed` is the crux of the momentum fix: a gesture is
    // only allowed to cross a section boundary if it was a fresh gesture that
    // began at the edge. A train that started by scrolling content gets
    // disarmed, so when its leftover momentum coasts into the edge it can NOT
    // auto-advance — the reader has to make a separate, deliberate flick.
    let intent = 0;
    let lastWheelTs = 0;
    let lockedUntil = 0;
    let armed = true;

    const atTop = () => el.scrollTop <= EDGE_TOL;
    const atBottom = () => el.scrollHeight - el.clientHeight - el.scrollTop <= EDGE_TOL;

    // Perform the actual section change. Returns true if a step happened.
    const stepTo = (direction: "next" | "prev") => {
      const { activeTab: current, isAnimating: animating } = stateRef.current;
      if (animating) return false;

      const idx = current ? TAB_ORDER.indexOf(current) : -1;

      if (!current) {
        if (direction === "next") {
          animateToTab(TAB_ORDER[0]);
          return true;
        }
        return false;
      }
      if (direction === "next" && idx < TAB_ORDER.length - 1) {
        animateToTab(TAB_ORDER[idx + 1]);
        return true;
      }
      if (direction === "prev" && idx > 0) {
        animateToTab(TAB_ORDER[idx - 1]);
        return true;
      }
      return false;
    };

    const commitStep = (direction: "next" | "prev", now: number) => {
      if (now < lockedUntil) return;
      if (stepTo(direction)) {
        lockedUntil = now + SETTLE_AFTER_STEP;
        armed = false; // this train is spent; momentum can't trigger a second step
        intent = 0;
      }
    };

    const onWheel = (e: WheelEvent) => {
      const now = Date.now();

      // A pause longer than GESTURE_GAP ends the previous momentum train and
      // begins a new, deliberate gesture — re-arm and start a fresh tally.
      if (now - lastWheelTs > GESTURE_GAP) {
        intent = 0;
        armed = true;
      }
      lastWheelTs = now;

      if (Math.abs(e.deltaY) < 2) return;

      const { activeTab: current } = stateRef.current;
      const goingDown = e.deltaY > 0;

      // Closed cover: only a deliberate downward push opens the first section.
      if (!current) {
        if (!goingDown) return;
        e.preventDefault();
        if (!armed) return;
        intent += e.deltaY;
        if (intent >= STEP_INTENT) commitStep("next", now);
        return;
      }

      const atEdge = (goingDown && atBottom()) || (!goingDown && atTop());

      // Still content to reveal in the travel direction: let the panel scroll
      // natively and forfeit this train's right to cross when it reaches the
      // edge. Don't preventDefault here, or the inner scroll would be killed.
      if (!atEdge) {
        intent = 0;
        armed = false;
        return;
      }

      // At the edge: take over for section navigation.
      e.preventDefault();
      if (!armed) return;
      intent += e.deltaY;
      if (Math.abs(intent) >= STEP_INTENT) commitStep(goingDown ? "next" : "prev", now);
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length !== 1) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < SWIPE_MIN) return; // each swipe is already a deliberate, discrete gesture

      const now = Date.now();
      const { activeTab: current } = stateRef.current;
      if (!current) {
        if (deltaY > 0) commitStep("next", now);
        return;
      }

      if (deltaY > 0 && atBottom()) commitStep("next", now);
      else if (deltaY < 0 && atTop()) commitStep("prev", now);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [animateToTab]);

  const activeIdx = activeTab ? TAB_ORDER.indexOf(activeTab) : -1;
  const nextLabel = activeTab && activeIdx < TAB_ORDER.length - 1 ? TAB_ORDER[activeIdx + 1] : null;

  return (
    // The screen is the positioning context for our centered div.
    <div className="relative h-[100dvh] min-h-screen bg-sky-50 dark:bg-stone-600">
      <div
        ref={folderContainerRef}
        className="absolute top-0 bottom-0 left-0 right-0 m-auto z-100 w-[80vw] h-[60vw] max-w-[106.67vh] max-h-[80vh] max-sm:w-[94vw] max-sm:h-[78dvh] max-sm:max-w-none max-sm:max-h-none">
        {/* Tabs over the folder */}
        <nav className="absolute right-0 z-20 h-1/6 w-2/3 -translate-y-2/3 lg:-translate-y-1/2 max-sm:w-full max-sm:-translate-y-[55%]">
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
          className={`absolute inset-x-0 bottom-0 top-6 z-20 w-full rounded-b-lg bg-lined-paper p-4 shadow-lg text-black overflow-y-auto overscroll-y-contain touch-pan-y [-webkit-overflow-scrolling:touch] max-sm:p-3 max-sm:pb-16 ${animationClass}`}>
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
        {/* Front of the folder — pointer-events-none so wheel/touch reach the paper panel */}
        <div className="pointer-events-none absolute inset-0 z-40 origin-bottom -skew-x-3 w-full rounded-lg bg-orange-200 p-4 shadow-lg">
          <StickerLabel
            text="Shivansh's Stuff"
            containerClassName="pointer-events-auto -rotate-9 translate-y-1/2 max-sm:translate-y-1/4"
          />

          <ScotchedPhoto
            image={{ src: "/profile.jpg", width: 300, height: 300, alt: "Shivansh Gupta" }}
            containerClassName="pointer-events-auto w-1/2 translate-y-1/3 translate-x-3/4 skew-x-3 rotate-12 z-20 max-sm:w-[52%] max-sm:translate-x-[55%]"
          />
        </div>

        {/* On the closed cover, nudge visitors to scroll in. */}
        {!activeTab && (
          <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center text-stone-500 dark:text-stone-200">
            <span className="font-kalam text-base md:text-lg">scroll to explore</span>
            <ChevronsDown size={22} strokeWidth={2} className="animate-bounce" />
          </div>
        )}

        <div className="fixed bottom-3 left-0 right-0 z-[120] flex items-center justify-center gap-4 text-stone-700 dark:text-white pointer-events-none max-sm:flex-wrap max-sm:gap-2 max-sm:px-3 max-sm:pb-[max(0.75rem,env(safe-area-inset-bottom))] max-sm:text-sm">
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
