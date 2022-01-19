"use client";

import { getInitials } from "@/lib/utils";

const members = [
  { id: "1", name: "Sarah Chen", email: "sarah@company.com", role: "admin", status: "online", projects: 5 },
  { id: "2", name: "Marcus Johnson", email: "marcus@company.com", role: "manager", status: "online", projects: 3 },
  { id: "3", name: "Emily Park", email: "emily@company.com", role: "member", status: "away", projects: 4 },
  { id: "4", name: "Alex Rivera", email: "alex@company.com", role: "member", status: "online", projects: 2 },
  { id: "5", name: "Jordan Lee", email: "jordan@company.com", role: "member", status: "offline", projects: 3 },
  { id: "6", name: "Taylor Kim", email: "taylor@company.com", role: "viewer", status: "online", projects: 1 },
];

const statusColor: Record<string, string> = { online: "bg-emerald-500", away: "bg-amber-500", offline: "bg-slate-300" };
const roleColor: Record<string, string> = { admin: "bg-red-100 text-red-700", manager: "bg-purple-100 text-purple-700", member: "bg-blue-100 text-blue-700", viewer: "bg-slate-100 text-slate-700" };

export default function TeamPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-sm text-muted-foreground">{members.length} members</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Invite Member</button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50 dark:bg-slate-800/50">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Member</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Role</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Projects</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">{getInitials(member.name)}</div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${statusColor[member.status]} rounded-full border-2 border-white dark:border-slate-900`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded-full font-medium ${roleColor[member.role]}`}>{member.role}</span></td>
                <td className="px-6 py-4"><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${statusColor[member.status]}`} /><span className="text-sm capitalize">{member.status}</span></div></td>
                <td className="px-6 py-4 text-sm">{member.projects} projects</td>
                <td className="px-6 py-4 text-right"><button className="text-sm text-slate-500 hover:text-slate-700">...</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
