"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useUser } from "@/hooks/useUser";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type State = "verifying" | "success" | "error";

export default function VerifyPayment({ sessionId }: { sessionId?: string }) {
  const { refetch } = useUser();
  const [state, setState] = useState<State>(sessionId ? "verifying" : "error");
  const [message, setMessage] = useState(sessionId ? "" : "No payment session found.");

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;

    // Server Stripe session verify kore payment save + plan "pro" kore (idempotent)
    api("/api/payments/verify", { method: "POST", body: { sessionId } })
      .then(async () => {
        if (cancelled) return;
        await refetch(); // session e notun plan ane
        setState("success");
        toast.success("You are now on the Pro plan!");
      })
      .catch((err) => {
        if (cancelled) return;
        setMessage(err instanceof Error ? err.message : "Could not verify payment");
        setState("error");
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return (
    <div className="paper-card w-full max-w-lg p-10 text-center">
      {state === "verifying" && (
        <>
          <Loader2 className="mx-auto animate-spin text-primary" size={56} />
          <h1 className="mt-5 font-display text-3xl text-primary">Confirming your payment…</h1>
          <p className="mt-3 text-foreground/70">Please wait a moment. Do not close this page.</p>
        </>
      )}

      {state === "success" && (
        <>
          <CheckCircle2 className="mx-auto text-success" size={64} />
          <h1 className="mt-5 font-display text-4xl text-primary">Payment successful</h1>
          <p className="mt-3 text-foreground/70">Your account is now Pro. Thank you for supporting MentorLagbe!</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/dashboard" className={cn(buttonVariants({ variant: "brand" }), "h-12 px-7")}>Go to Dashboard</Link>
            <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-full px-7")}>Back to Home</Link>
          </div>
        </>
      )}

      {state === "error" && (
        <>
          <XCircle className="mx-auto text-destructive" size={64} />
          <h1 className="mt-5 font-display text-3xl text-primary">Could not confirm payment</h1>
          <p className="mt-3 text-foreground/70">{message}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/pricing" className={cn(buttonVariants({ variant: "brand" }), "h-12 px-7")}>Back to Pricing</Link>
            <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-full px-7")}>Back to Home</Link>
          </div>
        </>
      )}
    </div>
  );
}