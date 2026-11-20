import { mockTuitions, type Tuition } from "./mock-tuitions";
import type { AuthUser, Role } from "./demo-auth";

export type AppStatus = "pending" | "accepted" | "rejected";

export type Application = {
  _id: string;
  tuitionId: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorName: string;
  tutorEmail: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  preferredSchedule: string;
  studentNote: string;
  status: AppStatus;
  appliedAt: string;
};

export type ManagedUser = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  plan: "free" | "pro";
  createdAt: string;
};

export type Payment = {
  _id: string;
  userEmail: string;
  userName: string;
  userRole: "student" | "tutor";
  planName: string;
  amount: number;
  currency: string;
  transactionId: string;
  stripeSessionId: string;
  paymentStatus: "paid";
  paidAt: string;
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

const pick = (id: string) => mockTuitions.find((t) => t._id === id)!;

/* ---------- Student ---------- */
export function seedStudentApplications(user: AuthUser): Application[] {
  const rows: [string, AppStatus, string][] = [
    ["1", "accepted", "2026-11-12"],
    ["3", "pending", "2026-11-14"],
    ["4", "pending", "2026-11-15"],
    ["6", "rejected", "2026-11-10"],
    ["8", "accepted", "2026-11-16"],
  ];
  return rows.map(([id, status, date], i) => {
    const t = pick(id);
    return {
      _id: `app-${i + 1}`,
      tuitionId: t._id,
      tuitionTitle: t.title,
      subject: t.subject,
      monthlyFee: t.monthlyFee,
      tutorName: t.tutorName,
      tutorEmail: t.tutorEmail,
      studentName: user.name,
      studentEmail: user.email,
      studentPhone: "01712345678",
      preferredSchedule: "Evening, after 7 PM",
      studentNote: "I want to improve my fundamentals and score better in the upcoming exam.",
      status,
      appliedAt: date,
    };
  });
}

/* ---------- Tutor ---------- */
export function seedTutorTuitions(user: AuthUser): Tuition[] {
  const rows: [string, Tuition["approvalStatus"], boolean][] = [
    ["1", "approved", true],
    ["8", "pending", true],
    ["4", "approved", false],
  ];
  const list = rows.map(([id, approvalStatus, isActive], i) => ({
    ...pick(id),
    _id: `mine-${i + 1}`,
    tutorName: user.name,
    tutorEmail: user.email,
    approvalStatus,
    isActive,
  }));
  return user.plan === "free" ? list.slice(0, 2) : list;
}

const students = [
  ["Rakib Hasan", "rakib@example.com", "01711111111"],
  ["Samira Noor", "samira@example.com", "01822222222"],
  ["Mahin Chowdhury", "mahin@example.com", "01933333333"],
  ["Tasnim Ahmed", "tasnim@example.com", "01644444444"],
];

export function seedApplicants(tuitions: Tuition[]): Application[] {
  const statuses: AppStatus[] = ["pending", "accepted", "pending", "rejected", "pending", "accepted"];
  const out: Application[] = [];
  let n = 0;
  tuitions.forEach((t) => {
    for (let k = 0; k < 2; k++) {
      const s = students[n % students.length];
      out.push({
        _id: `ap-${n + 1}`,
        tuitionId: t._id,
        tuitionTitle: t.title,
        subject: t.subject,
        monthlyFee: t.monthlyFee,
        tutorName: t.tutorName,
        tutorEmail: t.tutorEmail,
        studentName: s[0],
        studentEmail: s[1],
        studentPhone: s[2],
        preferredSchedule: k ? "Weekend mornings" : "Evening, after 7 PM",
        studentNote: "I am a serious learner and can attend every class. Please consider my application.",
        status: statuses[n % statuses.length],
        appliedAt: `2026-11-${String(10 + n).padStart(2, "0")}`,
      });
      n++;
    }
  });
  return out;
}

/* ---------- Admin ---------- */
export function seedAdminTuitions(): Tuition[] {
  return [
    ...mockTuitions,
    { ...mockTuitions[5], _id: "14", title: "Weekend Spoken English Club", tutorName: "Yusuf Karim", tutorEmail: "yusuf@example.com", approvalStatus: "pending", createdAt: "2026-11-17" },
    { ...mockTuitions[4], _id: "15", title: "Guaranteed A+ in 7 Days", tutorName: "Fake Tutor", tutorEmail: "fake@example.com", approvalStatus: "rejected", createdAt: "2026-11-16" },
  ];
}

export const mockUsers: ManagedUser[] = [
  { _id: "u1", name: "Arif Rahman", email: "arif@example.com", role: "tutor", plan: "pro", createdAt: "2026-08-02" },
  { _id: "u2", name: "Nusrat Jahan", email: "nusrat@example.com", role: "tutor", plan: "pro", createdAt: "2026-08-14" },
  { _id: "u3", name: "Tanvir Hasan", email: "tanvir@example.com", role: "tutor", plan: "free", createdAt: "2026-09-01" },
  { _id: "u4", name: "Sadia Islam", email: "sadia@example.com", role: "tutor", plan: "free", createdAt: "2026-09-10" },
  { _id: "u5", name: "Rakib Hasan", email: "rakib@example.com", role: "student", plan: "pro", createdAt: "2026-09-18" },
  { _id: "u6", name: "Samira Noor", email: "samira@example.com", role: "student", plan: "free", createdAt: "2026-10-02" },
  { _id: "u7", name: "Mahin Chowdhury", email: "mahin@example.com", role: "student", plan: "free", createdAt: "2026-10-09" },
  { _id: "u8", name: "Tasnim Ahmed", email: "tasnim@example.com", role: "student", plan: "pro", createdAt: "2026-10-20" },
  { _id: "u9", name: "Mahbub Alam", email: "mahbub@example.com", role: "tutor", plan: "free", createdAt: "2026-10-25" },
  { _id: "u10", name: "Site Admin", email: "admin@mentorlagbe.com", role: "admin", plan: "free", createdAt: "2026-07-01" },
];

export const mockPayments: Payment[] = [
  { _id: "p1", userEmail: "arif@example.com", userName: "Arif Rahman", userRole: "tutor", planName: "Pro Tutor Plan", amount: 15, currency: "USD", transactionId: "pi_3Q8xA1", stripeSessionId: "cs_test_a1b2c3", paymentStatus: "paid", paidAt: "2026-08-03" },
  { _id: "p2", userEmail: "nusrat@example.com", userName: "Nusrat Jahan", userRole: "tutor", planName: "Pro Tutor Plan", amount: 15, currency: "USD", transactionId: "pi_3Q8xB2", stripeSessionId: "cs_test_d4e5f6", paymentStatus: "paid", paidAt: "2026-08-15" },
  { _id: "p3", userEmail: "rakib@example.com", userName: "Rakib Hasan", userRole: "student", planName: "Pro Student Plan", amount: 10, currency: "USD", transactionId: "pi_3Q8xC3", stripeSessionId: "cs_test_g7h8i9", paymentStatus: "paid", paidAt: "2026-09-19" },
  { _id: "p4", userEmail: "tasnim@example.com", userName: "Tasnim Ahmed", userRole: "student", planName: "Pro Student Plan", amount: 10, currency: "USD", transactionId: "pi_3Q8xD4", stripeSessionId: "cs_test_j1k2l3", paymentStatus: "paid", paidAt: "2026-10-21" },
  { _id: "p5", userEmail: "sadia@example.com", userName: "Sadia Islam", userRole: "tutor", planName: "Pro Tutor Plan", amount: 15, currency: "USD", transactionId: "pi_3Q8xE5", stripeSessionId: "cs_test_m4n5o6", paymentStatus: "paid", paidAt: "2026-10-28" },
  { _id: "p6", userEmail: "mahin@example.com", userName: "Mahin Chowdhury", userRole: "student", planName: "Pro Student Plan", amount: 10, currency: "USD", transactionId: "pi_3Q8xF6", stripeSessionId: "cs_test_p7q8r9", paymentStatus: "paid", paidAt: "2026-11-05" },
];