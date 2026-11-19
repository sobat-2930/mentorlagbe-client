import { UserPlus, SearchCheck, Send, GraduationCap } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create your account", text: "Sign up as a Student or Tutor in under a minute." },
  { icon: SearchCheck, title: "Search or post", text: "Students filter tuitions. Tutors publish batches for admin approval." },
  { icon: Send, title: "Apply & manage", text: "Students apply with a note. Tutors accept or reject applicants." },
  { icon: GraduationCap, title: "Start learning", text: "Accepted students begin sessions and leave a rating." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-primary text-primary-foreground">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="eyebrow !border-white/20 !bg-white/10 !text-secondary">How it works</span>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-primary-foreground sm:text-5xl">
            Four steps from “I need help” to “I got it”
          </h2>
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative h-full rounded-3xl border border-white/10 bg-white/5 p-7">
              <span className="absolute right-6 top-4 font-display text-6xl font-semibold text-white/10">
                0{i + 1}
              </span>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
                <s.icon size={26} />
              </span>
              <h3 className="mt-6 font-display text-xl text-primary-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}