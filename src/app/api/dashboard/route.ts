import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects, tasks, users, activityLogs } from "@/lib/db/schema";
import { sql, desc } from "drizzle-orm";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // Total projects and completed projects (for completion rate)
    const projectStats = await db
      .select({
        total: sql<number>`count(*)`.mapWith(Number),
        completed: sql<number>`count(*) filter (where status = 'completed')`.mapWith(Number),
        active: sql<number>`count(*) filter (where status = 'active')`.mapWith(Number),
      })
      .from(projects);

    // Task distribution by status
    const taskStats = await db
      .select({
        status: tasks.status,
        count: sql<number>`count(*)`.mapWith(Number),
      })
      .from(tasks)
      .groupBy(tasks.status);

    // Total team members
    const memberStats = await db
      .select({ total: sql<number>`count(*)`.mapWith(Number) })
      .from(users);

    // Recent projects (for projects overview widget)
    const recentProjects = await db
      .select({
        id: projects.id,
        name: projects.name,
        status: projects.status,
      })
      .from(projects)
      .orderBy(desc(projects.createdAt))
      .limit(5);

    // Recent activity logs
    const recentActivity = await db
      .select({
        id: activityLogs.id,
        userId: activityLogs.userId,
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

    const totalProjects = projectStats[0]?.total ?? 0;
    const completedProjects = projectStats[0]?.completed ?? 0;
    const completionRate =
      totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;

    const totalMembers = memberStats[0]?.total ?? 0;

    const taskStatusMap: Record<string, number> = {};
    for (const row of taskStats) {
      taskStatusMap[row.status] = row.count;
    }
    const totalTasks = Object.values(taskStatusMap).reduce((s, v) => s + v, 0);

    return NextResponse.json({
      stats: {
        totalProjects,
        activeTasks: totalTasks,
        teamMembers: totalMembers,
        completionRate,
      },
      taskDistribution: {
        todo: taskStatusMap["todo"] ?? 0,
        in_progress: taskStatusMap["in_progress"] ?? 0,
        in_review: taskStatusMap["in_review"] ?? 0,
        completed: taskStatusMap["completed"] ?? 0,
      },
      recentProjects,
      recentActivity,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
