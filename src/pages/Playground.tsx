import { useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import { FlaskConical, Play, Square, Loader2, RotateCcw } from "lucide-react";
import { backendConfig, backendHeaders } from "@/integrations/supabase/client";

const PRESETS = [
  {
    name: "Prompt Optimizer",
    prompt:
      "You are a senior prompt engineer. The user gives you a rough prompt or instruction. Rewrite it into a clear, structured production prompt with: a role, an explicit output contract, constraints, and one worked example. Return only the improved prompt.",
  },
  {
    name: "Code Reviewer",
    prompt:
      "You are a meticulous Python code reviewer. For the code the user provides, list concrete issues in three buckets: correctness, readability, and performance. Be specific and brief; suggest a fix for each issue. If the code is fine, say so plainly.",
  },
  {
    name: "Agent Planner",
    prompt:
      "You are an agentic workflow architect. Given a task description, propose a minimal agent design: which tools it needs (maximum three), when it should hand off to a specialist, what guardrails to enforce, and what failure modes to expect. Keep it under 150 words.",
  },
];

const Playground = () => {
  const [systemPrompt, setSystemPrompt] = useState(PRESETS[0].prompt);
  const [userInput, setUserInput] = useState("");

  // The latest prompt is read inside the request callback via a mutable holder (never during render).
  const promptHolder = useRef(PRESETS[0].prompt);
  const transport = useMemo(
    () =>
      // eslint-disable-next-line react-hooks/refs -- ref is only read inside the request callback, never during render
      new DefaultChatTransport({
        api: backendConfig ? `${backendConfig.url}/functions/v1/chat` : "/unavailable",
        headers: backendHeaders,
        prepareSendMessagesRequest: ({ messages }) => ({
          body: {
            mode: "playground",
            systemPrompt: promptHolder.current,
            messages: messages.slice(-5).map((message) => ({
              id: message.id,
              role: message.role,
              parts: [{ type: "text", text: message.parts.filter(part => part.type === "text").map(part => part.text).join("\n").slice(0, 1500) }],
            })),
          },
        }),
      }),
    []
  );

  const { messages, sendMessage, status, stop, error, setMessages, clearError } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  const run = (e: React.FormEvent) => {
    e.preventDefault();
    const text = userInput.trim();
    if (!text || busy || !backendConfig) return;
    setUserInput("");
    void sendMessage({ text }).catch(() => setUserInput(text));
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      <Seo
        title="Prompt Playground — Explore AI Instructions"
        description="Explore prompt optimization, code review and agent planning examples by Hafiz Wildan Siddiqui. Live responses are available when the backend is configured."
        path="/playground"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow="// playground" title="Prompt Playground" subtitle="Explore prompt optimization, code review and agent planning. Edit an example and try a response when the assistant is available." />

        {!backendConfig && (
          <p role="status" className="mx-auto mb-8 max-w-6xl rounded-xl border border-accent/20 bg-accent/5 p-4 text-sm text-muted-foreground">
            Live responses are unavailable in this preview. You can explore and edit the prompt examples below.
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left: system prompt + presets */}
          <div className="space-y-6 animate-fade-up">
            <Card className="glass border-white/10 shadow-custom-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-accent" />
                  System Prompt
                </CardTitle>
                <CardDescription>This instruction shapes the assistant's behavior.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => (
                    <Button
                      key={preset.name}
                      size="sm"
                      variant="outline"
                      disabled={busy}
                      onClick={() => {
                        setSystemPrompt(preset.prompt);
                        promptHolder.current = preset.prompt;
                        setMessages([]);
                        clearError();
                      }}
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="system-prompt">Edit the prompt</Label>
                  <Textarea
                    id="system-prompt"
                    value={systemPrompt}
                    onChange={(e) => {
                      setSystemPrompt(e.target.value);
                      promptHolder.current = e.target.value;
                    }}
                    rows={10}
                    maxLength={2000}
                    className="font-mono-code text-xs"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: conversation */}
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <Card className="glass border-white/10 shadow-custom-md h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">Response</CardTitle>
                  <CardDescription>{backendConfig ? "Responses stream as they are generated" : "Explore the prompt examples"}</CardDescription>
                </div>
                {messages.length > 0 && (
                  <Button size="sm" variant="ghost" disabled={busy} onClick={() => { setMessages([]); clearError(); }}>
                    <RotateCcw className="h-4 w-4 mr-1.5" />
                    Reset
                  </Button>
                )}
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <div className="flex-1 overflow-y-auto max-h-[380px] space-y-3 min-h-[200px]">
                  {messages.length === 0 && !busy && (
                    <div className="h-full flex items-center justify-center text-sm text-muted-foreground text-center px-4">
                      Pick a preset or write your own system prompt, then send a message below.
                    </div>
                  )}
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                        message.role === "user"
                          ? "bg-accent text-accent-foreground ml-8"
                          : "bg-secondary"
                      }`}
                    >
                      {message.parts
                        .filter((part) => part.type === "text")
                        .map((part, i) => (
                          <p key={i}>{part.text}</p>
                        ))}
                    </div>
                  ))}
                  {busy && (
                    <div className="flex items-center gap-2 text-muted-foreground text-xs px-2">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      running…
                    </div>
                  )}
                  {error && (
                    <div className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                      The response could not be completed. Please try again in a moment.
                    </div>
                  )}
                </div>

                <form onSubmit={run} className="flex items-end gap-2">
                  <Textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        run(e);
                      }
                    }}
                    rows={2}
                    maxLength={1500}
                    placeholder={systemPrompt.includes("code reviewer") ? "Paste your Python code…" : "Your message…"}
                    aria-label="User message"
                  />
                  {busy ? (
                    <Button type="button" size="icon" variant="outline" onClick={() => stop()} aria-label="Stop">
                      <Square className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={!backendConfig || !userInput.trim()} className="bg-accent hover:bg-accent/90 text-accent-foreground" aria-label="Run">
                      <Play className="h-4 w-4 mr-1.5" />
                      Run
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
