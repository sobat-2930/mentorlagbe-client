import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  pending: "bg-secondary/30 text-[#7a5200]",
  accepted: "bg-success/15 text-success",
  approved: "bg-success/15 text-success",
  active: "bg-success/15 text-success",
  rejected: "bg-destructive/10 text-destructive",
  closed: "bg-muted text-foreground/60",
  free: "bg-muted text-foreground/70",
  pro: "bg-secondary text-secondary-foreground",
};

export default function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold capitalize",
        styles[status] ?? styles.closed,
        className
      )}
    >
      {status}
    </span>
  );
}