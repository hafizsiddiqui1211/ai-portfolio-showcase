import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/projects", label: "Projects" },
  { path: "/skills", label: "Skills" },
  { path: "/services", label: "Services" },
  { path: "/blog", label: "Blog" },
  { path: "/playground", label: "Playground" },
  { path: "/contact", label: "Contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    firstMobileLink.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuToggle.current?.focus();
      }
    };
    const media = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (media.matches) setIsOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onResize);
    };
  }, [isOpen]);

  const isActive = (path: string) => path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6" onBlur={(event) => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setIsOpen(false); }}>
      <motion.nav aria-label="Primary" initial={reduce ? false : { y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className={`relative mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border px-4 transition-colors duration-300 sm:px-5 ${scrolled || isOpen ? "border-white/10 bg-background/95 shadow-custom-md backdrop-blur-xl" : "border-white/[0.07] bg-background/70 backdrop-blur-md"}`}>
        <Link to="/" onClick={() => setIsOpen(false)} className="group flex shrink-0 items-center gap-2.5" aria-label="Hafiz Wildan Siddiqui — home">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/25 bg-accent/[0.06] font-heading text-sm font-semibold text-accent">hw.</span>
          <span className="font-heading text-base font-semibold tracking-tight">hafiz<span className="text-muted-foreground">.dev</span></span>
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => <li key={item.path}><Link to={item.path} aria-current={isActive(item.path) ? "page" : undefined} className={`relative inline-flex min-h-10 items-center rounded-lg px-3 text-xs font-medium transition-colors ${isActive(item.path) ? "bg-white/[0.06] text-foreground" : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground"}`}>{item.label}</Link></li>)}
        </ul>
        <a href="https://github.com/hafizsiddiqui1211" target="_blank" rel="noopener noreferrer" className="hidden min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs text-foreground/80 transition hover:border-accent/40 hover:text-accent xl:inline-flex">GitHub <ArrowUpRight className="h-3.5 w-3.5" /></a>
        <button ref={menuToggle} onClick={() => setIsOpen((open) => !open)} className="grid h-11 w-11 place-items-center rounded-lg transition hover:bg-white/5 lg:hidden" aria-label={isOpen ? "Close navigation" : "Open navigation"} aria-expanded={isOpen} aria-controls="mobile-navigation">{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        <motion.div aria-hidden style={{ scaleX: reduce ? scrollYProgress : progress }} className="absolute -bottom-px left-4 right-4 h-px origin-left bg-accent/60" />
      </motion.nav>
      <AnimatePresence>
        {isOpen && <motion.nav id="mobile-navigation" aria-label="Mobile" initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.18 }} className="mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-7xl overflow-y-auto rounded-2xl border border-white/10 bg-background/95 p-3 shadow-custom-lg backdrop-blur-xl lg:hidden"><ul>{navItems.map((item, index) => <li key={item.path}><Link ref={index === 0 ? firstMobileLink : undefined} to={item.path} onClick={() => setIsOpen(false)} aria-current={isActive(item.path) ? "page" : undefined} className={`flex min-h-12 items-center justify-between rounded-xl px-4 text-sm ${isActive(item.path) ? "bg-accent/[0.08] text-accent" : "text-foreground/80 hover:bg-white/5"}`}>{item.label}{isActive(item.path) && <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />}</Link></li>)}</ul></motion.nav>}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
