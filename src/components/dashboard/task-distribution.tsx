import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

const STATUS_CONFIG = [
  { key: "todo", label: "To Do", color: "bg-slate-400" },
  { key: "in_progress", label: "In Progress", color: "bg-blue-500" },
  { key: "in_review", label: "In Review", color: "bg-purple-500" },
  { key: "completed", label: "Completed", color: "bg-emerald-500" },
] as const;

async function getTaskDistribution() {
  try {
    const rows = await db
      .select({
        status: tasks.status,
        count: sql<number>`count(*)`.mapWith(Number),
      })
      .from(tasks)
      .groupBy(tasks.status);

    const map: Record<string, number> = {};
    for (const r of rows) map[r.status] = r.count;

    return STATUS_CONFIG.map((s) => ({ ...s, count: map[s.key] ?? 0 }));
  } catch {
    return null;
  }
}

export async function TaskDistribution() {
  const distribution = await getTaskDistribution();

  if (!distribution) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm p-6">
        <h2 className="font-semibold mb-4">Task Distribution</h2>
        <p className="text-sm text-muted-foreground">Failed to load data. Please try again.</p>
      </div>
    );
  }

  const total = distribution.reduce((s, d) => s + d.count, 0);

  if (total === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm p-6">
        <h2 className="font-semibold mb-4">Task Distribution</h2>
        <p className="text-sm text-muted-foreground">No tasks yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm p-6">
      <h2 className="font-semibold mb-4">Task Distribution</h2>
      <div className="flex h-3 rounded-full overflow-hidden mb-4">
        {distribution.map((d) => (
          <div
            key={d.label}
            className={`${d.color} transition-all`}
            style={{ width: `${(d.count / total) * 100}%` }}
          />
        ))}
      </div>
      <div className="space-y-3">
        {distribution.map((d) => (
          <div key={d.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${d.color}`} />
              <span className="text-sm">{d.label}</span>
            </div>
            <span className="text-sm font-medium">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
