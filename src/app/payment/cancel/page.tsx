import Link from "next/link";
import { XCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PaymentCancel() {
  return (
    <div className="container-x grid min-h-[70vh] place-items-center py-16">
      <div className="paper-card w-full max-w-lg p-10 text-center">
        <XCircle className="mx-auto text-destructive" size={64} />
        <h1 className="mt-5 font-display text-4xl text-primary">Payment cancelled</h1>
        <p className="mt-3 text-foreground/70">No charge was made. You can try again whenever you’re ready.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/pricing" className={cn(buttonVariants({ variant: "brand" }), "h-12 px-7")}>Try Again</Link>
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-full px-7")}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
}