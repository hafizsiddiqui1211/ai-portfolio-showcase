import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Bot, X, Send, Loader2, Square } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      }),
    []
  );

  const { messages, sendMessage, status, stop, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    sendMessage({ text });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-[92vw] max-w-sm h-[540px] max-h-[75vh] glass rounded-2xl shadow-custom-lg flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-accent/20 bg-secondary/60">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-accent/15 text-accent">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-heading font-semibold leading-none">AI Assistant</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Ask about Wildan's work & skills</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center gap-3 px-4">
                <div className="p-3 rounded-2xl bg-accent/10 text-accent">
                  <Bot className="h-8 w-8" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Hi! I'm Wildan's AI assistant. Ask me about his projects, skills, or how to work with him.
                </p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  message.role === "user"
                    ? "ml-auto bg-accent text-accent-foreground"
                    : "bg-secondary text-foreground"
                )}
              >
                {message.parts
                  .filter((part) => part.type === "text")
                  .map((part, i) => (
                    <p key={i} className="whitespace-pre-wrap break-words">
                      {part.text}
                    </p>
                  ))}
              </div>
            ))}
            {busy && (
              <div className="flex items-center gap-2 text-muted-foreground text-xs px-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                thinking…
              </div>
            )}
            {error && (
              <div className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                {error.message || "Something went wrong. Please try again."}
              </div>
            )}
          </div>

          {/* Composer */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-border flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              rows={1}
              placeholder="Ask a question…"
              className="flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Message"
            />
            {busy ? (
              <Button type="button" size="icon" variant="outline" onClick={() => stop()} aria-label="Stop generating">
                <Square className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90 text-accent-foreground" aria-label="Send" disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            )}
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen((v) => !v)}
        className="h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-accent flex items-center justify-center transition-transform hover:scale-105"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default ChatAssistant;
