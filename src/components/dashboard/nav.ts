import {
  BookOpen, CirclePlus, CircleUserRound, ClipboardList, LayoutDashboard,
  ListChecks, Receipt, Users, type LucideIcon,
} from "lucide-react";
import type { Role } from "@/lib/demo-auth";

export type NavItem = { href: string; label: string; icon: LucideIcon };

const profile: NavItem = { href: "/dashboard/profile", label: "Update Profile", icon: CircleUserRound };

export const navByRole: Record<Role, NavItem[]> = {
  student: [
    { href: "/dashboard/student", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/student/my-applications", label: "My Applications", icon: ClipboardList },
    profile,
  ],
  tutor: [
    { href: "/dashboard/tutor", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/tutor/post-tuition", label: "Post a Tuition", icon: CirclePlus },
    { href: "/dashboard/tutor/my-tuitions", label: "My Tuitions", icon: BookOpen },
    { href: "/dashboard/tutor/applicants", label: "Applicants", icon: Users },
    profile,
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "User Management", icon: Users },
    { href: "/dashboard/admin/tuitions", label: "Tuition Approval", icon: ListChecks },
    { href: "/dashboard/admin/transactions", label: "Transactions", icon: Receipt },
    profile,
  ],
};