import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  primary: "bg-primary/10 text-primary",
  saffron: "bg-secondary/30 text-secondary-foreground",
  coral: "bg-coral/15 text-coral",
  success: "bg-success/15 text-success",
};

type Props = {
  label: string;
  value: React.ReactNode;
  icon: LucideIcon;
  tone?: keyof typeof tones;
  hint?: string;
};

export default function StatCard({ label, value, icon: Icon, tone = "primary", hint }: Props) {
  return (
    <div className="paper-card flex h-full items-center gap-4 p-5">
      <span className={cn("grid h-14 w-14 shrink-0 place-items-center rounded-2xl", tones[tone])}>
        <Icon size={26} />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-foreground/60">{label}</p>
        <p className="font-display text-3xl font-semibold capitalize text-primary">{value}</p>
        {hint && <p className="text-xs text-foreground/50">{hint}</p>}
      </div>
    </div>
  );
}