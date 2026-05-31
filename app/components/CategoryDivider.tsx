// app/components/CategoryDivider.tsx
// A "file-divider tab" header used to group projects by category on the lined paper.

interface CategoryDividerProps {
  emoji: string;
  title: string;
  subtitle?: string;
  color?: string;
}

const CategoryDivider: React.FC<CategoryDividerProps> = ({ emoji, title, subtitle, color = "bg-blue-400" }) => {
  return (
    <div className="relative mt-10 mb-3 ml-1 flex flex-wrap items-end gap-x-4 gap-y-1">
      <span
        className={`inline-block font-permanent text-xl md:text-2xl text-stone-800 ${color} px-4 py-1 rounded-md -rotate-2 shadow-md`}>
        {emoji}&nbsp;{title}
      </span>
      {subtitle && <span className="font-kalam text-stone-500 text-base md:text-lg">{subtitle}</span>}
    </div>
  );
};

export default CategoryDivider;
