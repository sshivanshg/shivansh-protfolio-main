"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";
import Monogram from "./Monogram";

interface ScotchedPhotoProps {
  image?: ImageProps;
  containerClassName?: string;
}

const ScotchedPhoto: React.FC<ScotchedPhotoProps> = ({ image, containerClassName }) => {
  const [clickedScotches, setClickedScotches] = useState(new Set<number>());
  const [isFalling, setIsFalling] = useState(false);

  useEffect(() => {
    if (clickedScotches.size === 2) {
      // Add a small delay for the user to see the second click before it falls
      const timer = setTimeout(() => setIsFalling(true), 100);
      return () => clearTimeout(timer);
    }
  }, [clickedScotches]);

  const handleScotchClick = (scotchId: number) => {
    // Avoid re-adding if already clicked, and do nothing if it's already falling
    if (isFalling || clickedScotches.has(scotchId)) return;
    setClickedScotches((prev) => new Set(prev).add(scotchId));
  };

  const fallAnimationClasses =
    isFalling ? "transition-all duration-[1500ms] ease-in transform translate-y-[100vh] rotate-[30deg]" : "";

  return (
    <div className={`${containerClassName || ""} absolute`}>
      <div className={`${fallAnimationClasses} z-20`}>
        {image ? (
          <Image {...image} alt="Picture of the webmaster" className="relative w-full border-8 bg-white border-white" />
        ) : (
          <div className="relative w-full aspect-square border-8 bg-white border-white">
            <Monogram textClassName="text-[6vh] md:text-5xl" />
          </div>
        )}
        <div
          onClick={() => handleScotchClick(1)}
          className={`absolute bottom-0 -left-4 w-16 h-6 bg-white/50 transform rotate-45 backdrop-blur-sm cursor-pointer transition-opacity duration-300 ${
            clickedScotches.has(1) ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          onClick={() => handleScotchClick(2)}
          className={`absolute top-0 -right-4 w-16 h-6 bg-white/50 transform rotate-45 backdrop-blur-sm cursor-pointer transition-opacity duration-300 ${
            clickedScotches.has(2) ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
};

export default ScotchedPhoto;
