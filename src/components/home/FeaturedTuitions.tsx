import Link from "next/link";
import { BookX } from "lucide-react";
import TuitionCard from "@/components/TuitionCard";
import { getLatestTuitions } from "@/lib/tuitions";
import type { Tuition } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// MongoDB theke 6 ta latest approved + active tuition
export default async function FeaturedTuitions() {
  const tuitions = await getLatestTuitions().catch((): Tuition[] => []);

  return (
    <section className="section bg-muted/60">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Fresh listings</span>
            <h2 className="section-title mt-4">Featured Tuitions</h2>
            <p className="section-sub">Hand-approved batches and 1-on-1 mentorships, ready to join this month.</p>
          </div>
          <Link href="/tuitions" className={cn(buttonVariants({ variant: "brand" }), "h-12 px-7")}>Browse All →</Link>
        </div>

        {tuitions.length === 0 ? (
          <div className="mt-12 text-center">
            <BookX className="mx-auto text-foreground/30" size={48} />
            <p className="mt-3 text-foreground/60">No tuitions available right now. Please check back soon.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {tuitions.map((t) => <TuitionCard key={t._id} t={t} />)}
          </div>
        )}
      </div>
    </section>
  );
}