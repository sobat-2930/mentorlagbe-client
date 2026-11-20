"use client";
import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, CircleCheck, GraduationCap, Hourglass, Users } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import PageHeader from "@/components/dashboard/PageHeader";
import { formatDate, mockPayments, mockUsers, seedAdminTuitions } from "@/lib/dashboard-data";

export default function AdminOverview() {
  const tuitions = useMemo(() => seedAdminTuitions(), []);
  const pending = tuitions.filter((t) => t.approvalStatus === "pending").length;
  const approved = tuitions.filter((t) => t.approvalStatus === "approved").length;
  const rejected = tuitions.filter((t) => t.approvalStatus === "rejected").length;
  const revenue = mockPayments.reduce((sum, p) => sum + p.amount, 0);
  const tutors = mockUsers.filter((u) => u.role === "tutor").length;
  const total = tuitions.length;

  const bars = [
    { label: "Approved", value: approved, color: "bg-success" },
    { label: "Pending", value: pending, color: "bg-secondary" },
    { label: "Rejected", value: rejected, color: "bg-destructive" },
  ];

  return (
    <>
      <PageHeader title="Platform overview" subtitle="Live snapshot of users, tuitions and revenue." />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Users" value={mockUsers.length} icon={Users} tone="primary" />
        <StatCard label="Total Tutors" value={tutors} icon={GraduationCap} tone="coral" />
        <StatCard label="Pending Tuitions" value={pending} icon={Hourglass} tone="saffron" />
        <StatCard label="Approved Tuitions" value={approved} icon={CircleCheck} tone="success" />
        <StatCard label="Stripe Revenue" value={`$${revenue}`} icon={BadgeDollarSign} tone="primary" />
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
                <span className="flex items-center gap-2.5">
                  <span className={`h-3 w-3 rounded-full ${b.color}`} /> {b.label}
                </span>
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
          <ul className="divide-y divide-border">
            {[...mockPayments].reverse().slice(0, 4).map((p) => (
              <li key={p._id} className="flex items-center justify-between gap-3 py-3.5">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-primary">{p.userName}</p>
                  <p className="text-xs text-foreground/50">{p.planName} · {formatDate(p.paidAt)}</p>
                </div>
                <span className="font-display text-lg text-success">+${p.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}