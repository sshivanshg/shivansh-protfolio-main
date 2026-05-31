"use client";

import { useEffect, useRef, useState } from "react";

// Walk up the DOM to find the scrollable ancestor (the folder's document panel),
// so the IntersectionObserver watches the right viewport — not the window.
function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  let el: HTMLElement | null = node?.parentElement ?? null;
  while (el) {
    const overflowY = getComputedStyle(el).overflowY;
    if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") return el;
    el = el.parentElement;
  }
  return null;
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const Reveal: React.FC<RevealProps> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced-motion is handled in CSS via `motion-reduce:transition-none` — the
    // reveal still happens on scroll, just instantly with no movement.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          observer.disconnect(); // reveal once
        }
      },
      { root: getScrollParent(node), threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}>
      {children}
    </div>
  );
};

export default Reveal;
