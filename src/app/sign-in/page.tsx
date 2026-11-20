"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createDemoUser, setDemoUser } from "@/lib/demo-auth";

type Errors = Partial<Record<"email" | "password", string>>;

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Errors = {};
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
  // TODO (backend phase): BetterAuth signIn.email({ email, password })
  await new Promise((r) => setTimeout(r, 700));
  setDemoUser(createDemoUser({ email: form.email }));
  setLoading(false);
  toast.success("Welcome back!");
  const redirect = new URLSearchParams(window.location.search).get("redirect");
  router.push(redirect && redirect.startsWith("/") ? redirect : "/dashboard");
};

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue to your dashboard.">
      <div className="mb-6 rounded-2xl border border-dashed border-primary/30 bg-muted p-4 text-xs leading-relaxed text-foreground/70">
  <p className="mb-1 font-bold text-primary">Demo accounts (any password, 6+ chars)</p>
  <p>student@demo.com · tutor@demo.com · protutor@demo.com · admin@demo.com</p>
</div>
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
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
              placeholder="Your password" aria-invalid={!!errors.password} className="h-12 rounded-xl bg-white px-11" />
            <button type="button" onClick={() => setShow(!show)} aria-label="Toggle password"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50">
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </div>

        <Button type="submit" variant="brand" disabled={loading} className="h-12 w-full">
          {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
        </Button>

        <p className="text-center text-sm text-foreground/60">
          New to MentorLagbe? <Link href="/sign-up" className="font-bold text-coral">Create an account</Link>
        </p>
      </form>
    </AuthShell>
  );
}