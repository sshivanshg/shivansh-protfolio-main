"use client";

import { useEffect, useState, type RefObject } from "react";
import { ChevronsDown } from "lucide-react";

interface ScrollHintProps {
  targetRef: RefObject<HTMLDivElement | null>;
  // change this to force a re-check (e.g. the active tab) when content swaps
  watch?: unknown;
}

// A little "there's more below" indicator that sticks to the bottom of the
// document panel and fades out once you've scrolled to the end.
const ScrollHint: React.FC<ScrollHintProps> = ({ targetRef, watch }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const update = () => {
      const scrollable = el.scrollHeight - el.clientHeight > 12;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 24;
      setShow(scrollable && !atBottom);
    };

    update();
    const settle = setTimeout(update, 500); // re-check after the open animation settles
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      clearTimeout(settle);
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [targetRef, watch]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none sticky bottom-2 z-20 -mt-9 flex justify-center transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}>
      <span className="animate-bounce rounded-full bg-white/85 p-1.5 shadow-md ring-1 ring-stone-200 backdrop-blur-sm">
        <ChevronsDown size={20} className="text-stone-600" />
      </span>
    </div>
  );
};

export default ScrollHint;
