import { Suspense } from "react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { ProjectsOverview } from "@/components/dashboard/projects-overview";
import { TaskDistribution } from "@/components/dashboard/task-distribution";

function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white dark:bg-slate-900 rounded-xl border shadow-sm p-6 animate-pulse ${className}`}>
      <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
      <div className="h-8 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
    </div>
  );
}

function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
    </div>
  );
}

function PanelSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white dark:bg-slate-900 rounded-xl border shadow-sm animate-pulse ${className}`}>
      <div className="p-6 border-b">
        <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
      <div className="p-6 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 bg-slate-200 dark:bg-slate-700 rounded" />
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your workspace</p>
      </div>
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards />
      </Suspense>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Suspense fallback={<PanelSkeleton />}>
            <ProjectsOverview />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<CardSkeleton />}>
            <TaskDistribution />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<PanelSkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}
