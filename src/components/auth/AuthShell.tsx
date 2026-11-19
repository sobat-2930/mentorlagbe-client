import Link from "next/link";
import { GraduationCap, Quote, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="container-x grid items-stretch gap-10 py-10 lg:grid-cols-2 lg:py-14">
      {/* Left: brand panel */}
      <div className="relative hidden overflow-hidden rounded-[2.5rem] bg-primary p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-secondary/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-coral/20 blur-3xl" />

        <Link href="/" className="relative flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-secondary-foreground">
            <GraduationCap size={22} />
          </span>
          <span className="font-display text-2xl font-semibold">
            Mentor<span className="text-secondary">Lagbe</span>
          </span>
        </Link>

        <div className="relative">
          <Quote className="text-secondary" size={40} />
          <p className="mt-4 font-display text-3xl leading-snug">
            The right tutor doesn’t just teach a subject. They change how you learn.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-3"><BadgeCheck size={18} className="text-secondary" /> Admin-verified tutor listings</li>
            <li className="flex items-center gap-3"><ShieldCheck size={18} className="text-secondary" /> Secure, role-based access</li>
            <li className="flex items-center gap-3"><Sparkles size={18} className="text-secondary" /> Track every application in real time</li>
          </ul>
        </div>

        <p className="relative text-sm text-primary-foreground/60">
          Join 1,200+ students and 350+ verified tutors.
        </p>
      </div>

      {/* Right: form */}
      <div className="mx-auto flex w-full max-w-md flex-col justify-center py-4">
        <h1 className="font-display text-4xl font-semibold text-primary">{title}</h1>
        <p className="mt-2 text-foreground/60">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}