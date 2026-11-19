"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Star, BadgeCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/tuitions?search=${encodeURIComponent(q.trim())}`);
  };

  return (
    <section className="section relative overflow-hidden !pb-20">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">
            <BadgeCheck size={14} /> Verified tutors across Bangladesh
          </span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.08] text-primary sm:text-6xl">
            Find Your Ideal <span className="italic text-coral">Tutor</span> or Mentorship Batch Today
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
            Search by subject, class level, and budget. Apply in a minute and track every
            application in real time.
          </p>

          <form
            onSubmit={onSearch}
            className="mt-8 flex max-w-xl items-center gap-2 rounded-full border border-border bg-white p-2 pl-5 shadow-lg"
          >
            <Search size={20} className="shrink-0 text-foreground/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try “Physics”, “IELTS”, “Python”…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/40"
            />
            <Button type="submit" variant="brand" className="h-11 px-6">
              Find Tutors
            </Button>
          </form>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <div>
              <p className="font-display text-3xl font-semibold text-primary">1,200+</p>
              <p className="text-sm text-foreground/60">Active students</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-display text-3xl font-semibold text-primary">350+</p>
              <p className="text-sm text-foreground/60">Verified tutors</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-display text-3xl font-semibold text-primary">4.8★</p>
              <p className="text-sm text-foreground/60">Average rating</p>
            </div>
          </div>
        </motion.div>

        {/* Right illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto h-[460px] w-full max-w-md"
        >
          <div className="absolute inset-0 rotate-3 rounded-[2.5rem] bg-primary" />
          <div className="absolute inset-0 -rotate-2 rounded-[2.5rem] bg-secondary/80" />

          <div className="paper-card absolute inset-3 flex flex-col justify-between rounded-[2.2rem] !bg-background p-7">
            <div className="flex items-center gap-4">
              <img
                src="https://api.dicebear.com/9.x/initials/svg?seed=Nusrat%20Jahan&backgroundColor=0f3d33&textColor=f4b63f"
                alt="Tutor"
                className="h-16 w-16 rounded-2xl"
              />
              <div>
                <p className="font-display text-xl font-semibold text-primary">Nusrat Jahan</p>
                <p className="text-sm text-foreground/60">Higher Math · 6 yrs exp.</p>
              </div>
              <BadgeCheck className="ml-auto text-success" />
            </div>

            <div className="rounded-2xl bg-muted p-5">
              <p className="font-display text-lg text-primary">HSC Higher Math Batch</p>
              <p className="mt-1 text-sm text-foreground/60">Dhanmondi · 4 days/week</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-2xl text-coral">
                  ৳3000<span className="text-xs text-foreground/50">/mo</span>
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold">
                  <Star size={14} className="fill-secondary text-secondary" /> 4.9
                </span>
              </div>
            </div>

            <Button variant="brand" className="h-12 w-full">
              Apply Now
            </Button>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="paper-card absolute -left-6 top-10 flex items-center gap-3 !bg-white px-4 py-3"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-success/15 text-success">
              <Users size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-primary">Application accepted</p>
              <p className="text-xs text-foreground/50">just now</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="paper-card absolute -right-4 bottom-12 !bg-white px-4 py-3"
          >
            <p className="text-xs text-foreground/50">Top subject</p>
            <p className="font-display text-lg font-semibold text-primary">Physics ↗</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}