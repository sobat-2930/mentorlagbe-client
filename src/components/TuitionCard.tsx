import Link from "next/link";
import { MapPin, CalendarDays, Wifi, Building2 } from "lucide-react";
import type { Tuition } from "@/lib/mock-tuitions";

const gradients: Record<string, string> = {
  Physics: "from-[#0f3d33] to-[#1d6b57]",
  Math: "from-[#e4572e] to-[#f08a4b]",
  IELTS: "from-[#2f80c8] to-[#56a6e8]",
  Programming: "from-[#3b2a6b] to-[#6a4fc0]",
  Chemistry: "from-[#2e9e6b] to-[#6ccf9c]",
  English: "from-[#c48a14] to-[#f4b63f]",
};

export default function TuitionCard({ t }: { t: Tuition }) {
  return (
    <article className="paper-card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1.5 hover:shadow-2xl">
      {t.bannerImage ? (
        <img src={t.bannerImage} alt={t.title} className="h-44 w-full object-cover" />
      ) : (
        <div className={`relative h-44 w-full bg-gradient-to-br ${gradients[t.subject] || "from-primary to-primary"}`}>
          <span className="absolute bottom-3 left-4 font-display text-5xl font-semibold text-white/25">{t.subject}</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="badge badge-secondary font-semibold">{t.subject}</span>
          <span className="badge badge-outline">{t.classLevel}</span>
          <span className="badge badge-outline gap-1">
            {t.mode === "Online" ? <Wifi size={12} /> : <Building2 size={12} />} {t.mode}
          </span>
        </div>
        <h3 className="font-display text-xl font-semibold leading-snug text-primary">{t.title}</h3>
        <p className="mt-1 text-sm text-base-content/60">by {t.tutorName}</p>
        <div className="mt-4 space-y-1.5 text-sm text-base-content/70">
          <p className="flex items-center gap-2"><MapPin size={14} /> {t.location}</p>
          <p className="flex items-center gap-2"><CalendarDays size={14} /> {t.daysPerWeek} days / week</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-6">
          <p className="font-display text-2xl font-semibold text-accent">
            ৳{t.monthlyFee}<span className="text-xs font-sans font-medium text-base-content/50"> /mo</span>
          </p>
          <Link href={`/tuitions/${t._id}`} className="btn-brand !btn-sm !h-10">View Details</Link>
        </div>
      </div>
    </article>
  );
}