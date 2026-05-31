"use client";

import { useEffect, useState, type RefObject } from "react";
import { ChevronsDown } from "lucide-react";

interface ScrollHintProps {
  targetRef: RefObject<HTMLDivElement | null>;
  activeTab: string | null;
  nextLabel: string | null;
}

type Mode = "hidden" | "more" | "next";

// Bottom-of-panel cue. "more" = there's more to read in this section; "next" =
// you're at the end, scroll again to move to the next section.
const ScrollHint: React.FC<ScrollHintProps> = ({ targetRef, activeTab, nextLabel }) => {
  const [mode, setMode] = useState<Mode>("hidden");

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const update = () => {
      if (!activeTab) {
        setMode("hidden");
        return;
      }
      const scrollable = el.scrollHeight - el.clientHeight > 12;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 24;
      if (scrollable && !atBottom) setMode("more");
      else if (nextLabel) setMode("next");
      else setMode("hidden");
    };

    update();
    const settle = setTimeout(update, 500); // re-check once the open animation settles
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      clearTimeout(settle);
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [targetRef, activeTab, nextLabel]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none sticky bottom-2 z-20 -mt-9 flex justify-center transition-opacity duration-300 ${
        mode === "hidden" ? "opacity-0" : "opacity-100"
      }`}>
      <span className="flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 font-kalam text-sm text-stone-600 shadow-md ring-1 ring-stone-200 backdrop-blur-sm">
        {mode === "next" && nextLabel ? `Scroll for ${nextLabel}` : "Scroll"}
        <ChevronsDown size={16} className="animate-bounce" />
      </span>
    </div>
  );
};

export default ScrollHint;
