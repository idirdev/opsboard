import { getStatusColor } from "@/lib/utils";

const projects = [
  { name: "Mobile App Redesign", status: "active", progress: 68, members: 5 },
  { name: "API v3 Migration", status: "active", progress: 42, members: 3 },
  { name: "Security Audit Q1", status: "completed", progress: 100, members: 4 },
  { name: "Design System", status: "planning", progress: 15, members: 2 },
  { name: "CI/CD Pipeline", status: "on_hold", progress: 55, members: 3 },
];

export function ProjectsOverview() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="font-semibold">Projects</h2>
        <a href="/projects" className="text-sm text-blue-600 hover:underline">View all</a>
      </div>
      <div className="divide-y">
        {projects.map((project) => (
          <div key={project.name} className="p-4 px-6 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{project.name}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(project.status)}`}>
                  {project.status.replace("_", " ")}
                </span>
                <span className="text-xs text-muted-foreground">{project.members} members</span>
              </div>
            </div>
            <div className="w-32">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
