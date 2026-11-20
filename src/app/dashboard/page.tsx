"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useDashboardUser } from "@/components/dashboard/user-context";

export default function DashboardIndex() {
  const user = useDashboardUser();
  const router = useRouter();

  useEffect(() => {
    router.replace(`/dashboard/${user.role}`);
  }, [user.role, router]);

  return (
    <div className="grid min-h-[50vh] place-items-center">
      <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}