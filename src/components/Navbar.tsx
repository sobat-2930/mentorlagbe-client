"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";

const links = [
  { href: "/", label: "Home" },
  { href: "/tuitions", label: "Browse Tuitions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#how-it-works", label: "How It Works" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const handleSignOut = () => {
    // TODO (Phase 2): authClient.signOut()
    toast.success("Signed out successfully");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-300/70 bg-base-100/85 backdrop-blur-md">
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-secondary">
            <GraduationCap size={22} />
          </span>
          <span className="font-display text-2xl font-semibold text-primary">
            Mentor<span className="text-accent">Lagbe</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active ? "bg-primary text-primary-content" : "text-base-content/75 hover:bg-base-200"}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="flex items-center gap-3 rounded-full border border-base-300 bg-white/70 py-1.5 pl-1.5 pr-4">
                <img src={user.image || `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`}
                  alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                <span className="text-left leading-tight">
                  <span className="block text-sm font-bold text-primary">{user.name}</span>
                  <span className="badge badge-secondary badge-sm capitalize">{user.role}</span>
                </span>
              </button>
              <ul tabIndex={0} className="dropdown-content menu z-10 mt-3 w-56 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl">
                <li><Link href={`/dashboard/${user.role}`}>Dashboard</Link></li>
                <li><Link href="/dashboard/profile">Update Profile</Link></li>
                <li><button onClick={handleSignOut} className="text-error">Sign Out</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/sign-in" className="btn btn-ghost rounded-full font-semibold">Sign In</Link>
              <Link href="/sign-up" className="btn-saffron !btn-sm !h-11">Sign Up</Link>
            </>
          )}
        </div>

        <button className="btn btn-ghost btn-circle lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-base-300 bg-base-100 lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-semibold hover:bg-base-200">{l.label}</Link>
            ))}
            <div className="mt-3 flex gap-3">
              {user ? (
                <>
                  <Link href={`/dashboard/${user.role}`} onClick={() => setOpen(false)} className="btn-brand flex-1">Dashboard</Link>
                  <button onClick={handleSignOut} className="btn btn-outline flex-1 rounded-full">Sign Out</button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" onClick={() => setOpen(false)} className="btn btn-outline flex-1 rounded-full">Sign In</Link>
                  <Link href="/sign-up" onClick={() => setOpen(false)} className="btn-saffron flex-1">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}