"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Crown, LoaderCircle, Mail } from "lucide-react";
import { useDashboardUser } from "@/components/dashboard/user-context";
import PageHeader from "@/components/dashboard/PageHeader";
import ImageUploader from "@/components/dashboard/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/hooks/useUser";
import { api } from "@/lib/api";

type Errors = Partial<Record<"name" | "phone" | "bio", string>>;

export default function ProfilePage() {
  const user = useDashboardUser();
  const { refetch } = useUser();
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone ?? "",
    bio: user.bio ?? "",
    image: user.image ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (form.phone.trim() && !/^(?:\+?88)?01[3-9]\d{8}$/.test(form.phone.trim())) e.phone = "Enter a valid Bangladeshi number";
    if (form.bio.length > 300) e.bio = "Bio can be at most 300 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return toast.error("Please fix the highlighted fields");
    setLoading(true);
    try {
      // blob: preview hole (ImgBB key nai) purono image ei thake
      const image = form.image.startsWith("blob:") ? user.image ?? "" : form.image.trim();
      await api("/api/me", {
        method: "PATCH",
        body: { name: form.name.trim(), phone: form.phone.trim(), bio: form.bio.trim(), image },
      });
      await refetch();
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Update Profile" subtitle="Keep your details fresh so tutors and students can trust you." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="paper-card flex h-fit flex-col items-center p-8 text-center">
          <ImageUploader variant="avatar" value={form.image} onChange={(url) => setForm({ ...form, image: url })} label="Upload photo" />
          <h3 className="mt-5 font-display text-2xl text-primary">{user.name}</h3>
          <p className="mt-1 flex items-center gap-2 break-all text-sm text-foreground/60">
            <Mail size={14} className="shrink-0" /> {user.email}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold capitalize text-primary">
              {user.role}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase text-secondary-foreground">
              {user.plan === "pro" && <Crown size={12} />} {user.plan}
            </span>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="paper-card space-y-5 p-6 sm:p-8 lg:col-span-2">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={!!errors.name} className="h-11 rounded-xl bg-white" />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="01XXXXXXXXX" aria-invalid={!!errors.phone} className="h-11 rounded-xl bg-white" />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email (cannot be changed)</Label>
            <Input id="email" value={user.email} disabled className="h-11 rounded-xl bg-muted" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="image">Or paste an image URL</Label>
            <Input
              id="image"
              value={form.image.startsWith("blob:") ? "" : form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://…"
              className="h-11 rounded-xl bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" rows={5} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Tell us a little about yourself…" aria-invalid={!!errors.bio} className="rounded-xl bg-white" />
            <div className="flex justify-between text-xs">
              <span className="text-destructive">{errors.bio}</span>
              <span className="text-foreground/50">{form.bio.length}/300</span>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="brand" disabled={loading} className="h-12 px-8">
              {loading ? <LoaderCircle className="animate-spin" /> : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}