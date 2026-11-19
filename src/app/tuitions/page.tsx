import { Suspense } from "react";
import { SearchX } from "lucide-react";
import TuitionCard from "@/components/TuitionCard";
import TuitionFilters from "@/components/tuitions/TuitionFilters";
import Pagination from "@/components/tuitions/Pagination";
import { filterOptions, getTuitions } from "@/lib/tuitions";

type Props = { searchParams: Promise<Record<string, string | undefined>> };

export const metadata = { title: "Browse Tuitions — MentorLagbe" };

export default async function TuitionsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const { items, total, page, totalPages } = await getTuitions({
    search: sp.search,
    subject: sp.subject,
    classLevel: sp.classLevel,
    mode: sp.mode,
    page: Number(sp.page) || 1,
    limit: 6,
  });

  return (
    <>
      <section className="border-b border-border bg-muted/60 py-14">
        <div className="container-x">
          <span className="eyebrow">Browse</span>
          <h1 className="section-title mt-4">Find your perfect tuition</h1>
          <p className="section-sub">
            {total} approved {total === 1 ? "listing" : "listings"} match your search.
          </p>
        </div>
      </section>

      <section className="container-x py-12">
        <Suspense fallback={<div className="h-48 animate-pulse rounded-3xl bg-muted" />}>
          <TuitionFilters {...filterOptions} />
        </Suspense>

        {items.length === 0 ? (
          <div className="mt-16 text-center">
            <SearchX className="mx-auto text-foreground/30" size={56} />
            <h2 className="mt-4 font-display text-2xl text-primary">No tuitions found</h2>
            <p className="mt-2 text-foreground/60">Try a different keyword or clear some filters.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((t) => <TuitionCard key={t._id} t={t} />)}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} params={sp} />
      </section>
    </>
  );
}