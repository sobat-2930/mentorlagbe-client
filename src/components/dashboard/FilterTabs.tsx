import { cn } from "@/lib/utils";

export type Tab = { value: string; label: string; count?: number };

export default function FilterTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: Tab[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.value}
          role="tab"
          aria-selected={active === t.value}
          onClick={() => onChange(t.value)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-semibold transition",
            active === t.value
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-white hover:bg-muted"
          )}
        >
          {t.label}
          {t.count !== undefined && <span className="ml-2 opacity-70">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}