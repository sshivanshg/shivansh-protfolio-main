// app/components/Monogram.tsx
// Initials avatar used as a placeholder until a real headshot is dropped in.

interface MonogramProps {
  initials?: string;
  className?: string;
  textClassName?: string;
}

const Monogram: React.FC<MonogramProps> = ({ initials = "SG", className = "", textClassName = "" }) => {
  return (
    <div
      className={`flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-500 via-indigo-500 to-emerald-500 ${className}`}>
      <span className={`font-permanent text-white leading-none select-none -rotate-3 ${textClassName}`}>
        {initials}
      </span>
    </div>
  );
};

export default Monogram;
