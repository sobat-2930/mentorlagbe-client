import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, Building2, CalendarDays, Clock, GraduationCap, MapPin, Wifi } from "lucide-react";
import ApplyForm from "@/components/tuitions/ApplyForm";
import { Badge } from "@/components/ui/badge";
import { getTuitionById, subjectGradients } from "@/lib/tuitions";

type Props = { params: Promise<{ id: string }> };

export default async function TuitionDetailsPage({ params }: Props) {
  const { id } = await params;
  const t = await getTuitionById(id);
  if (!t) notFound();

  const posted = new Date(t.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric", timeZone: "UTC",
  });

  const info = [
    { icon: GraduationCap, label: "Class Level", value: t.classLevel },
    { icon: Clock, label: "Schedule", value: t.schedule || "Flexible, agreed with the tutor" },
    { icon: t.mode === "Online" ? Wifi : Building2, label: "Mode", value: `${t.mode} · ${t.location}` },
    { icon: CalendarDays, label: "Days / Week", value: `${t.daysPerWeek} days` },
  ];

  return (
    <section className="container-x py-10">
      <Link href="/tuitions" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
        <ArrowLeft size={16} /> Back to all tuitions
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {t.bannerImage ? (
            <img src={t.bannerImage} alt={t.title} className="h-64 w-full rounded-3xl object-cover sm:h-80" />
          ) : (
            <div className={`relative h-64 w-full overflow-hidden rounded-3xl bg-gradient-to-br sm:h-80 ${subjectGradients[t.subject] || "from-primary to-primary"}`}>
              <span className="absolute bottom-4 left-6 font-display text-7xl font-semibold text-white/25 sm:text-8xl">{t.subject}</span>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-2">
            <Badge variant="secondary">{t.subject}</Badge>
            <Badge variant="outline">{t.classLevel}</Badge>
            <Badge variant="outline">{t.mode}</Badge>
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-primary sm:text-5xl">{t.title}</h1>
          <p className="mt-2 text-sm text-foreground/50">Posted on {posted}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {info.map((i) => (
              <div key={i.label} className="paper-card flex items-center gap-4 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary/25 text-primary">
                  <i.icon size={22} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-foreground/50">{i.label}</p>
                  <p className="font-semibold text-primary">{i.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl text-primary">About this tuition</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-foreground/75">{t.description}</p>
          </div>

          <div className="paper-card mt-10 p-6">
            <h2 className="font-display text-2xl text-primary">Your tutor</h2>
            <div className="mt-5 flex items-center gap-4">
              <img
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(t.tutorName)}&backgroundColor=0f3d33&textColor=f4b63f`}
                alt={t.tutorName}
                className="h-16 w-16 rounded-2xl"
              />
              <div>
                <p className="flex items-center gap-2 font-display text-xl text-primary">
                  {t.tutorName} <BadgeCheck size={18} className="text-success" />
                </p>
                <p className="text-sm text-foreground/60">Admin-approved listing on MentorLagbe</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="paper-card p-6">
            <p className="text-sm text-foreground/60">Monthly fee</p>
            <p className="font-display text-4xl font-semibold text-coral">
              ৳{t.monthlyFee}<span className="font-sans text-sm font-medium text-foreground/50"> /month</span>
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-foreground/60">
              <MapPin size={14} /> {t.location}
            </p>
            <div className="my-6 h-px bg-border" />
            <h2 className="mb-4 font-display text-xl text-primary">Apply for this tuition</h2>
            <ApplyForm tuitionId={t._id} tuitionTitle={t.title} />
          </div>
        </aside>
      </div>
    </section>
  );
}