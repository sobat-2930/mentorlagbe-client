import Link from "next/link";
import TuitionCard from "@/components/TuitionCard";
import { mockTuitions } from "@/lib/mock-tuitions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FeaturedTuitions() {
  const tuitions = mockTuitions.slice(0, 6);
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
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {tuitions.map((t) => <TuitionCard key={t._id} t={t} />)}
        </div>
      </div>
    </section>
  );
}