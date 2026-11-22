"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Check, ListChecks, X } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import FilterTabs from "@/components/dashboard/FilterTabs";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import { LoadError, PageSkeleton } from "@/components/dashboard/DataState";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { subjectGradients } from "@/lib/tuitions";
import type { Tuition } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function AdminTuitionsPage() {
  const { data: tuitions, setData, loading, error, reload } = useApi<Tuition[]>("/api/admin/tuitions");
  const [filter, setFilter] = useState("pending");

  if (loading) return <PageSkeleton />;
  if (error || !tuitions) return <LoadError message={error} onRetry={reload} />;

  const count = (s: string) => tuitions.filter((t) => t.approvalStatus === s).length;
  const visible = filter === "all" ? tuitions : tuitions.filter((t) => t.approvalStatus === filter);

  const decide = async (id: string, approvalStatus: "approved" | "rejected") => {
    try {
      await api(`/api/admin/tuitions/${id}/approval`, { method: "PATCH", body: { approvalStatus } });
      setData((prev) => (prev ? prev.map((t) => (t._id === id ? { ...t, approvalStatus } : t)) : prev));
      toast.success(`Tuition ${approvalStatus}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update tuition");
    }
  };

  return (
    <>
      <PageHeader title="Tuition Approval" subtitle="Only approved and active tuitions appear on the public Browse page." />

      <FilterTabs
        active={filter}
        onChange={setFilter}
        tabs={[
          { value: "pending", label: "Pending", count: count("pending") },
          { value: "approved", label: "Approved", count: count("approved") },
          { value: "rejected", label: "Rejected", count: count("rejected") },
          { value: "all", label: "All", count: tuitions.length },
        ]}
      />

      {visible.length === 0 ? (
        <div className="mt-8">
          <EmptyState icon={ListChecks} title="Nothing to review" text="No tuitions in this category right now." />
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {visible.map((t) => (
            <article key={t._id} className="paper-card flex flex-col gap-5 p-5 lg:flex-row lg:items-center">
              <div className={cn("h-24 w-full shrink-0 rounded-2xl bg-gradient-to-br lg:h-20 lg:w-32", subjectGradients[t.subject] || "from-primary to-primary")} />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-semibold text-primary">{t.title}</h3>
                  <StatusBadge status={t.approvalStatus} />
                </div>
                <p className="mt-1 text-sm text-foreground/60">
                  {t.subject} · {t.classLevel} · {t.mode} · <span className="font-semibold text-coral">৳{t.monthlyFee}/mo</span>
                </p>
                <p className="mt-1 text-sm text-foreground/60">
                  By {t.tutorName} ({t.tutorEmail}) · posted {formatDate(t.createdAt)}
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="brand" disabled={t.approvalStatus === "approved"} onClick={() => decide(t._id, "approved")} className="h-11 px-5">
                  <Check size={16} /> Approve
                </Button>
                <Button
                  variant="outline"
                  disabled={t.approvalStatus === "rejected"}
                  onClick={() => decide(t._id, "rejected")}
                  className="h-11 rounded-full px-5 text-destructive hover:text-destructive"
                >
                  <X size={16} /> Reject
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}