"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CalendarDays, ClipboardList, Mail, Trash2, UserRound, Wallet } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import FilterTabs from "@/components/dashboard/FilterTabs";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import ConfirmModal from "@/components/dashboard/ConfirmModal";
import { LoadError, PageSkeleton } from "@/components/dashboard/DataState";
import { Button, buttonVariants } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { Application } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function MyApplicationsPage() {
  const { data: apps, setData, loading, error, reload } = useApi<Application[]>("/api/applications/mine");
  const [filter, setFilter] = useState("all");
  const [toCancel, setToCancel] = useState<Application | null>(null);

  if (loading) return <PageSkeleton />;
  if (error || !apps) return <LoadError message={error} onRetry={reload} />;

  const count = (s: string) => apps.filter((a) => a.status === s).length;
  const visible = filter === "all" ? apps : apps.filter((a) => a.status === filter);

  const confirmCancel = async () => {
    if (!toCancel) return;
    try {
      await api(`/api/applications/${toCancel._id}`, { method: "DELETE" });
      setData((prev) => (prev ? prev.filter((a) => a._id !== toCancel._id) : prev));
      toast.success("Application cancelled");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not cancel application");
    } finally {
      setToCancel(null);
    }
  };

  return (
    <>
      <PageHeader title="My Applications" subtitle="Track every tuition you have applied to." />

      <FilterTabs
        active={filter}
        onChange={setFilter}
        tabs={[
          { value: "all", label: "All", count: apps.length },
          { value: "pending", label: "Pending", count: count("pending") },
          { value: "accepted", label: "Accepted", count: count("accepted") },
          { value: "rejected", label: "Rejected", count: count("rejected") },
        ]}
      />

      {visible.length === 0 ? (
        <div className="mt-8">
          <EmptyState icon={ClipboardList} title="No applications here" text="Applications you submit will show up in this list.">
            <Link href="/tuitions" className={cn(buttonVariants({ variant: "brand" }), "h-11 px-6")}>Browse Tuitions</Link>
          </EmptyState>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
          {visible.map((a) => (
            <article key={a._id} className="paper-card flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-semibold leading-snug text-primary">{a.tuitionTitle}</h3>
                <StatusBadge status={a.status} />
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-foreground/70">
                <li className="flex items-center gap-2.5"><UserRound size={15} /> {a.tutorName}</li>
                <li className="flex items-center gap-2.5 break-all"><Mail size={15} className="shrink-0" /> {a.tutorEmail}</li>
                <li className="flex items-center gap-2.5"><Wallet size={15} /> ৳{a.monthlyFee} / month</li>
                <li className="flex items-center gap-2.5"><CalendarDays size={15} /> Applied {formatDate(a.appliedAt)}</li>
              </ul>
              <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                <Link href={`/tuitions/${a.tuitionId}`} className="text-sm font-semibold text-coral">View tuition</Link>
                {a.status === "pending" ? (
                  <Button variant="outline" onClick={() => setToCancel(a)} className="h-10 rounded-full text-destructive hover:text-destructive">
                    <Trash2 size={15} /> Cancel
                  </Button>
                ) : (
                  <span className="text-xs text-foreground/50">Cannot cancel after a decision</span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!toCancel}
        title="Cancel application?"
        message={`Your application for “${toCancel?.tuitionTitle ?? ""}” will be removed. This cannot be undone.`}
        confirmLabel="Yes, cancel it"
        onConfirm={confirmCancel}
        onClose={() => setToCancel(null)}
      />
    </>
  );
}