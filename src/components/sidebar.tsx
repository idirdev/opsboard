"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { name: "Projects", href: "/projects", icon: "FolderKanban" },
  { name: "Team", href: "/team", icon: "Users" },
  { name: "Activity", href: "/activity", icon: "Activity" },
  { name: "Files", href: "/files", icon: "Paperclip" },
  { name: "Notifications", href: "/notifications", icon: "Bell" },
  { name: "Webhooks", href: "/webhooks", icon: "Webhook" },
  { name: "Settings", href: "/settings", icon: "Settings" },
];

const adminNav = [
  { name: "Admin Panel", href: "/admin", icon: "Shield" },
  { name: "System Health", href: "/admin/health", icon: "HeartPulse" },
  { name: "Audit Logs", href: "/admin/audit", icon: "ScrollText" },
];

interface SidebarProps {
  user: any;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const isAdmin = user?.role === "admin";

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r flex flex-col">
      <div className="p-6 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">O</div>
          <span className="font-semibold text-lg">OpsBoard</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-3">Workspace</p>
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            )}
          >
            {item.name}
          </Link>
        ))}

        {isAdmin && (
          <>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-6 mb-3 px-3">Administration</p>
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname.startsWith(item.href)
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                )}
              >
                {item.name}
              </Link>
            ))}
          </>
        )}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
