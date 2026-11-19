export type Role = "student" | "tutor" | "admin";
export type AppUser = { name: string; email: string; image?: string; role: Role } | null;

export function useUser(): { user: AppUser; loading: boolean } {
  // TODO (Phase 2): BetterAuth useSession() diye replace
  return { user: null, loading: false };
}