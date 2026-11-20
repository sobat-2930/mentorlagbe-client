"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Crown, GraduationCap, Globe, LoaderCircle, LogOut, PanelLeft, X } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { setDemoUser } from "@/lib/demo-auth";
import { cn } from "@/lib/utils";
import { navByRole } from "./nav";
import { DashboardUserProvider } from "./user-context";

const ROLE_SEGMENTS = ["student", "tutor", "admin"];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const signingOut = useRef(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const segment = pathname.split("/")[2];
  const wrongRole = !!user && ROLE_SEGMENTS.includes(segment) && segment !== user.role;

  // session load howar por-i redirect, tai reload e login e fire jabe na
  useEffect(() => {
    if (loading || signingOut.current) return;
    if (!user) router.replace(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
    else if (wrongRole) router.replace(`/dashboard/${user.role}`);
  }, [loading, user, wrongRole, pathname, router]);

  if (loading || !user || wrongRole) {
    return (
      <div className="grid min-h-screen place-items-center">
        <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const items = navByRole[user.role];
  const title = items.find((i) => i.href === pathname)?.label ?? "Dashboard";
  const avatar = user.image || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=f4b63f&textColor=2a1b00`;
  const hide = collapsed ? "lg:hidden" : "";

  const toggleSidebar = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) setCollapsed((c) => !c);
    else setMobileOpen((o) => !o);
  };

  const handleSignOut = () => {
    signingOut.current = true;
    setDemoUser(null);
    toast.success("Signed out successfully");
    router.push("/");
  };

  return (
    <DashboardUserProvider value={user}>
      <div className="min-h-screen bg-muted/40">
        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-primary text-primary-foreground transition-all duration-300",
            collapsed && "lg:w-20",
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                <GraduationCap size={22} />
              </span>
              <span className={cn("font-display text-xl font-semibold", hide)}>
                Mentor<span className="text-secondary">Lagbe</span>
              </span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="lg:hidden" aria-label="Close menu">
              <X size={20} />
            </button>
          </div>

          {/* User profile summary */}
          <div className={cn("mx-3 mb-3 flex items-center gap-3 rounded-2xl bg-white/10 p-3", collapsed && "lg:justify-center lg:p-2")}>
            <img src={avatar} alt={user.name} className="h-11 w-11 shrink-0 rounded-xl object-cover" />
            <div className={cn("min-w-0", hide)}>
              <p className="truncate text-sm font-bold">{user.name}</p>
              <p className="flex items-center gap-1.5 text-xs capitalize text-primary-foreground/70">
                {user.role}
                {user.plan === "pro" && <Crown size={12} className="text-secondary" />}
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3">
            {items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                    collapsed && "lg:justify-center lg:px-0",
                    active ? "bg-secondary text-secondary-foreground" : "text-primary-foreground/75 hover:bg-white/10"
                  )}
                >
                  <item.icon size={20} className="shrink-0" />
                  <span className={hide}>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="space-y-1 border-t border-white/10 p-3">
            <Link
              href="/"
              title="Visit website"
              className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-primary-foreground/75 hover:bg-white/10", collapsed && "lg:justify-center lg:px-0")}
            >
              <Globe size={20} className="shrink-0" />
              <span className={hide}>Visit Website</span>
            </Link>
            <button
              onClick={handleSignOut}
              title="Sign out"
              className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-primary-foreground/75 hover:bg-white/10", collapsed && "lg:justify-center lg:px-0")}
            >
              <LogOut size={20} className="shrink-0" />
              <span className={hide}>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className={cn("transition-all duration-300", collapsed ? "lg:pl-20" : "lg:pl-64")}>
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/85 px-4 backdrop-blur-md sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
                className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-white hover:bg-muted"
              >
                <PanelLeft size={20} />
              </button>
              <h1 className="font-display text-xl font-semibold text-primary sm:text-2xl">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "hidden items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase sm:inline-flex",
                  user.plan === "pro" ? "bg-secondary text-secondary-foreground" : "bg-muted text-foreground/70"
                )}
              >
                {user.plan === "pro" && <Crown size={12} />} {user.plan} plan
              </span>
              <img src={avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
            </div>
          </header>

          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </DashboardUserProvider>
  );
}