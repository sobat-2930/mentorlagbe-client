"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, BookOpen, Presentation, Mail, Lock, User, Loader2 } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import { clearJwt } from "@/lib/api";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";

type Role = "student" | "tutor";
type Errors = Partial<Record<"name" | "email" | "password", string>>;

const roles = [
  { value: "student", label: "Student", hint: "Find & apply to tuitions", icon: BookOpen },
  { value: "tutor", label: "Tutor", hint: "Post batches & teach", icon: Presentation },
] as const;

export default function SignUpPage() {
  const router = useRouter();
  const { user, loading: sessionLoading } = useUser();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" as Role });
  const [errors, setErrors] = useState<Errors>({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sessionLoading && user) router.replace("/dashboard");
  }, [user, sessionLoading, router]);

  const validate = () => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return toast.error("Please fix the highlighted fields");

    setLoading(true);
    const { error } = await signUp.email({
      name: form.name.trim(),
      email: form.email,
      password: form.password,
      role: form.role,
    });
    if (error) {
      setLoading(false);
      return toast.error(error.message || "Sign up failed");
    }
    clearJwt();
    toast.success("Account created! Welcome to MentorLagbe");
    // session ready hole upore er effect /dashboard e pathabe
  };

  return (
    <AuthShell title="Create account" subtitle="Pick your role and get started in a minute.">
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div>
          <Label className="mb-2 block">I want to join as</Label>
          <div className="grid grid-cols-2 gap-3">
            {roles.map((r) => {
              const active = form.role === r.value;
              return (
                <button
                  type="button"
                  key={r.value}
                  onClick={() => setForm({ ...form, role: r.value })}
                  className={cn(
                    "rounded-2xl border-2 p-4 text-left transition",
                    active ? "border-primary bg-primary/5" : "border-border bg-white/60 hover:border-primary/40"
                  )}
                >
                  <r.icon size={22} className={active ? "text-primary" : "text-foreground/40"} />
                  <p className="mt-2 font-bold text-primary">{r.label}</p>
                  <p className="text-xs text-foreground/60">{r.hint}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name" aria-invalid={!!errors.name} className="h-12 rounded-xl bg-white pl-11" />
          </div>
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com" aria-invalid={!!errors.email} className="h-12 rounded-xl bg-white pl-11" />
          </div>
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
            <Input id="password" type={show ? "text" : "password"} value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Minimum 6 characters" aria-invalid={!!errors.password} className="h-12 rounded-xl bg-white px-11" />
            <button type="button" onClick={() => setShow(!show)} aria-label="Toggle password"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50">
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </div>

        <Button type="submit" variant="brand" disabled={loading} className="h-12 w-full">
          {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
        </Button>

        <p className="text-center text-sm text-foreground/60">
          Already have an account? <Link href="/sign-in" className="font-bold text-coral">Sign In</Link>
        </p>
      </form>
    </AuthShell>
  );
}