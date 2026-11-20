"use client";
import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CircleCheck, Crown, Users } from "lucide-react";
import { useDashboardUser } from "@/components/dashboard/user-context";
import StatCard from "@/components/dashboard/StatCard";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { formatDate, seedApplicants, seedTutorTuitions } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export default function TutorOverview() {
  const user = useDashboardUser();
  const tuitions = useMemo(() => seedTutorTuitions(user), [user]);
  const applicants = useMemo(() => seedApplicants(tuitions), [tuitions]);
  const live = tuitions.filter((t) => t.approvalStatus === "approved" && t.isActive).length;
  const pending = applicants.filter((a) => a.status === "pending");
  const limit = 2;

  return (
    <>
      <PageHeader title={`Hello, ${user.name.split(" ")[0]}`} subtitle="Manage your tuitions and applicants from one place.">
        <Link href="/dashboard/tutor/post-tuition" className={cn(buttonVariants({ variant: "brand" }), "h-11 px-6")}>
          Post a Tuition
        </Link>
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
              {pending.slice(0, 4).map((a) => (
                <li key={a._id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-primary">{a.studentName}</p>
                    <p className="truncate text-sm text-foreground/60">{a.tuitionTitle} · {formatDate(a.appliedAt)}</p>
                  </div>
                  <StatusBadge status={a.status} />
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
              <p className="mt-3 text-sm text-foreground/60">{tuitions.length} of {limit} free posts used.</p>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-secondary" style={{ width: `${Math.min(100, (tuitions.length / limit) * 100)}%` }} />
              </div>
              <Link href="/pricing" className={cn(buttonVariants({ variant: "brand" }), "mt-5 h-11 w-full")}>
                Upgrade for $15
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}