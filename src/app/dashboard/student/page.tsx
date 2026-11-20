"use client";
import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, CircleCheck, ClipboardList, Crown, Hourglass } from "lucide-react";
import { useDashboardUser } from "@/components/dashboard/user-context";
import StatCard from "@/components/dashboard/StatCard";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { formatDate, seedStudentApplications } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export default function StudentOverview() {
  const user = useDashboardUser();
  const apps = useMemo(() => seedStudentApplications(user), [user]);
  const accepted = apps.filter((a) => a.status === "accepted").length;
  const pending = apps.filter((a) => a.status === "pending").length;

  return (
    <>
      <PageHeader title={`Welcome back, ${user.name.split(" ")[0]}`} subtitle="Here is a quick look at your learning journey." />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Applied Tuitions" value={apps.length} icon={ClipboardList} tone="primary" />
        <StatCard label="Accepted Applications" value={accepted} icon={CircleCheck} tone="success" />
        <StatCard label="Pending Applications" value={pending} icon={Hourglass} tone="saffron" />
        <StatCard label="Current Plan" value={user.plan} icon={Crown} tone="coral" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="paper-card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-2xl text-primary">Recent applications</h3>
            <Link href="/dashboard/student/my-applications" className="flex items-center gap-1 text-sm font-semibold text-coral">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {apps.slice(0, 4).map((a) => (
              <li key={a._id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-primary">{a.tuitionTitle}</p>
                  <p className="text-sm text-foreground/60">{a.tutorName} · applied {formatDate(a.appliedAt)}</p>
                </div>
                <StatusBadge status={a.status} />
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-primary p-6 text-primary-foreground">
            <h3 className="font-display text-2xl">Find your next tutor</h3>
            <p className="mt-2 text-sm text-primary-foreground/70">Browse approved tuitions by subject, class and mode.</p>
            <Link href="/tuitions" className={cn(buttonVariants({ variant: "saffron" }), "mt-5 h-11 px-6")}>
              Browse Tuitions
            </Link>
          </div>
          <div className="paper-card p-6">
            <h3 className="flex items-center gap-2 font-display text-xl text-primary">
              <Crown size={18} className="text-secondary" /> {user.plan === "pro" ? "You are on Pro" : "Upgrade to Pro"}
            </h3>
            <p className="mt-2 text-sm text-foreground/60">
              {user.plan === "pro"
                ? "Enjoy priority booking and early access to new batches."
                : "Get priority booking and early access to new batches for $10."}
            </p>
            {user.plan !== "pro" && (
              <Link href="/pricing" className={cn(buttonVariants({ variant: "outline" }), "mt-4 h-11 rounded-full px-6")}>
                See Pro Plan
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}