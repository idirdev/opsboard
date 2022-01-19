"use client";

import { useState } from "react";
import { getStatusColor, getPriorityColor } from "@/lib/utils";

const mockProjects = [
  { id: "1", name: "Mobile App Redesign", description: "Complete overhaul of the mobile application", status: "active", priority: "high", members: 5, tasks: 24, completedTasks: 16 },
  { id: "2", name: "API v3 Migration", description: "Migrate legacy endpoints to v3 architecture", status: "active", priority: "critical", members: 3, tasks: 18, completedTasks: 8 },
  { id: "3", name: "Security Audit Q1", description: "Quarterly security assessment and fixes", status: "completed", priority: "high", members: 4, tasks: 12, completedTasks: 12 },
  { id: "4", name: "Design System", description: "Build unified component library", status: "planning", priority: "medium", members: 2, tasks: 30, completedTasks: 5 },
  { id: "5", name: "CI/CD Pipeline", description: "Automate build and deployment workflows", status: "on_hold", priority: "medium", members: 3, tasks: 15, completedTasks: 8 },
  { id: "6", name: "Data Analytics Platform", description: "Real-time analytics dashboard for business metrics", status: "active", priority: "high", members: 6, tasks: 28, completedTasks: 10 },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? mockProjects : mockProjects.filter((p) => p.status === filter);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">{mockProjects.length} total projects</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + New Project
        </button>
      </div>

      <div className="flex gap-2">
        {["all", "active", "planning", "on_hold", "completed"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === s ? "bg-blue-100 text-blue-700" : "text-slate-600 hover:bg-slate-100"
            }`}>
            {s === "all" ? "All" : s.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => (
          <div key={project.id} className="bg-white dark:bg-slate-900 rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold">{project.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(project.status)}`}>
                {project.status.replace("_", " ")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{Math.round((project.completedTasks / project.tasks) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(project.completedTasks / project.tasks) * 100}%` }} />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{project.completedTasks}/{project.tasks} tasks</span>
                <span className={getPriorityColor(project.priority)}>{project.priority}</span>
                <span>{project.members} members</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
