import { formatRelativeTime } from "@/lib/utils";

const activities = [
  { id: 1, user: "Sarah Chen", action: "created project", target: "Mobile App Redesign", time: new Date(Date.now() - 1000 * 60 * 5) },
  { id: 2, user: "Marcus Johnson", action: "completed task", target: "API Integration Tests", time: new Date(Date.now() - 1000 * 60 * 30) },
  { id: 3, user: "Emily Park", action: "added comment on", target: "Database Migration Plan", time: new Date(Date.now() - 1000 * 60 * 120) },
  { id: 4, user: "Alex Rivera", action: "deployed", target: "Production v2.1.0", time: new Date(Date.now() - 1000 * 60 * 180) },
  { id: 5, user: "Jordan Lee", action: "invited", target: "new team member", time: new Date(Date.now() - 1000 * 60 * 300) },
];

export function RecentActivity() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="font-semibold">Recent Activity</h2>
      </div>
      <div className="divide-y">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 p-4 px-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium shrink-0">
              {activity.user[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>{" "}
                <span className="font-medium">{activity.target}</span>
              </p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{formatRelativeTime(activity.time)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
