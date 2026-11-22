"use client";
import { RefreshCw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-10 w-72 animate-pulse rounded-xl bg-muted" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-3xl bg-muted" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-3xl bg-muted" />
    </div>
  );
}

export function LoadError({ message, onRetry }: { message?: string | null; onRetry: () => void }) {
  return (
    <div className="paper-card grid place-items-center px-6 py-16 text-center">
      <TriangleAlert size={48} className="text-destructive" />
      <h3 className="mt-4 font-display text-2xl text-primary">Could not load data</h3>
      <p className="mt-2 max-w-sm text-sm text-foreground/60">{message || "Something went wrong. Please try again."}</p>
      <Button variant="brand" onClick={onRetry} className="mt-6 h-11 px-6">
        <RefreshCw size={16} /> Try again
      </Button>
    </div>
  );
}