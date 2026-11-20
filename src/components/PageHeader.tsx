import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

type Props = { eyebrow?: string; title: string; subtitle?: string };

const PageHeader = ({ eyebrow, title, subtitle }: Props) => {
  const reduce = useReducedMotion();
  const words = title.split(" ");
  return (
    <header className="text-center mb-14 sm:mb-16">
      {eyebrow && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="font-mono-code text-xs uppercase tracking-[0.25em] text-accent mb-4"
        >
          {eyebrow}
        </motion.p>
      )}
      <h1 className="text-4xl sm:text-6xl font-heading font-bold mb-5 leading-[1.05]">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.25em]">
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 * i, ease }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </h1>
      {subtitle && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
};

export default PageHeader;
