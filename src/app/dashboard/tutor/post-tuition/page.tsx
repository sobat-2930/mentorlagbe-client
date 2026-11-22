"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Crown, Info } from "lucide-react";
import { useDashboardUser } from "@/components/dashboard/user-context";
import PageHeader from "@/components/dashboard/PageHeader";
import TuitionForm, { type TuitionFormValues } from "@/components/dashboard/TuitionForm";
import { LoadError, PageSkeleton } from "@/components/dashboard/DataState";
import { buttonVariants } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";
import type { Tuition } from "@/lib/types";
import { cn } from "@/lib/utils";

const FREE_LIMIT = 2;

export default function PostTuitionPage() {
  const user = useDashboardUser();
  const router = useRouter();
  const { data, loading, error, reload } = useApi<Tuition[]>("/api/tutor/tuitions");

  if (loading) return <PageSkeleton />;
  if (error || !data) return <LoadError message={error} onRetry={reload} />;

  const posted = data.length;
  const limitReached = user.plan !== "pro" && posted >= FREE_LIMIT;

  const handleSubmit = async (v: TuitionFormValues) => {
    try {
      await api("/api/tutor/tuitions", {
        method: "POST",
        body: { ...v, bannerImage: v.bannerImage.startsWith("blob:") ? "" : v.bannerImage },
      });
      toast.success("Tuition submitted! It will appear after admin approval");
      router.push("/dashboard/tutor/my-tuitions");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not post tuition");
    }
  };

  return (
    <>
      <PageHeader title="Post a Tuition" subtitle="New posts are reviewed by an admin before going public." />

      {limitReached ? (
        <div className="paper-card mx-auto max-w-2xl p-10 text-center">
          <Crown className="mx-auto text-secondary" size={44} />
          <h3 className="mt-4 font-display text-3xl text-primary">Free plan limit reached</h3>
          <p className="mt-2 text-foreground/60">
            You have posted {posted} of {FREE_LIMIT} tuitions allowed on the Free plan. Upgrade to Pro for unlimited posts and a verified badge.
          </p>
          <Link href="/pricing" className={cn(buttonVariants({ variant: "brand" }), "mt-6 h-12 px-8")}>Upgrade to Pro · $15</Link>
        </div>
      ) : (
        <div className="paper-card p-6 sm:p-8">
          {user.plan !== "pro" && (
            <p className="mb-6 flex items-center gap-2 rounded-xl bg-secondary/25 p-3 text-sm text-foreground/80">
              <Info size={16} className="shrink-0" />
              Free plan: {FREE_LIMIT - posted} of {FREE_LIMIT} posts left.
            </p>
          )}
          <TuitionForm submitLabel="Submit for Approval" onSubmit={handleSubmit} />
        </div>
      )}
    </>
  );
}