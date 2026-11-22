"use client";
import { useMemo } from "react";
import { useSession } from "@/lib/auth-client";
import type { AppUser, Role } from "@/lib/types";

export type { AppUser, Role };

export function useUser() {
  const { data, isPending, refetch } = useSession();
  const u = data?.user;

  const user = useMemo<AppUser>(
    () =>
      u
        ? {
            name: u.name,
            email: u.email,
            image: u.image ?? undefined,
            role: ((u.role as Role) || "student") as Role,
            plan: u.plan === "pro" ? "pro" : "free",
            phone: u.phone ?? undefined,
            bio: u.bio ?? undefined,
          }
        : null,
    [u]
  );

  return { user, loading: isPending, refetch };
}