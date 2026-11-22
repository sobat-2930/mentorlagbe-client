import type { PaginatedTuitions, Tuition } from "./types";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const filterOptions = {
  subjects: ["Math", "Physics", "Chemistry", "Biology", "English", "IELTS", "Programming", "ICT"],
  classLevels: ["SSC", "HSC", "Admission", "University", "Any"],
  modes: ["Online", "Offline"],
};

export const subjectGradients: Record<string, string> = {
  Physics: "from-[#0f3d33] to-[#1d6b57]",
  Math: "from-[#e4572e] to-[#f08a4b]",
  IELTS: "from-[#2f80c8] to-[#56a6e8]",
  Programming: "from-[#3b2a6b] to-[#6a4fc0]",
  Chemistry: "from-[#2e9e6b] to-[#6ccf9c]",
  English: "from-[#c48a14] to-[#f4b63f]",
  Biology: "from-[#1f7a5a] to-[#8fd694]",
  ICT: "from-[#374151] to-[#6b7280]",
};

export type TuitionQuery = {
  search?: string;
  subject?: string;
  classLevel?: string;
  mode?: string;
  page?: number;
  limit?: number;
};

// Server-side search, filter ar pagination: sob MongoDB te hoy
export async function getTuitions(q: TuitionQuery = {}): Promise<PaginatedTuitions> {
  const params = new URLSearchParams();
  (["search", "subject", "classLevel", "mode"] as const).forEach((k) => {
    const v = q[k];
    if (v) params.set(k, v);
  });
  if (q.page) params.set("page", String(q.page));
  params.set("limit", String(q.limit ?? 6));

  const res = await fetch(`${API}/api/tuitions?${params.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Could not load tuitions. Please try again.");
  return res.json();
}

export async function getLatestTuitions(): Promise<Tuition[]> {
  const res = await fetch(`${API}/api/tuitions/latest`, { cache: "no-store" });
  if (!res.ok) throw new Error("Could not load tuitions");
  return res.json();
}

export async function getTuitionById(id: string): Promise<Tuition | null> {
  const res = await fetch(`${API}/api/tuitions/${encodeURIComponent(id)}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Could not load tuition");
  return res.json();
}