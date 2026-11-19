"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CheckCircle2, Info, Loader2, LogIn } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"phone" | "preferredSchedule" | "studentNote", string>>;

export default function ApplyForm({ tuitionId, tuitionTitle }: { tuitionId: string; tuitionTitle: string }) {
  const { user, loading: sessionLoading } = useUser();
  const [form, setForm] = useState({ phone: "", preferredSchedule: "", studentNote: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  if (sessionLoading) return <div className="h-40 animate-pulse rounded-2xl bg-muted" />;

  // 1) Logged out
  if (!user) {
    return (
      <div className="rounded-2xl bg-muted p-5 text-center">
        <LogIn className="mx-auto text-primary" />
        <p className="mt-3 text-sm text-foreground/70">Sign in as a student to apply for this tuition.</p>
        <Link href={`/sign-in?redirect=/tuitions/${tuitionId}`} className={cn(buttonVariants({ variant: "brand" }), "mt-4 h-11 w-full")}>
          Sign In to Apply
        </Link>
      </div>
    );
  }

  // 2) Tutor / Admin: button disabled + notice
  if (user.role !== "student") {
    return (
      <div className="space-y-3">
        <Button disabled className="h-12 w-full rounded-full">Apply Now</Button>
        <p className="flex gap-2 rounded-xl bg-secondary/25 p-3 text-xs text-foreground/80">
          <Info size={16} className="mt-0.5 shrink-0" />
          Only students can apply for tuitions. You are signed in as a {user.role}.
        </p>
      </div>
    );
  }

  // 3) Already applied (duplicate block, backend e o check hobe)
  if (applied) {
    return (
      <div className="rounded-2xl bg-success/10 p-5 text-center">
        <CheckCircle2 className="mx-auto text-success" size={32} />
        <p className="mt-3 font-display text-lg text-primary">Application submitted</p>
        <p className="mt-1 text-xs text-foreground/60">You can track the status from My Applications.</p>
        <Button disabled className="mt-4 h-11 w-full rounded-full">Already Applied</Button>
      </div>
    );
  }

  const validate = () => {
    const e: Errors = {};
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(form.phone.trim())) e.phone = "Enter a valid Bangladeshi number";
    if (!form.preferredSchedule.trim()) e.preferredSchedule = "Preferred schedule is required";
    if (form.studentNote.trim().length < 10) e.studentNote = "Please write at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return toast.error("Please fix the highlighted fields");
    setLoading(true);
    // TODO (backend phase): POST /api/applications { tuitionId, phone, preferredSchedule, studentNote }
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setApplied(true);
    toast.success(`Applied to “${tuitionTitle}” (demo)`);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="01XXXXXXXXX" aria-invalid={!!errors.phone} className="h-11 rounded-xl bg-white" />
        {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="schedule">Preferred Schedule</Label>
        <Input id="schedule" value={form.preferredSchedule} onChange={(e) => setForm({ ...form, preferredSchedule: e.target.value })}
          placeholder="e.g. Evening, after 7 PM" aria-invalid={!!errors.preferredSchedule} className="h-11 rounded-xl bg-white" />
        {errors.preferredSchedule && <p className="text-xs text-destructive">{errors.preferredSchedule}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="note">Learning Note</Label>
        <Textarea id="note" rows={4} value={form.studentNote} onChange={(e) => setForm({ ...form, studentNote: e.target.value })}
          placeholder="Tell the tutor about your goals…" aria-invalid={!!errors.studentNote} className="rounded-xl bg-white" />
        {errors.studentNote && <p className="text-xs text-destructive">{errors.studentNote}</p>}
      </div>

      <Button type="submit" variant="brand" disabled={loading} className="h-12 w-full">
        {loading ? <Loader2 className="animate-spin" /> : "Apply Now"}
      </Button>
    </form>
  );
}