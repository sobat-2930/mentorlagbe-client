"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { BookOpen, Pencil, Trash2 } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import ConfirmModal from "@/components/dashboard/ConfirmModal";
import Modal from "@/components/dashboard/Modal";
import TuitionForm, { type TuitionFormValues } from "@/components/dashboard/TuitionForm";
import { LoadError, PageSkeleton } from "@/components/dashboard/DataState";
import { buttonVariants } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";
import { subjectGradients } from "@/lib/tuitions";
import type { Tuition } from "@/lib/types";
import { cn } from "@/lib/utils";

const toForm = (t: Tuition): TuitionFormValues => ({
  title: t.title,
  subject: t.subject,
  classLevel: t.classLevel,
  mode: t.mode,
  location: t.location,
  monthlyFee: String(t.monthlyFee),
  daysPerWeek: String(t.daysPerWeek),
  description: t.description,
  bannerImage: t.bannerImage ?? "",
});

export default function MyTuitionsPage() {
  const { data: tuitions, setData, loading, error, reload } = useApi<Tuition[]>("/api/tutor/tuitions");
  const [editing, setEditing] = useState<Tuition | null>(null);
  const [deleting, setDeleting] = useState<Tuition | null>(null);

  if (loading) return <PageSkeleton />;
  if (error || !tuitions) return <LoadError message={error} onRetry={reload} />;

  const toggleActive = async (t: Tuition) => {
    try {
      const r = await api<{ isActive: boolean }>(`/api/tutor/tuitions/${t._id}/status`, {
        method: "PATCH",
        body: { isActive: !t.isActive },
      });
      setData((prev) => (prev ? prev.map((x) => (x._id === t._id ? { ...x, isActive: r.isActive } : x)) : prev));
      toast.success(r.isActive ? "Tuition is active again" : "Tuition closed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update status");
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      await api(`/api/tutor/tuitions/${deleting._id}`, { method: "DELETE" });
      setData((prev) => (prev ? prev.filter((x) => x._id !== deleting._id) : prev));
      toast.success("Tuition deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete tuition");
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = async (v: TuitionFormValues) => {
    if (!editing) return;
    try {
      const updated = await api<Tuition>(`/api/tutor/tuitions/${editing._id}`, {
        method: "PUT",
        body: { ...v, bannerImage: v.bannerImage.startsWith("blob:") ? editing.bannerImage ?? "" : v.bannerImage },
      });
      setData((prev) => (prev ? prev.map((x) => (x._id === updated._id ? updated : x)) : prev));
      toast.success("Tuition updated");
      setEditing(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update tuition");
    }
  };

  return (
    <>
      <PageHeader title="My Tuitions" subtitle="Edit, close or delete the tuitions you have posted.">
        <Link href="/dashboard/tutor/post-tuition" className={cn(buttonVariants({ variant: "brand" }), "h-11 px-6")}>Post New</Link>
      </PageHeader>

      {tuitions.length === 0 ? (
        <EmptyState icon={BookOpen} title="No tuitions yet" text="Post your first tuition to start receiving applicants.">
          <Link href="/dashboard/tutor/post-tuition" className={cn(buttonVariants({ variant: "brand" }), "h-11 px-6")}>Post a Tuition</Link>
        </EmptyState>
      ) : (
        <div className="space-y-4">
          {tuitions.map((t) => (
            <article key={t._id} className="paper-card flex flex-col gap-5 p-5 md:flex-row md:items-center">
              {t.bannerImage ? (
                <img src={t.bannerImage} alt={t.title} className="h-28 w-full shrink-0 rounded-2xl object-cover md:h-20 md:w-32" />
              ) : (
                <div className={cn("h-28 w-full shrink-0 rounded-2xl bg-gradient-to-br md:h-20 md:w-32", subjectGradients[t.subject] || "from-primary to-primary")} />
              )}

              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-semibold text-primary">{t.title}</h3>
                <p className="mt-1 text-sm text-foreground/60">
                  {t.subject} · {t.classLevel} · {t.mode} · <span className="font-semibold text-coral">৳{t.monthlyFee}/mo</span>
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <StatusBadge status={t.approvalStatus} />
                  <StatusBadge status={t.isActive ? "active" : "closed"} />
                </div>
              </div>

              <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-3 lg:flex-row lg:items-center">
                <button
                  role="switch"
                  aria-checked={t.isActive}
                  aria-label="Toggle active status"
                  onClick={() => toggleActive(t)}
                  className={cn("relative h-7 w-12 shrink-0 rounded-full transition", t.isActive ? "bg-success" : "bg-foreground/25")}
                >
                  <span className={cn("absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all", t.isActive ? "left-6" : "left-1")} />
                </button>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(t)} aria-label="Edit" className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-white hover:bg-muted">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => setDeleting(t)} aria-label="Delete" className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-white text-destructive hover:bg-destructive/10">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit tuition" className="max-w-3xl">
        {editing && (
          <TuitionForm key={editing._id} initial={toForm(editing)} submitLabel="Save Changes" onSubmit={handleEdit} onCancel={() => setEditing(null)} />
        )}
      </Modal>

      <ConfirmModal
        open={!!deleting}
        title="Delete this tuition?"
        message={`“${deleting?.title ?? ""}” and its applicants will be removed permanently.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onClose={() => setDeleting(null)}
      />
    </>
  );
}