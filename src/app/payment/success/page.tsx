import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function PaymentSuccess({ searchParams }: Props) {
  const { session_id } = await searchParams;
  return (
    <div className="container-x grid min-h-[70vh] place-items-center py-16">
      <div className="paper-card w-full max-w-lg p-10 text-center">
        <CheckCircle2 className="mx-auto text-success" size={64} />
        <h1 className="mt-5 font-display text-4xl text-primary">Payment successful</h1>
        <p className="mt-3 text-foreground/70">Your account is being upgraded to Pro. Thank you for supporting MentorLagbe!</p>
        {session_id && (
          <p className="mt-4 break-all rounded-xl bg-muted p-3 text-xs text-foreground/60">Session: {session_id}</p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/dashboard" className={cn(buttonVariants({ variant: "brand" }), "h-12 px-7")}>Go to Dashboard</Link>
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-full px-7")}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
}