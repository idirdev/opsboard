import { cn } from "@/lib/utils";
import { db } from "@/lib/db";
import { projects, tasks, users } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

async function getDashboardStats() {
  try {
    const [projectStats] = await db
      .select({
        total: sql<number>`count(*)`.mapWith(Number),
        completed: sql<number>`count(*) filter (where status = 'completed')`.mapWith(Number),
      })
      .from(projects);

    const [taskStats] = await db
      .select({ total: sql<number>`count(*)`.mapWith(Number) })
      .from(tasks);

    const [memberStats] = await db
      .select({ total: sql<number>`count(*)`.mapWith(Number) })
      .from(users);

    const totalProjects = projectStats?.total ?? 0;
    const completedProjects = projectStats?.completed ?? 0;
    const completionRate =
      totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;

    return [
      { name: "Total Projects", value: String(totalProjects), trend: "up" as const },
      { name: "Active Tasks", value: String(taskStats?.total ?? 0), trend: "up" as const },
      { name: "Team Members", value: String(memberStats?.total ?? 0), trend: "up" as const },
      { name: "Completion Rate", value: `${completionRate}%`, trend: "up" as const },
    ];
  } catch {
    return null;
  }
}

export async function StatsCards() {
  const stats = await getDashboardStats();

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {["Total Projects", "Active Tasks", "Team Members", "Completion Rate"].map((name) => (
          <div
            key={name}
            className="bg-white dark:bg-slate-900 rounded-xl border p-6 shadow-sm animate-pulse"
          >
            <p className="text-sm text-muted-foreground">{name}</p>
            <div className="mt-2 h-9 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white dark:bg-slate-900 rounded-xl border p-6 shadow-sm"
        >
          <p className="text-sm text-muted-foreground">{stat.name}</p>
          <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-bold">{stat.value}</p>
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                stat.trend === "up"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-600"
              )}
            >
              live
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
