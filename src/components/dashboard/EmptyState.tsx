import type { LucideIcon } from "lucide-react";

export default function EmptyState({
  icon: Icon,
  title,
  text,
  children,
}: {
  icon: LucideIcon;
  title: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="paper-card grid place-items-center px-6 py-16 text-center">
      <Icon size={48} className="text-foreground/30" />
      <h3 className="mt-4 font-display text-2xl text-primary">{title}</h3>
      {text && <p className="mt-2 max-w-sm text-sm text-foreground/60">{text}</p>}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}