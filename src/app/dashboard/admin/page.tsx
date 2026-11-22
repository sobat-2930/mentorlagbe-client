"use client";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, CircleCheck, GraduationCap, Hourglass, Users } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import PageHeader from "@/components/dashboard/PageHeader";
import { LoadError, PageSkeleton } from "@/components/dashboard/DataState";
import { useApi } from "@/hooks/useApi";
import { formatDate } from "@/lib/format";
import type { AdminStats, Payment } from "@/lib/types";

export default function AdminOverview() {
  const s = useApi<AdminStats>("/api/admin/stats");
  const p = useApi<Payment[]>("/api/admin/payments");

  if (s.loading || p.loading) return <PageSkeleton />;
  if (s.error || p.error || !s.data || !p.data) {
    return <LoadError message={s.error || p.error} onRetry={() => { s.reload(); p.reload(); }} />;
  }

  const stats = s.data;
  const total = stats.totalTuitions || 1;
  const bars = [
    { label: "Approved", value: stats.approvedTuitions, color: "bg-success" },
    { label: "Pending", value: stats.pendingTuitions, color: "bg-secondary" },
    { label: "Rejected", value: stats.rejectedTuitions, color: "bg-destructive" },
  ];

  return (
    <>
      <PageHeader title="Platform overview" subtitle="Live snapshot of users, tuitions and revenue." />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Users" value={stats.totalUsers} icon={Users} tone="primary" />
        <StatCard label="Total Tutors" value={stats.totalTutors} icon={GraduationCap} tone="coral" />
        <StatCard label="Pending Tuitions" value={stats.pendingTuitions} icon={Hourglass} tone="saffron" />
        <StatCard label="Approved Tuitions" value={stats.approvedTuitions} icon={CircleCheck} tone="success" />
        <StatCard label="Stripe Revenue" value={`$${stats.totalRevenue}`} icon={BadgeDollarSign} tone="primary" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="paper-card p-6">
          <h3 className="font-display text-2xl text-primary">Pending vs Approved</h3>
          <div className="mt-5 flex h-4 overflow-hidden rounded-full bg-muted">
            {bars.map((b) => (
              <div key={b.label} className={b.color} style={{ width: `${(b.value / total) * 100}%` }} />
            ))}
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            {bars.map((b) => (
              <li key={b.label} className="flex items-center justify-between">
                <span className="flex items-center gap-2.5"><span className={`h-3 w-3 rounded-full ${b.color}`} /> {b.label}</span>
                <span className="font-bold text-primary">{b.value}</span>
              </li>
            ))}
          </ul>
          <Link href="/dashboard/admin/tuitions" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-coral">
            Review tuitions <ArrowRight size={14} />
          </Link>
        </div>

        <div className="paper-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-2xl text-primary">Recent transactions</h3>
            <Link href="/dashboard/admin/transactions" className="flex items-center gap-1 text-sm font-semibold text-coral">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          {p.data.length === 0 ? (
            <p className="py-8 text-center text-sm text-foreground/60">No transactions yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {p.data.slice(0, 4).map((x) => (
                <li key={x._id} className="flex items-center justify-between gap-3 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-primary">{x.userName}</p>
                    <p className="text-xs text-foreground/50">{x.planName} · {formatDate(x.paidAt)}</p>
                  </div>
                  <span className="font-display text-lg text-success">+${x.amount}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}