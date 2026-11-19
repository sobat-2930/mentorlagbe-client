import { mockTuitions, type Tuition } from "./mock-tuitions";

export type TuitionQuery = {
  search?: string;
  subject?: string;
  classLevel?: string;
  mode?: string;
  page?: number;
  limit?: number;
};

export const filterOptions = {
  subjects: ["Math", "Physics", "Chemistry", "Biology", "English", "IELTS", "Programming", "ICT"],
  classLevels: ["SSC", "HSC", "Admission", "University", "Any"],
  modes: ["Online", "Offline"],
};

// TODO (backend phase): eta fetch(`${API}/api/tuitions?search=..&page=..`) diye replace hobe
export async function getTuitions(q: TuitionQuery = {}) {
  const limit = q.limit ?? 6;
  const term = q.search?.trim().toLowerCase();

  let list = mockTuitions.filter((t) => t.approvalStatus === "approved" && t.isActive);

  if (term) {
    list = list.filter(
      (t) => t.title.toLowerCase().includes(term) || t.subject.toLowerCase().includes(term)
    );
  }
  if (q.subject && q.subject !== "all") list = list.filter((t) => t.subject === q.subject);
  if (q.classLevel && q.classLevel !== "all") list = list.filter((t) => t.classLevel === q.classLevel);
  if (q.mode && q.mode !== "all") list = list.filter((t) => t.mode === q.mode);

  list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const page = Math.min(Math.max(1, q.page || 1), totalPages);

  return { items: list.slice((page - 1) * limit, page * limit), total, page, totalPages };
}

export async function getTuitionById(id: string): Promise<Tuition | null> {
  const t = mockTuitions.find((x) => x._id === id);
  return t && t.approvalStatus === "approved" && t.isActive ? t : null;
}