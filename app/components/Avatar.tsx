// app/components/Avatar.tsx
// Circular profile avatar. Falls back to the SG monogram until a real photo exists.
//
// To use a real headshot: drop the file at `public/profile.jpg`, then set
// HAS_PHOTO = true below (and adjust PHOTO_SRC if you use a different name).

import Image from "next/image";
import Monogram from "./Monogram";

const HAS_PHOTO = true;
const PHOTO_SRC = "/profile.jpg";

interface AvatarProps {
  size?: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ size = 200, className = "" }) => {
  if (HAS_PHOTO) {
    return (
      <Image
        src={PHOTO_SRC}
        alt="Shivansh Gupta"
        width={size}
        height={size}
        className={`rounded-full object-cover object-[65%_38%] aspect-square ${className}`}
      />
    );
  }

  return (
    <div
      className={`rounded-full overflow-hidden aspect-square ${className}`}
      style={{ width: size, height: size }}>
      <Monogram textClassName="text-5xl md:text-6xl" />
    </div>
  );
};

export default Avatar;
