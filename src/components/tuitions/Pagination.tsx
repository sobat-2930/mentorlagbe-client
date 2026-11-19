import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { page: number; totalPages: number; params: Record<string, string | undefined> };

function pageList(page: number, total: number) {
  const pages = new Set([1, total, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | "...")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("...");
    out.push(p);
  });
  return out;
}

export default function Pagination({ page, totalPages, params }: Props) {
  if (totalPages <= 1) return null;

  const href = (p: number) => {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => v && k !== "page" && q.set(k, v));
    q.set("page", String(p));
    return `/tuitions?${q.toString()}`;
  };

  const base = "grid h-11 min-w-11 place-items-center rounded-full border border-border bg-white px-3 text-sm font-semibold transition";

  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={href(page - 1)} className={cn(base, "gap-1 hover:bg-muted")}>
          <span className="flex items-center gap-1"><ChevronLeft size={16} /> Previous</span>
        </Link>
      ) : (
        <span className={cn(base, "pointer-events-none opacity-40")}>
          <span className="flex items-center gap-1"><ChevronLeft size={16} /> Previous</span>
        </span>
      )}

      {pageList(page, totalPages).map((p, i) =>
        p === "..." ? (
          <span key={`d${i}`} className="px-1 text-foreground/50">…</span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(base, p === page ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted")}
          >
            {p}
          </Link>
        )
      )}

      {page < totalPages ? (
        <Link href={href(page + 1)} className={cn(base, "hover:bg-muted")}>
          <span className="flex items-center gap-1">Next <ChevronRight size={16} /></span>
        </Link>
      ) : (
        <span className={cn(base, "pointer-events-none opacity-40")}>
          <span className="flex items-center gap-1">Next <ChevronRight size={16} /></span>
        </span>
      )}
    </nav>
  );
}