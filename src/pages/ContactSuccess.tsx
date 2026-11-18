import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import { ease } from "@/lib/motion";

const ContactSuccess = () => (
  <div className="flex min-h-screen items-center justify-center px-4 pb-16 pt-28">
    <Seo title="Message received" description="Thanks for reaching out — your message has been received." path="/contact/success" noindex />
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="glass mx-auto max-w-lg rounded-3xl p-10 text-center"
    >
      <motion.svg viewBox="0 0 52 52" className="mx-auto mb-6 h-20 w-20 text-accent" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <motion.circle cx="26" cy="26" r="23" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease }} />
        <motion.path d="M15 27l8 8 14-16" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6, ease }} />
      </motion.svg>
      <h1 className="mb-3 text-3xl font-bold">Message Received!</h1>
      <p className="mb-8 text-muted-foreground">Thank you for reaching out. Your message has been saved, and I’ll reply using the email address you provided.</p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/contact" className="glass inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition hover:text-accent"><ArrowLeft className="mr-2 h-4 w-4" />Back to Contact</Link>
        <Link to="/" className="btn-sheen inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground"><Home className="mr-2 h-4 w-4" />Go to Home</Link>
      </div>
    </motion.div>
  </div>
);

export default ContactSuccess;
