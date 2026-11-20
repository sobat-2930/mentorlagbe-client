"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { BookOpen, Pencil, Trash2 } from "lucide-react";
import { useDashboardUser } from "@/components/dashboard/user-context";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import ConfirmModal from "@/components/dashboard/ConfirmModal";
import Modal from "@/components/dashboard/Modal";
import TuitionForm, { type TuitionFormValues } from "@/components/dashboard/TuitionForm";
import { buttonVariants } from "@/components/ui/button";
import { seedTutorTuitions } from "@/lib/dashboard-data";
import { subjectGradients, type Tuition } from "@/lib/mock-tuitions";
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
  const user = useDashboardUser();
  const [tuitions, setTuitions] = useState<Tuition[]>(() => seedTutorTuitions(user));
  const [editing, setEditing] = useState<Tuition | null>(null);
  const [deleting, setDeleting] = useState<Tuition | null>(null);

  const toggleActive = (id: string) => {
    // TODO (backend phase): PATCH /api/tuitions/:id/status
    setTuitions((prev) => prev.map((t) => (t._id === id ? { ...t, isActive: !t.isActive } : t)));
    const t = tuitions.find((x) => x._id === id);
    toast.success(t?.isActive ? "Tuition closed" : "Tuition is active again");
  };

  const handleDelete = () => {
    if (!deleting) return;
    // TODO (backend phase): DELETE /api/tuitions/:id
    setTuitions((prev) => prev.filter((t) => t._id !== deleting._id));
    toast.success("Tuition deleted");
    setDeleting(null);
  };

  const handleEdit = async (v: TuitionFormValues) => {
    if (!editing) return;
    // TODO (backend phase): PUT /api/tuitions/:id
    await new Promise((r) => setTimeout(r, 600));
    setTuitions((prev) =>
      prev.map((t) =>
        t._id === editing._id
          ? {
              ...t,
              title: v.title.trim(),
              subject: v.subject,
              classLevel: v.classLevel,
              mode: v.mode as "Online" | "Offline",
              location: v.location.trim(),
              monthlyFee: Number(v.monthlyFee),
              daysPerWeek: Number(v.daysPerWeek),
              description: v.description.trim(),
              bannerImage: v.bannerImage || undefined,
            }
          : t
      )
    );
    toast.success("Tuition updated");
    setEditing(null);
  };

  return (
    <>
      <PageHeader title="My Tuitions" subtitle="Edit, close or delete the tuitions you have posted.">
        <Link href="/dashboard/tutor/post-tuition" className={cn(buttonVariants({ variant: "brand" }), "h-11 px-6")}>
          Post New
        </Link>
      </PageHeader>

      {tuitions.length === 0 ? (
        <EmptyState icon={BookOpen} title="No tuitions yet" text="Post your first tuition to start receiving applicants.">
          <Link href="/dashboard/tutor/post-tuition" className={cn(buttonVariants({ variant: "brand" }), "h-11 px-6")}>
            Post a Tuition
          </Link>
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
                  onClick={() => toggleActive(t._id)}
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