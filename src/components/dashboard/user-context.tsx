"use client";
import { createContext, useContext } from "react";
// import type { AuthUser } from "@/lib/demo-auth";
import type { AuthUser } from "@/lib/types";

const UserContext = createContext<AuthUser | null>(null);

export const DashboardUserProvider = UserContext.Provider;

export function useDashboardUser(): AuthUser {
  const user = useContext(UserContext);
  if (!user) throw new Error("useDashboardUser must be used inside the dashboard");
  return user;
}