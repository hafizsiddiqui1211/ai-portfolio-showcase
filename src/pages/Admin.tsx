import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Seo from "@/components/Seo";
import { backendConfig, isBackendConfigured } from "@/integrations/supabase/client";
import { Inbox, KeyRound, Loader2, ArrowLeft } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const [passcode, setPasscode] = useState("");
  const [submissions, setSubmissions] = useState<Submission[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !backendConfig) return;
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${backendConfig.url}/functions/v1/admin-submissions`, {
        cache: "no-store",
        credentials: "omit",
        signal: AbortSignal.timeout(15000),
        headers: {
          "x-admin-key": passcode,
          apikey: backendConfig.publishableKey,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(res.status === 429 ? "Too many attempts. Try again in 15 minutes." : res.status === 401 ? "Invalid passcode." : "Could not load submissions. Please try again later.");
        return;
      }
      if (!Array.isArray(data.submissions) || !data.submissions.every((item: unknown) => {
        if (!item || typeof item !== "object") return false;
        return ["id", "name", "email", "subject", "message", "created_at"].every(
          (key) => key in item && typeof (item as Record<string, unknown>)[key] === "string"
        );
      })) throw new Error("Invalid response");
      setSubmissions(data.submissions);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPasscode("");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      <Seo title="Admin" description="Private area." path="/admin" noindex />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Home
          </Link>
        </Button>

        {!submissions ? (
          <Card className="glass shadow-custom-lg max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-accent" />
                Admin Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={load} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="passcode">Passcode</Label>
                  <Input
                    id="passcode"
                    type="password"
                    autoComplete="current-password"
                    maxLength={256}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    disabled={!isBackendConfigured || isLoading}
                    required
                  />
                </div>
                {!isBackendConfigured && <p role="status" className="text-sm text-muted-foreground">Admin access is unavailable in this preview.</p>}
                {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading || !isBackendConfigured}>
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Inbox className="h-4 w-4 mr-2" />}
                  Load Submissions
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-heading font-bold">Contact Submissions</h1>
              <Button variant="outline" size="sm" onClick={() => setSubmissions(null)}>
                Lock
              </Button>
            </div>
            {submissions.length === 0 && (
              <p className="text-muted-foreground text-sm">No submissions yet.</p>
            )}
            {submissions.map((s) => (
              <Card key={s.id} className="glass shadow-custom-md">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <CardTitle className="text-base">{s.subject}</CardTitle>
                    <span className="text-xs font-mono-code text-muted-foreground">
                      {new Date(s.created_at).toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-1">
                    <span className="font-medium">{s.name}</span> ·{" "}
                    <a href={`mailto:${encodeURIComponent(s.email)}`} className="text-accent hover:underline">
                      {s.email}
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{s.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
