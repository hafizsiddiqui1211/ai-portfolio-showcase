import { useRef, type HTMLAttributes, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/** Card with a cursor-following glow (CSS vars --mx/--my drive .spotlight::before). */
const SpotlightCard = ({ className, onMouseMove, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    }
    onMouseMove?.(e);
  };
  return (
    <div ref={ref} onMouseMove={handleMove} className={cn("spotlight glow-border rounded-2xl bg-card/60", className)} {...props}>
      {children}
    </div>
  );
};

export default SpotlightCard;
