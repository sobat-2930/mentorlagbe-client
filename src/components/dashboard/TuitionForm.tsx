"use client";
import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { filterOptions } from "@/lib/tuitions";
import { cn } from "@/lib/utils";
import ImageUploader from "./ImageUploader";

export type TuitionFormValues = {
  title: string;
  subject: string;
  classLevel: string;
  mode: "Online" | "Offline" | "";
  location: string;
  monthlyFee: string;
  daysPerWeek: string;
  description: string;
  bannerImage: string;
};

export const emptyTuitionForm: TuitionFormValues = {
  title: "", subject: "", classLevel: "", mode: "", location: "",
  monthlyFee: "", daysPerWeek: "", description: "", bannerImage: "",
};

type Errors = Partial<Record<keyof TuitionFormValues, string>>;

type Props = {
  initial?: TuitionFormValues;
  submitLabel: string;
  onSubmit: (values: TuitionFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

const selectClass =
  "h-11 w-full rounded-xl border bg-white px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

function validate(v: TuitionFormValues): Errors {
  const e: Errors = {};
  if (v.title.trim().length < 5) e.title = "Title must be at least 5 characters";
  if (!v.subject) e.subject = "Select a subject";
  if (!v.classLevel) e.classLevel = "Select a class level";
  if (!v.mode) e.mode = "Select a mode";
  if (!v.location.trim()) e.location = "Location is required (use Zoom / Meet for online)";
  const fee = Number(v.monthlyFee);
  if (!v.monthlyFee || Number.isNaN(fee) || fee < 100 || fee > 100000) e.monthlyFee = "Enter a fee between ৳100 and ৳100,000";
  const days = Number(v.daysPerWeek);
  if (!v.daysPerWeek || !Number.isInteger(days) || days < 1 || days > 7) e.daysPerWeek = "Days per week must be 1 to 7";
  if (v.description.trim().length < 30) e.description = "Description must be at least 30 characters";
  return e;
}

function Field({ label, htmlFor, error, className, children }: {
  label: string; htmlFor?: string; error?: string; className?: string; children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default function TuitionForm({ initial = emptyTuitionForm, submitLabel, onSubmit, onCancel }: Props) {
  const [v, setV] = useState<TuitionFormValues>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof TuitionFormValues>(key: K, value: TuitionFormValues[K]) =>
    setV((prev) => ({ ...prev, [key]: value }));

  const border = (k: keyof TuitionFormValues) => (errors[k] ? "border-destructive" : "border-input");

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(v);
    setErrors(e);
    if (Object.keys(e).length) return toast.error("Please fix the highlighted fields");
    setLoading(true);
    try {
      await onSubmit(v);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 md:grid-cols-2">
      <Field label="Title" htmlFor="title" error={errors.title} className="md:col-span-2">
        <Input id="title" value={v.title} onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. HSC Physics Crash Batch" aria-invalid={!!errors.title} className="h-11 rounded-xl bg-white" />
      </Field>

      <Field label="Subject" htmlFor="subject" error={errors.subject}>
        <select id="subject" value={v.subject} onChange={(e) => set("subject", e.target.value)} className={cn(selectClass, border("subject"))}>
          <option value="">Select subject</option>
          {filterOptions.subjects.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>

      <Field label="Class Level" htmlFor="classLevel" error={errors.classLevel}>
        <select id="classLevel" value={v.classLevel} onChange={(e) => set("classLevel", e.target.value)} className={cn(selectClass, border("classLevel"))}>
          <option value="">Select class level</option>
          {filterOptions.classLevels.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>

      <Field label="Mode" htmlFor="mode" error={errors.mode}>
        <select id="mode" value={v.mode} onChange={(e) => set("mode", e.target.value as TuitionFormValues["mode"])} className={cn(selectClass, border("mode"))}>
          <option value="">Select mode</option>
          {filterOptions.modes.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>

      <Field label="Location" htmlFor="location" error={errors.location}>
        <Input id="location" value={v.location} onChange={(e) => set("location", e.target.value)}
          placeholder="e.g. Dhanmondi, Dhaka or Zoom" aria-invalid={!!errors.location} className="h-11 rounded-xl bg-white" />
      </Field>

      <Field label="Monthly Fee (৳)" htmlFor="fee" error={errors.monthlyFee}>
        <Input id="fee" type="number" min={100} value={v.monthlyFee} onChange={(e) => set("monthlyFee", e.target.value)}
          placeholder="2500" aria-invalid={!!errors.monthlyFee} className="h-11 rounded-xl bg-white" />
      </Field>

      <Field label="Days / Week" htmlFor="days" error={errors.daysPerWeek}>
        <Input id="days" type="number" min={1} max={7} value={v.daysPerWeek} onChange={(e) => set("daysPerWeek", e.target.value)}
          placeholder="3" aria-invalid={!!errors.daysPerWeek} className="h-11 rounded-xl bg-white" />
      </Field>

      <Field label="Description" htmlFor="description" error={errors.description} className="md:col-span-2">
        <Textarea id="description" rows={5} value={v.description} onChange={(e) => set("description", e.target.value)}
          placeholder="What will you teach? Who is this for? Any special features?" aria-invalid={!!errors.description} className="rounded-xl bg-white" />
      </Field>

      <Field label="Banner Image (optional)" className="md:col-span-2">
        <ImageUploader value={v.bannerImage} onChange={(url) => set("bannerImage", url)} label="Click to upload banner" />
      </Field>

      <div className="flex justify-end gap-3 md:col-span-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="h-12 rounded-full px-6">
            Cancel
          </Button>
        )}
        <Button type="submit" variant="brand" disabled={loading} className="h-12 px-8">
          {loading ? <LoaderCircle className="animate-spin" /> : submitLabel}
        </Button>
      </div>
    </form>
  );
}