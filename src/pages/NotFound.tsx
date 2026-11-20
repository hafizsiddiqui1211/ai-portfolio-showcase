import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center px-4">
    <Seo title="404 — Page not found" description="The page you're looking for doesn't exist." path="/404" noindex />
    <div className="text-center">
      <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="text-gradient mb-4 text-8xl font-bold sm:text-9xl">
        404
      </motion.h1>
      <p className="mb-8 text-xl text-muted-foreground">This route doesn't exist — yet.</p>
      <Link to="/" className="btn-sheen inline-flex rounded-xl bg-accent px-6 py-3 font-medium text-accent-foreground shadow-accent">Return home</Link>
    </div>
  </div>
);

export default NotFound;
