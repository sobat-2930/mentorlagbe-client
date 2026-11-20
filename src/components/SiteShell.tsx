
"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function SiteShellContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // dashboard e nijer sidebar + topbar ache
  if (pathname.startsWith("/dashboard")) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
    </>
  );
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <SiteShellContent>{children}</SiteShellContent>
    </Suspense>
  );
}
