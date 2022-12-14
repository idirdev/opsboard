import { formatRelativeTime } from "@/lib/utils";
import { db } from "@/lib/db";
import { activityLogs, users } from "@/lib/db/schema";
import { desc, sql } from "drizzle-orm";

async function getRecentActivity() {
  try {
    const rows = await db
      .select({
        id: activityLogs.id,
        action: activityLogs.action,
        resource: activityLogs.resource,
        resourceId: activityLogs.resourceId,
        createdAt: activityLogs.createdAt,
        userName: users.name,
      })
      .from(activityLogs)
      .leftJoin(users, sql`${activityLogs.userId} = ${users.id}`)
      .orderBy(desc(activityLogs.createdAt))
      .limit(10);

    return rows;
  } catch {
    return null;
  }
}

export async function RecentActivity() {
  const activities = await getRecentActivity();

  if (!activities) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="font-semibold">Recent Activity</h2>
        </div>
        <div className="p-6 text-sm text-muted-foreground">
          Failed to load activity. Please try again.
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="font-semibold">Recent Activity</h2>
        </div>
        <div className="p-6 text-sm text-muted-foreground">No activity yet.</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="font-semibold">Recent Activity</h2>
      </div>
      <div className="divide-y">
        {activities.map((activity) => {
          const userName = activity.userName ?? "Unknown";
          return (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 px-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium shrink-0">
                {userName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{userName}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>{" "}
                  <span className="font-medium">
                    {activity.resource}
                    {activity.resourceId ? ` #${activity.resourceId}` : ""}
                  </span>
                </p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                {formatRelativeTime(activity.createdAt)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
