"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-x grid min-h-[70vh] place-items-center text-center">
      <div>
        <h1 className="font-display text-5xl text-primary">Something went wrong</h1>
        <p className="mt-3 text-foreground/60">{error.message || "Unexpected error occurred."}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button variant="outline" onClick={reset} className="h-12 rounded-full px-6">Try again</Button>
          <Link href="/" className={cn(buttonVariants({ variant: "brand" }), "h-12 px-7")}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
}