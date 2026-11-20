export type Role = "student" | "tutor" | "admin";

export type AuthUser = {
  name: string;
  email: string;
  image?: string;
  role: Role;
  plan: "free" | "pro";
  phone?: string;
  bio?: string;
};
export type AppUser = AuthUser | null;

const KEY = "ml_demo_user";
const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedUser: AppUser = null;

function readUser(): AppUser {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedUser = raw ? (JSON.parse(raw) as AuthUser) : null;
    }
  } catch {
    cachedUser = null;
  }
  return cachedUser;
}

export function subscribeUser(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export const getUserSnapshot = (): AppUser => readUser();
// server e undefined = "ekhono load hoy nai"
export const getServerUserSnapshot = (): AppUser | undefined => undefined;

export function setDemoUser(user: AppUser) {
  try {
    if (user) window.localStorage.setItem(KEY, JSON.stringify(user));
    else window.localStorage.removeItem(KEY);
  } catch {}
  listeners.forEach((l) => l());
}

export function updateDemoUser(patch: Partial<AuthUser>) {
  const current = readUser();
  if (current) setDemoUser({ ...current, ...patch });
}

export function createDemoUser(opts: { email: string; name?: string; role?: Role }): AuthUser {
  const email = opts.email.trim().toLowerCase();
  const local = email.split("@")[0];
  const role: Role =
    opts.role ?? (local.includes("admin") ? "admin" : local.includes("tutor") ? "tutor" : "student");
  const name =
    opts.name?.trim() ||
    local.replace(/[^a-z]+/gi, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Demo User";
  return { name, email, role, plan: local.includes("pro") ? "pro" : "free" };
}