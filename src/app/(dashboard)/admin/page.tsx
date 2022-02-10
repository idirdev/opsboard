const systemStats = [
  { label: "CPU Usage", value: "42%", status: "healthy" },
  { label: "Memory", value: "6.2 / 16 GB", status: "healthy" },
  { label: "Disk", value: "67% used", status: "warning" },
  { label: "API Latency", value: "45ms", status: "healthy" },
];

const recentUsers = [
  { name: "Sarah Chen", email: "sarah@company.com", role: "admin", joined: "2024-12-01" },
  { name: "Marcus Johnson", email: "marcus@company.com", role: "manager", joined: "2024-12-15" },
  { name: "Emily Park", email: "emily@company.com", role: "member", joined: "2025-01-03" },
];

export default function AdminPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-sm text-muted-foreground">System overview and user management</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {systemStats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-xl border p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className={`w-2 h-2 rounded-full ${stat.status === "healthy" ? "bg-emerald-500" : "bg-amber-500"}`} />
            </div>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border">
        <div className="p-6 border-b"><h2 className="font-semibold">Recent Users</h2></div>
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50 dark:bg-slate-800/50">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">User</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Role</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase px-6 py-3">Joined</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {recentUsers.map((user) => (
              <tr key={user.email} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4"><p className="text-sm font-medium">{user.name}</p><p className="text-xs text-muted-foreground">{user.email}</p></td>
                <td className="px-6 py-4 text-sm">{user.role}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{user.joined}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm text-blue-600 hover:underline mr-3">Edit</button>
                  <button className="text-sm text-red-600 hover:underline">Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
