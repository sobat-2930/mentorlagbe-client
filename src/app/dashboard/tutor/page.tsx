"use client";
import Link from "next/link";
import { ArrowRight, BookOpen, CircleCheck, Crown, Users } from "lucide-react";
import { useDashboardUser } from "@/components/dashboard/user-context";
import StatCard from "@/components/dashboard/StatCard";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { LoadError, PageSkeleton } from "@/components/dashboard/DataState";
import { buttonVariants } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { formatDate } from "@/lib/format";
import type { Application, Tuition } from "@/lib/types";
import { cn } from "@/lib/utils";

const FREE_LIMIT = 2;

export default function TutorOverview() {
  const user = useDashboardUser();
  const t = useApi<Tuition[]>("/api/tutor/tuitions");
  const a = useApi<Application[]>("/api/tutor/applicants");

  if (t.loading || a.loading) return <PageSkeleton />;
  if (t.error || a.error || !t.data || !a.data) {
    return <LoadError message={t.error || a.error} onRetry={() => { t.reload(); a.reload(); }} />;
  }

  const tuitions = t.data;
  const applicants = a.data;
  const live = tuitions.filter((x) => x.approvalStatus === "approved" && x.isActive).length;
  const pending = applicants.filter((x) => x.status === "pending");

  return (
    <>
      <PageHeader title={`Hello, ${user.name.split(" ")[0]}`} subtitle="Manage your tuitions and applicants from one place.">
        <Link href="/dashboard/tutor/post-tuition" className={cn(buttonVariants({ variant: "brand" }), "h-11 px-6")}>Post a Tuition</Link>
      </PageHeader>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Tuitions Posted" value={tuitions.length} icon={BookOpen} tone="primary" />
        <StatCard label="Active / Approved" value={live} icon={CircleCheck} tone="success" />
        <StatCard label="Applicants Received" value={applicants.length} icon={Users} tone="saffron" />
        <StatCard label="Current Plan" value={user.plan} icon={Crown} tone="coral" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="paper-card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-2xl text-primary">Pending applicants</h3>
            <Link href="/dashboard/tutor/applicants" className="flex items-center gap-1 text-sm font-semibold text-coral">
              Manage all <ArrowRight size={14} />
            </Link>
          </div>
          {pending.length === 0 ? (
            <p className="py-8 text-center text-sm text-foreground/60">No pending applicants right now.</p>
          ) : (
            <ul className="divide-y divide-border">
              {pending.slice(0, 4).map((x) => (
                <li key={x._id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-primary">{x.studentName}</p>
                    <p className="truncate text-sm text-foreground/60">{x.tuitionTitle} · {formatDate(x.appliedAt)}</p>
                  </div>
                  <StatusBadge status={x.status} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="paper-card p-6">
          <h3 className="flex items-center gap-2 font-display text-xl text-primary">
            <Crown size={18} className="text-secondary" /> {user.plan === "pro" ? "Pro Tutor" : "Free plan usage"}
          </h3>
          {user.plan === "pro" ? (
            <p className="mt-3 text-sm text-foreground/60">Unlimited posts and a verified badge are active on your account.</p>
          ) : (
            <>
              <p className="mt-3 text-sm text-foreground/60">{tuitions.length} of {FREE_LIMIT} free posts used.</p>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-secondary" style={{ width: `${Math.min(100, (tuitions.length / FREE_LIMIT) * 100)}%` }} />
              </div>
              <Link href="/pricing" className={cn(buttonVariants({ variant: "brand" }), "mt-5 h-11 w-full")}>Upgrade for $15</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}