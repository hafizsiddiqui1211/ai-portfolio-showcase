import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Bot, X, Send, Loader2, Square, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { backendConfig, isBackendConfigured } from "@/integrations/supabase/client";

const ChatAssistant = ({ initialOpen = false }: { initialOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: backendConfig ? `${backendConfig.url}/functions/v1/chat` : "/api/chat-unavailable",
        headers: backendConfig ? { apikey: backendConfig.publishableKey } : {},
        // Bound context independently of the rendered history; the edge validates again.
        prepareSendMessagesRequest: ({ messages }) => ({
          body: {
            messages: messages.slice(-5).map((message) => ({
              id: message.id,
              role: message.role,
              parts: [{ type: "text", text: message.parts
                .filter((part) => part.type === "text")
                .map((part) => part.text).join("\n").slice(0, 1500) }],
            })),
          },
        }),
      }),
    []
  );

  const { messages, sendMessage, status, stop, error, setMessages, clearError } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const close = () => {
    void stop();
    setIsOpen(false);
    toggleRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy || !isBackendConfigured || text.length > 1500) return;
    setInput("");
    void sendMessage({ text });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <div id="portfolio-chat" role="region" aria-label="AI assistant" onKeyDown={(e) => { if (e.key === "Escape") close(); }} className="w-[calc(100vw-2rem)] max-w-sm h-[540px] max-h-[75vh] glass rounded-2xl shadow-custom-lg flex flex-col overflow-hidden animate-fade-in">
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
              onClick={close}
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
                  {isBackendConfigured
                    ? "Hi! I'm Wildan's AI assistant. Ask me about his projects, skills, or how to work with him."
                    : "The AI assistant is unavailable in this preview. You can still explore the projects or contact Wildan by email."}
                </p>
                {!isBackendConfigured && <a className="text-sm text-accent underline" href="mailto:wildansiddiqui8@gmail.com">Email Wildan</a>}
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
              <div role="alert" className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                The assistant could not respond. Please try again later, or email Wildan directly.
              </div>
            )}
          </div>

          {messages.length > 0 && (
            <button type="button" disabled={busy} onClick={() => { setMessages([]); clearError(); inputRef.current?.focus(); }} className="mx-3 mb-2 inline-flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-50">
              <RotateCcw className="h-3 w-3" /> Clear conversation
            </button>
          )}
          {/* Composer */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-border flex items-end gap-2">
            <textarea
              ref={inputRef}
              maxLength={1500}
              disabled={!isBackendConfigured}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
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
              <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90 text-accent-foreground" aria-label="Send" disabled={!input.trim() || !isBackendConfigured}>
                <Send className="h-4 w-4" />
              </Button>
            )}
          </form>
        </div>
      )}

      <button
        ref={toggleRef}
        aria-expanded={isOpen}
        aria-controls="portfolio-chat"
        onClick={() => { if (isOpen) close(); else setIsOpen(true); }}
        className="h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-accent flex items-center justify-center transition-transform hover:scale-105"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default ChatAssistant;
