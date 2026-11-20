"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { setDemoUser } from "@/lib/demo-auth";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/tuitions", label: "Browse Tuitions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#how-it-works", label: "How It Works" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const handleSignOut = () => {
    // TODO (backend phase): BetterAuth signOut()
    setDemoUser(null);
    toast.success("Signed out successfully");
    setOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-secondary">
            <GraduationCap size={22} />
          </span>
          <span className="font-display text-2xl font-semibold text-primary">
            Mentor<span className="text-coral">Lagbe</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                pathname === l.href
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/75 hover:bg-muted"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <div className="group relative">
              <button className="flex items-center gap-3 rounded-full border border-border bg-white/70 py-1.5 pl-1.5 pr-4">
                <img
                  src={user.image || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=0f3d33&textColor=f4b63f`}
                  alt={user.name}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <span className="text-left leading-tight">
                  <span className="block text-sm font-bold text-primary">{user.name}</span>
                  <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                </span>
              </button>
              <div className="invisible absolute right-0 top-full z-10 w-56 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="rounded-2xl border border-border bg-background p-2 shadow-xl">
                  <Link href="/dashboard" className="block rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-muted">
                    Dashboard
                  </Link>
                  <Link href="/dashboard/profile" className="block rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-muted">
                    Update Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-destructive hover:bg-muted"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={cn(buttonVariants({ variant: "ghost" }), "h-11 rounded-full px-5 font-semibold")}
              >
                Sign In
              </Link>
              <Link href="/sign-up" className={cn(buttonVariants({ variant: "saffron" }), "h-11 px-6")}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-semibold hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}

            {user && (
              <Link
                href="/dashboard/profile"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-semibold hover:bg-muted"
              >
                Update Profile
              </Link>
            )}

            <div className="mt-3 flex gap-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className={cn(buttonVariants({ variant: "brand" }), "h-11 flex-1")}
                  >
                    Dashboard
                  </Link>
                  <Button variant="outline" onClick={handleSignOut} className="h-11 flex-1 rounded-full">
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setOpen(false)}
                    className={cn(buttonVariants({ variant: "outline" }), "h-11 flex-1 rounded-full")}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setOpen(false)}
                    className={cn(buttonVariants({ variant: "saffron" }), "h-11 flex-1")}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}