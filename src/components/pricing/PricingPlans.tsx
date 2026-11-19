"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = {
  student: {
    free: ["Browse all tuitions", "Apply to tuitions", "Track application status"],
    pro: ["Everything in Free", "Priority booking", "Early access to new batches", "Pro badge"],
    price: 10,
  },
  tutor: {
    free: ["Post up to 2 tuitions", "Manage applicants", "Basic profile"],
    pro: ["Unlimited tuition posts", "Verified tutor badge", "Top placement in search", "Priority support"],
    price: 15,
  },
};

export default function PricingPlans() {
  const router = useRouter();
  const { user } = useUser();
  const [role, setRole] = useState<"student" | "tutor">("student");
  const p = plans[role];

  const onSubscribe = () => {
    if (!user) {
      toast.info("Please sign in to subscribe");
      return router.push("/sign-in?redirect=/pricing");
    }
    // TODO (payment phase): POST /api/payments/checkout → Stripe Checkout URL e redirect
    toast.info("Stripe Checkout will be connected in the payment phase");
  };

  return (
    <div>
      <div className="text-center">
        <div role="tablist" className="inline-flex rounded-full border border-border bg-muted p-1">
          {(["student", "tutor"] as const).map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={role === r}
              onClick={() => setRole(r)}
              className={cn(
                "rounded-full px-6 py-2 text-sm font-bold capitalize transition",
                role === r ? "bg-primary text-primary-foreground" : "text-foreground/60"
              )}
            >
              {r}s
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-7 md:grid-cols-2">
        <div className="paper-card flex h-full flex-col p-8">
          <p className="font-bold uppercase tracking-widest text-foreground/50">Free</p>
          <p className="mt-3 font-display text-5xl font-semibold text-primary">$0</p>
          <ul className="mt-6 space-y-3 text-sm">
            {p.free.map((f) => (
              <li key={f} className="flex gap-3"><Check size={18} className="text-success" />{f}</li>
            ))}
          </ul>
          <Link href="/sign-up" className={cn(buttonVariants({ variant: "outline" }), "mt-8 h-12 rounded-full")}>
            Get Started
          </Link>
        </div>

        <div className="relative flex h-full flex-col rounded-3xl bg-primary p-8 text-primary-foreground shadow-2xl">
          <span className="absolute -top-3 right-6 rounded-full bg-secondary px-4 py-1 text-xs font-extrabold text-secondary-foreground">
            MOST POPULAR
          </span>
          <p className="font-bold uppercase tracking-widest text-secondary">Pro</p>
          <p className="mt-3 font-display text-5xl font-semibold">
            ${p.price}<span className="font-sans text-base text-primary-foreground/60"> /one-time</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {p.pro.map((f) => (
              <li key={f} className="flex gap-3"><Check size={18} className="text-secondary" />{f}</li>
            ))}
          </ul>
          <Button variant="saffron" onClick={onSubscribe} className="mt-8 h-12">
            Subscribe with Stripe
          </Button>
        </div>
      </div>
    </div>
  );
}