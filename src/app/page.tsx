import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm">O</div>
          <span className="text-xl font-semibold">OpsBoard</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-slate-300 hover:text-white transition-colors">Sign In</Link>
          <Link href="/register" className="text-sm bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors">Get Started</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto text-center pt-32 pb-20 px-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-8">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          Now in v1.2 — Webhooks & API improvements
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
          Operations,<br />Simplified.
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
          Manage projects, track team activity, and monitor operations from a single dashboard.
          Built for teams that ship fast.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/register" className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-lg font-medium transition-colors">Start Free</Link>
          <Link href="#features" className="border border-slate-700 hover:border-slate-500 px-8 py-3 rounded-lg font-medium transition-colors">Learn More</Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-32">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur">
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              { label: "Active Projects", value: "24", change: "+3" },
              { label: "Team Members", value: "18", change: "+2" },
              { label: "Tasks Completed", value: "342", change: "+28" },
            ].map((stat) => (
              <div key={stat.label} className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
                <span className="text-xs text-emerald-400">{stat.change} this week</span>
              </div>
            ))}
          </div>
          <div className="h-48 bg-slate-900/30 rounded-xl border border-slate-700/30 flex items-center justify-center text-slate-500">
            Activity Chart Preview
          </div>
        </div>
      </section>
    </main>
  );
}
