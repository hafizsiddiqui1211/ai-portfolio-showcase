import { lazy, Suspense, useEffect, useState } from "react";
import { Bot } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AmbientBackground from "./components/AmbientBackground";
import Home from "./pages/Home";
import { ease } from "./lib/motion";

// Route-level code splitting keeps the first load small.
const Skills = lazy(() => import("./pages/Skills"));
const Projects = lazy(() => import("./pages/Projects"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const ContactSuccess = lazy(() => import("./pages/ContactSuccess"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Playground = lazy(() => import("./pages/Playground"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ChatAssistant = lazy(() => import("./components/ChatAssistant"));

// Load the chat SDK and backend client only when the visitor opens the assistant.
const ChatEntry = () => {
  const [requested, setRequested] = useState(false);
  const launcher = <button type="button" onClick={() => setRequested(true)} disabled={requested}
    aria-label={requested ? "Loading AI assistant" : "Open AI assistant"}
    className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-accent transition-transform hover:scale-105 sm:bottom-6 sm:right-6">
    <Bot className="h-6 w-6" />
  </button>;
  return requested ? <Suspense fallback={launcher}><ChatAssistant initialOpen /></Suspense> : launcher;
};

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }), [pathname]);
  return null;
};

const Fallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        id="main"
        tabIndex={-1}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease }}
      >
        <Suspense fallback={<Fallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/success" element={<ContactSuccess />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.main>
    </AnimatePresence>
  );
};

const App = () => (
  <MotionConfig reducedMotion="user">
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <AmbientBackground />
        <ScrollToTop />
        <Navigation />
        <AnimatedRoutes />
        <Footer />
        <ChatEntry />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </MotionConfig>
);

export default App;
