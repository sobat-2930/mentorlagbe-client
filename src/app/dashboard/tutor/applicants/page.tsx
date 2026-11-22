"use client";
import { useState } from "react";
import { toast } from "sonner";
import { CalendarClock, Check, Mail, Phone, Users, X } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import FilterTabs from "@/components/dashboard/FilterTabs";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import { LoadError, PageSkeleton } from "@/components/dashboard/DataState";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { AppStatus, Application } from "@/lib/types";

export default function ApplicantsPage() {
  const { data: apps, setData, loading, error, reload } = useApi<Application[]>("/api/tutor/applicants");
  const [filter, setFilter] = useState("all");

  if (loading) return <PageSkeleton />;
  if (error || !apps) return <LoadError message={error} onRetry={reload} />;

  const count = (s: string) => apps.filter((a) => a.status === s).length;
  const visible = filter === "all" ? apps : apps.filter((a) => a.status === filter);

  const setStatus = async (id: string, status: AppStatus) => {
    try {
      await api(`/api/tutor/applicants/${id}`, { method: "PATCH", body: { status } });
      setData((prev) => (prev ? prev.map((a) => (a._id === id ? { ...a, status } : a)) : prev));
      toast.success(`Application ${status}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update application");
    }
  };

  return (
    <>
      <PageHeader title="Applicants" subtitle="Review students who applied to your tuitions." />

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
          <EmptyState icon={Users} title="No applicants here" text="Applicants will appear once students apply to your tuitions." />
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {visible.map((a) => (
            <article key={a._id} className="paper-card flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(a.studentName)}&backgroundColor=0f3d33&textColor=f4b63f`}
                    alt={a.studentName}
                    className="h-12 w-12 rounded-xl"
                  />
                  <div>
                    <p className="font-display text-lg font-semibold text-primary">{a.studentName}</p>
                    <p className="text-xs text-foreground/50">Applied {formatDate(a.appliedAt)}</p>
                  </div>
                </div>
                <StatusBadge status={a.status} />
              </div>

              <p className="mt-4 rounded-xl bg-muted px-4 py-2 text-sm font-semibold text-primary">{a.tuitionTitle}</p>

              <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                <li className="flex items-center gap-2.5 break-all"><Mail size={15} className="shrink-0" /> {a.studentEmail}</li>
                <li className="flex items-center gap-2.5"><Phone size={15} /> {a.studentPhone}</li>
                <li className="flex items-center gap-2.5"><CalendarClock size={15} /> {a.preferredSchedule}</li>
              </ul>

              <p className="mt-4 text-sm italic leading-relaxed text-foreground/70">“{a.studentNote}”</p>

              <div className="mt-auto flex gap-3 pt-6">
                <Button variant="brand" disabled={a.status === "accepted"} onClick={() => setStatus(a._id, "accepted")} className="h-11 flex-1">
                  <Check size={16} /> Accept
                </Button>
                <Button
                  variant="outline"
                  disabled={a.status === "rejected"}
                  onClick={() => setStatus(a._id, "rejected")}
                  className="h-11 flex-1 rounded-full text-destructive hover:text-destructive"
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