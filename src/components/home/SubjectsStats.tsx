import { Atom, Sigma, Code2, Languages, Star } from "lucide-react";

const subjects = [
  { icon: Sigma, name: "Math", count: "120+ batches" },
  { icon: Atom, name: "Physics", count: "95+ batches" },
  { icon: Code2, name: "Programming", count: "80+ batches" },
  { icon: Languages, name: "IELTS", count: "60+ batches" },
];

const reviews = [
  { name: "Rakib Hasan", role: "HSC Student", text: "Found a Physics tutor within a day. The application tracking is super clear." },
  { name: "Mahin Chowdhury", role: "Tutor", text: "Posting batches is easy and I get quality applicants every week." },
  { name: "Samira Noor", role: "Parent", text: "Verified profiles gave us confidence. My daughter's grades improved." },
];

export default function SubjectsStats() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="text-center">
          <span className="eyebrow">Popular subjects</span>
          <h2 className="section-title mt-4">Learn what matters most</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((s) => (
            <div key={s.name} className="paper-card h-full p-7 text-center transition hover:-translate-y-1">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-secondary/25 text-primary"><s.icon size={30} /></span>
              <h3 className="mt-5 font-display text-xl text-primary">{s.name}</h3>
              <p className="mt-1 text-sm text-base-content/60">{s.count}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 rounded-3xl bg-base-200 p-8 text-center lg:grid-cols-4">
          {[["1,200+", "Students"], ["350+", "Verified Tutors"], ["2,800+", "Applications"], ["4.8/5", "Avg. Rating"]].map(([n, l]) => (
            <div key={l}><p className="font-display text-4xl font-semibold text-accent">{n}</p><p className="mt-1 text-sm text-base-content/60">{l}</p></div>
          ))}
        </div>

        <div className="mt-16 grid gap-7 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="paper-card flex h-full flex-col p-7">
              <div className="flex gap-1 text-secondary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} className="fill-secondary" />)}</div>
              <blockquote className="mt-4 flex-1 leading-relaxed text-base-content/80">“{r.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${r.name}&backgroundColor=0f3d33&textColor=f4b63f`} alt={r.name} className="h-11 w-11 rounded-full" />
                <div><p className="text-sm font-bold text-primary">{r.name}</p><p className="text-xs text-base-content/50">{r.role}</p></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}