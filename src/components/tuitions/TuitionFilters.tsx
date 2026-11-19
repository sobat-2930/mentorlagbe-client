"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { subjects: string[]; classLevels: string[]; modes: string[] };

const selectClass =
  "h-12 w-full rounded-xl border border-input bg-white px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function TuitionFilters({ subjects, classLevels, modes }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const [search, setSearch] = useState(sp.get("search") ?? "");

  useEffect(() => {
    setSearch(sp.get("search") ?? "");
  }, [sp]);

  const update = (key: string, value: string) => {
    const p = new URLSearchParams(sp.toString());
    if (value && value !== "all") p.set(key, value);
    else p.delete(key);
    p.delete("page"); // filter change hole page 1 e jabe
    const qs = p.toString();
    router.push(qs ? `/tuitions?${qs}` : "/tuitions");
  };

  const hasFilters = ["search", "subject", "classLevel", "mode"].some((k) => sp.get(k));

  return (
    <div className="paper-card p-5 sm:p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          update("search", search.trim());
        }}
        className="flex items-center gap-2 rounded-full border border-border bg-white p-1.5 pl-5"
      >
        <Search size={18} className="shrink-0 text-foreground/40" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or subject…"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/40"
        />
        <Button type="submit" variant="brand" className="h-10 px-6">Search</Button>
      </form>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <select className={selectClass} value={sp.get("subject") ?? "all"} onChange={(e) => update("subject", e.target.value)} aria-label="Subject">
          <option value="all">All Subjects</option>
          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className={selectClass} value={sp.get("classLevel") ?? "all"} onChange={(e) => update("classLevel", e.target.value)} aria-label="Class level">
          <option value="all">All Class Levels</option>
          {classLevels.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className={selectClass} value={sp.get("mode") ?? "all"} onChange={(e) => update("mode", e.target.value)} aria-label="Mode">
          <option value="all">Online & Offline</option>
          {modes.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <Button
          type="button"
          variant="outline"
          disabled={!hasFilters}
          onClick={() => router.push("/tuitions")}
          className="h-12 rounded-xl"
        >
          <RotateCcw size={16} /> Reset
        </Button>
      </div>
    </div>
  );
}