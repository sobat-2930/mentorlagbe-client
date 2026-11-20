import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[70vh] place-items-center text-center">
      <div>
        <p className="font-display text-9xl font-semibold text-secondary">404</p>
        <h1 className="mt-2 font-display text-4xl text-primary">Page not found</h1>
        <p className="mt-3 text-foreground/60">The page you’re looking for doesn’t exist or was moved.</p>
        <Link href="/" className={cn(buttonVariants({ variant: "brand" }), "mt-8 h-12 px-7")}>Back to Home</Link>
      </div>
    </div>
  );
}