"use client";
import { BadgeDollarSign, Receipt } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import { LoadError, PageSkeleton } from "@/components/dashboard/DataState";
import { useApi } from "@/hooks/useApi";
import { formatDate } from "@/lib/format";
import type { Payment } from "@/lib/types";

export default function TransactionsPage() {
  const { data: payments, loading, error, reload } = useApi<Payment[]>("/api/admin/payments");

  if (loading) return <PageSkeleton />;
  if (error || !payments) return <LoadError message={error} onRetry={reload} />;

  const revenue = payments.reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <PageHeader title="Transactions" subtitle="All Pro subscription payments received through Stripe." />

      <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:max-w-2xl">
        <StatCard label="Total Revenue" value={`$${revenue}`} icon={BadgeDollarSign} tone="success" />
        <StatCard label="Transactions" value={payments.length} icon={Receipt} tone="primary" />
      </div>

      {payments.length === 0 ? (
        <EmptyState icon={Receipt} title="No transactions yet" text="Payments will appear here after users upgrade to Pro." />
      ) : (
        <div className="paper-card overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-border bg-muted/60 text-xs uppercase tracking-wider text-foreground/60">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Plan</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Transaction ID</th>
                <th className="px-5 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payments.map((p) => (
                <tr key={p._id} className="hover:bg-muted/40">
                  <td className="px-5 py-4 font-semibold text-primary">{p.userName}</td>
                  <td className="px-5 py-4 text-foreground/70">{p.userEmail}</td>
                  <td className="px-5 py-4 capitalize">{p.userRole}</td>
                  <td className="px-5 py-4"><StatusBadge status="pro" className="mr-2" />{p.planName}</td>
                  <td className="px-5 py-4 font-bold text-success">${p.amount} {p.currency}</td>
                  <td className="px-5 py-4 font-mono text-xs text-foreground/70">{p.transactionId}</td>
                  <td className="px-5 py-4 text-foreground/70">{formatDate(p.paidAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}