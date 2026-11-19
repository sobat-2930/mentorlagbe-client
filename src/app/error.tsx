"use client";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-x grid min-h-[70vh] place-items-center text-center">
      <div>
        <h1 className="font-display text-5xl text-primary">Something went wrong</h1>
        <p className="mt-3 text-base-content/60">{error.message || "Unexpected error occurred."}</p>
        <div className="mt-8 flex justify-center gap-3">
          <button onClick={reset} className="btn btn-outline rounded-full">Try again</button>
          <Link href="/" className="btn-brand">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}