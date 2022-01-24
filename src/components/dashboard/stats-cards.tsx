import { cn } from "@/lib/utils";

const stats = [
  { name: "Total Projects", value: "24", change: "+12%", trend: "up" },
  { name: "Active Tasks", value: "142", change: "+8%", trend: "up" },
  { name: "Team Members", value: "18", change: "+2", trend: "up" },
  { name: "Completion Rate", value: "87%", change: "+5%", trend: "up" },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white dark:bg-slate-900 rounded-xl border p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">{stat.name}</p>
          <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-bold">{stat.value}</p>
            <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full",
              stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            )}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
