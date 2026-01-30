/**
 * =============================================================================
 * LANDING PAGE
 * =============================================================================
 * Modern landing page for HostelOps with hero section.
 * =============================================================================
 */
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        {/* Animated background orbs */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-white"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">HostelOps</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-5 py-2.5 text-slate-300 hover:text-white font-medium transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-8 pt-20 pb-32 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-slate-300">
            Transparent. Accountable. Data-Driven.
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Smart Hostel{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Issue Tracking
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Report issues in seconds, track resolutions in real-time, and help
          improve hostel facilities with data-driven insights.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/register"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-xl shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
          >
            Report Your First Issue →
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 transition-all duration-300"
          >
            I Have an Account
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 w-full">
          {[
            {
              icon: '⚡',
              title: 'Lightning Fast',
              description: 'Report issues in under 30 seconds with our streamlined form.',
            },
            {
              icon: '📊',
              title: 'Real-time Tracking',
              description: 'Watch your issues move from reported to resolved instantly.',
            },
            {
              icon: '🔒',
              title: 'Privacy First',
              description: 'Choose between public or private issue reporting.',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <span className="text-3xl mb-4 block">{feature.icon}</span>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
