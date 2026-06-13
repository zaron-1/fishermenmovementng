import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const FUNDING_GOAL = 305_000;

type Props = { variant?: "light" | "dark"; compact?: boolean };

export function FundingProgress({ variant = "light", compact = false }: Props) {
  const [raised, setRaised] = useState(0);

  useEffect(() => {
    supabase.rpc("get_public_stats").then(({ data }) => {
      if (data) setRaised(((data as { funds_raised: number }).funds_raised) || 0);
    });
  }, []);

  const pct = Math.min(100, (raised / FUNDING_GOAL) * 100);
  const remaining = Math.max(0, FUNDING_GOAL - raised);
  const dark = variant === "dark";

  return (
    <div className={`rounded-3xl border p-6 shadow-card ${dark ? "border-white/15 bg-white/10 text-white backdrop-blur-md" : "border-border bg-card"}`}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <div className={`flex items-center gap-2 text-xs uppercase tracking-widest ${dark ? "text-white/70" : "text-muted-foreground"}`}>
            <Target className="h-3.5 w-3.5" /> Pilot funding goal
          </div>
          <div className="mt-1 font-display text-2xl font-bold sm:text-3xl">
            ₦{raised.toLocaleString()}{" "}
            <span className={`text-base font-medium ${dark ? "text-white/70" : "text-muted-foreground"}`}>
              of ₦{FUNDING_GOAL.toLocaleString()}
            </span>
          </div>
        </div>
        <div className={`text-sm font-semibold ${dark ? "text-accent" : "text-primary"}`}>{pct.toFixed(1)}% funded</div>
      </div>
      <Progress value={pct} className="mt-4 h-3" />
      {!compact && (
        <div className={`mt-3 text-sm ${dark ? "text-white/80" : "text-muted-foreground"}`}>
          Remaining needed: <strong>₦{remaining.toLocaleString()}</strong>
        </div>
      )}
    </div>
  );
}
