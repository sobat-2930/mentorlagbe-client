"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, BadgeCheck, Users } from "lucide-react";

export default function Hero() {
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <section className="section relative overflow-hidden !pb-20">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="eyebrow"><BadgeCheck size={14} /> Verified tutors across Bangladesh</span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.08] text-primary sm:text-6xl">
            Find Your Ideal <span className="italic text-accent">Tutor</span> or Mentorship Batch Today
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-base-content/70">
            Search by subject, class level, and budget. Apply in a minute and track every application in real time.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); router.push(`/tuitions?search=${encodeURIComponent(q)}`); }}
            className="mt-8 flex max-w-xl items-center gap-2 rounded-full border border-base-300 bg-white p-2 pl-5 shadow-lg">
            <Search size={20} className="text-base-content/40" />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Try “Physics”, “IELTS”, “Python”…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-base-content/40" />
            <button type="submit" className="btn-brand !h-11">Find Tutors</button>
          </form>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <div><p className="font-display text-3xl font-semibold text-primary">1,200+</p><p className="text-sm text-base-content/60">Active students</p></div>
            <div className="h-10 w-px bg-base-300" />
            <div><p className="font-display text-3xl font-semibold text-primary">350+</p><p className="text-sm text-base-content/60">Verified tutors</p></div>
            <div className="h-10 w-px bg-base-300" />
            <div><p className="font-display text-3xl font-semibold text-primary">4.8★</p><p className="text-sm text-base-content/60">Average rating</p></div>
          </div>
        </motion.div>

        {/* Illustration: pure CSS/cards, no external image */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto h-[460px] w-full max-w-md">
          <div className="absolute inset-0 rotate-3 rounded-[2.5rem] bg-primary" />
          <div className="absolute inset-0 -rotate-2 rounded-[2.5rem] bg-secondary/80" />
          <div className="paper-card absolute inset-3 flex flex-col justify-between rounded-[2.2rem] !bg-base-100 p-7">
            <div className="flex items-center gap-4">
              <img src="https://api.dicebear.com/9.x/initials/svg?seed=Nusrat%20Jahan&backgroundColor=0f3d33&textColor=f4b63f"
                alt="Tutor" className="h-16 w-16 rounded-2xl" />
              <div>
                <p className="font-display text-xl font-semibold text-primary">Nusrat Jahan</p>
                <p className="text-sm text-base-content/60">Higher Math · 6 yrs exp.</p>
              </div>
              <BadgeCheck className="ml-auto text-success" />
            </div>
            <div className="rounded-2xl bg-base-200 p-5">
              <p className="font-display text-lg text-primary">HSC Higher Math Batch</p>
              <p className="mt-1 text-sm text-base-content/60">Dhanmondi · 4 days/week</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-2xl text-accent">৳3000<span className="text-xs text-base-content/50">/mo</span></span>
                <span className="flex items-center gap-1 text-sm font-semibold"><Star size={14} className="fill-secondary text-secondary" /> 4.9</span>
              </div>
            </div>
            <button className="btn-brand w-full">Apply Now</button>
          </div>

          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}
            className="paper-card absolute -left-6 top-10 flex items-center gap-3 !bg-white px-4 py-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-success/15 text-success"><Users size={18} /></span>
            <div><p className="text-sm font-bold text-primary">Application accepted</p><p className="text-xs text-base-content/50">just now</p></div>
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 }}
            className="paper-card absolute -right-4 bottom-12 !bg-white px-4 py-3">
            <p className="text-xs text-base-content/50">Top subject</p>
            <p className="font-display text-lg font-semibold text-primary">Physics ↗</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}