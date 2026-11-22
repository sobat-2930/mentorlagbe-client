export type Role = "student" | "tutor" | "admin";

export type AuthUser = {
  name: string;
  email: string;
  image?: string;
  role: Role;
  plan: "free" | "pro";
  phone?: string;
  bio?: string;
};
export type AppUser = AuthUser | null;

export type Tuition = {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "Online" | "Offline";
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  description: string;
  bannerImage?: string;
  schedule?: string;
  tutorName: string;
  tutorEmail: string;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
  createdAt: string;
};

export type PaginatedTuitions = {
  items: Tuition[];
  total: number;
  page: number;
  totalPages: number;
};

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
  paidAt: string;
};

export type AdminStats = {
  totalUsers: number;
  totalTutors: number;
  totalStudents: number;
  pendingTuitions: number;
  approvedTuitions: number;
  rejectedTuitions: number;
  totalTuitions: number;
  totalRevenue: number;
};