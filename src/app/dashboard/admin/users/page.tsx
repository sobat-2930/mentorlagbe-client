"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Search, Users } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import { formatDate, mockUsers, type ManagedUser } from "@/lib/dashboard-data";
import type { Role } from "@/lib/demo-auth";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ManagedUser[]>(mockUsers);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const visible = q ? users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) : users;

  const changeRole = (id: string, role: Role) => {
    // TODO (backend phase): PATCH /api/admin/users/:id/role (verifyAdmin)
    setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
    toast.success(`Role updated to ${role}`);
  };

  return (
    <>
      <PageHeader title="User Management" subtitle={`${users.length} registered users. Manage their roles here.`} />

      <div className="relative mb-6 max-w-md">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email…"
          className="h-12 w-full rounded-full border border-input bg-white pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {visible.length === 0 ? (
        <EmptyState icon={Users} title="No users found" text="Try a different name or email." />
      ) : (
        <div className="paper-card overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-muted/60 text-xs uppercase tracking-wider text-foreground/60">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Plan</th>
                <th className="px-5 py-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visible.map((u) => (
                <tr key={u._id} className="hover:bg-muted/40">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(u.name)}&backgroundColor=0f3d33&textColor=f4b63f`}
                        alt={u.name}
                        className="h-10 w-10 rounded-xl"
                      />
                      <div>
                        <p className="font-semibold text-primary">{u.name}</p>
                        <p className="text-xs text-foreground/50">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={u.role}
                      onChange={(e) => changeRole(u._id, e.target.value as Role)}
                      aria-label={`Role for ${u.name}`}
                      className="h-10 rounded-xl border border-input bg-white px-3 text-sm font-semibold capitalize outline-none focus:border-primary"
                    >
                      <option value="student">student</option>
                      <option value="tutor">tutor</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={u.plan} /></td>
                  <td className="px-5 py-4 text-foreground/70">{formatDate(u.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}