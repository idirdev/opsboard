const distribution = [
  { label: "To Do", count: 24, color: "bg-slate-400" },
  { label: "In Progress", count: 18, color: "bg-blue-500" },
  { label: "In Review", count: 8, color: "bg-purple-500" },
  { label: "Completed", count: 92, color: "bg-emerald-500" },
];

export function TaskDistribution() {
  const total = distribution.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm p-6">
      <h2 className="font-semibold mb-4">Task Distribution</h2>
      <div className="flex h-3 rounded-full overflow-hidden mb-4">
        {distribution.map((d) => (
          <div key={d.label} className={`${d.color} transition-all`} style={{ width: `${(d.count / total) * 100}%` }} />
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
