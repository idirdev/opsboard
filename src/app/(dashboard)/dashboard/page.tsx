import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { ProjectsOverview } from "@/components/dashboard/projects-overview";
import { TaskDistribution } from "@/components/dashboard/task-distribution";

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your workspace</p>
      </div>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProjectsOverview />
        </div>
        <div>
          <TaskDistribution />
        </div>
      </div>
      <RecentActivity />
    </div>
  );
}
