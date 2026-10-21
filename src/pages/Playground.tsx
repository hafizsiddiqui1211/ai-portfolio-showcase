import { useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FlaskConical, Play, Square, Loader2, RotateCcw } from "lucide-react";

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
  const systemPromptRef = useRef(systemPrompt);
  const [userInput, setUserInput] = useState("");

  const transportRef = useRef(
    new DefaultChatTransport({
      api: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      prepareSendMessagesRequest: ({ messages }) => ({
        body: { mode: "playground", systemPrompt: systemPromptRef.current, messages },
      }),
    })
  );

  const { messages, sendMessage, status, stop, error, setMessages } = useChat({ transport: transportRef.current });
  const busy = status === "submitted" || status === "streaming";

  const run = (e: React.FormEvent) => {
    e.preventDefault();
    const text = userInput.trim();
    if (!text || busy) return;
    setUserInput("");
    sendMessage({ text });
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">Prompt Playground</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Write a system prompt, send a message, and watch the agent respond live — a working demo of prompt &
            context engineering
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left: system prompt + presets */}
          <div className="space-y-6 animate-fade-up">
            <Card className="shadow-custom-md border-border">
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
                      onClick={() => {
                        setSystemPrompt(preset.prompt);
                        systemPromptRef.current = preset.prompt;
                        setMessages([]);
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
                      systemPromptRef.current = e.target.value;
                    }}
                    rows={10}
                    className="font-mono-code text-xs"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: conversation */}
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <Card className="shadow-custom-md border-border h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">Response</CardTitle>
                  <CardDescription>Streaming live</CardDescription>
                </div>
                {messages.length > 0 && (
                  <Button size="sm" variant="ghost" onClick={() => setMessages([])}>
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
                      {error.message || "Something went wrong. Please try again."}
                    </div>
                  )}
                </div>

                <form onSubmit={run} className="flex items-end gap-2">
                  <Textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        run(e);
                      }
                    }}
                    rows={2}
                    placeholder={systemPromptRef.current.includes("code reviewer") ? "Paste your Python code…" : "Your message…"}
                    aria-label="User message"
                  />
                  {busy ? (
                    <Button type="button" size="icon" variant="outline" onClick={() => stop()} aria-label="Stop">
                      <Square className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground" aria-label="Run">
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
