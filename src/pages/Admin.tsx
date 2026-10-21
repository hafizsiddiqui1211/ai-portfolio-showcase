import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-submissions`, {
        headers: {
          "x-admin-key": passcode,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not load submissions.");
        return;
      }
      setSubmissions(data.submissions ?? []);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Home
          </Link>
        </Button>

        {!submissions ? (
          <Card className="shadow-custom-lg border-border max-w-md mx-auto">
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
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
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
              <Card key={s.id} className="shadow-custom-md border-border">
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
                    <a href={`mailto:${s.email}`} className="text-accent hover:underline">
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
