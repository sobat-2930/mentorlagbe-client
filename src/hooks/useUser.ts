"use client";
import { useSyncExternalStore } from "react";
import {
  getServerUserSnapshot,
  getUserSnapshot,
  subscribeUser,
  type AppUser,
  type Role,
} from "@/lib/demo-auth";

export type { AppUser, Role };

// TODO (backend phase): eta BetterAuth useSession() diye replace hobe
export function useUser() {
  const user = useSyncExternalStore<AppUser | undefined>(
    subscribeUser,
    getUserSnapshot,
    getServerUserSnapshot
  );
  return { user: user ?? null, loading: user === undefined };
}