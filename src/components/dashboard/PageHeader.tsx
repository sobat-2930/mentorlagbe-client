export default function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-display text-3xl font-semibold text-primary sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-1 text-foreground/60">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}