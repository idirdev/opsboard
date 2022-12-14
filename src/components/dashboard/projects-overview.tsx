import { getStatusColor } from "@/lib/utils";
import { db } from "@/lib/db";
import { projects, projectMembers, tasks } from "@/lib/db/schema";
import { desc, sql } from "drizzle-orm";

async function getProjectsOverview() {
  try {
    const rows = await db
      .select({
        id: projects.id,
        name: projects.name,
        status: projects.status,
        memberCount: sql<number>`(
          select count(*) from ${projectMembers} where ${projectMembers.projectId} = ${projects.id}
        )`.mapWith(Number),
        taskTotal: sql<number>`(
          select count(*) from ${tasks} where ${tasks.projectId} = ${projects.id}
        )`.mapWith(Number),
        taskDone: sql<number>`(
          select count(*) from ${tasks}
          where ${tasks.projectId} = ${projects.id} and ${tasks.status} = 'completed'
        )`.mapWith(Number),
      })
      .from(projects)
      .orderBy(desc(projects.createdAt))
      .limit(5);

    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      status: r.status,
      members: r.memberCount,
      progress: r.taskTotal > 0 ? Math.round((r.taskDone / r.taskTotal) * 100) : 0,
    }));
  } catch {
    return null;
  }
}

export async function ProjectsOverview() {
  const projectList = await getProjectsOverview();

  if (!projectList) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="font-semibold">Projects</h2>
          <a href="/projects" className="text-sm text-blue-600 hover:underline">View all</a>
        </div>
        <div className="p-6 text-sm text-muted-foreground">
          Failed to load projects. Please try again.
        </div>
      </div>
    );
  }

  if (projectList.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="font-semibold">Projects</h2>
          <a href="/projects" className="text-sm text-blue-600 hover:underline">View all</a>
        </div>
        <div className="p-6 text-sm text-muted-foreground">No projects yet.</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="font-semibold">Projects</h2>
        <a href="/projects" className="text-sm text-blue-600 hover:underline">View all</a>
      </div>
      <div className="divide-y">
        {projectList.map((project) => (
          <div
            key={project.id}
            className="p-4 px-6 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{project.name}</p>
              <div className="flex items-center gap-3 mt-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(project.status)}`}
                >
                  {project.status.replace("_", " ")}
                </span>
                <span className="text-xs text-muted-foreground">
                  {project.members} members
                </span>
              </div>
            </div>
            <div className="w-32">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
