/**
 * =============================================================================
 * LANDING PAGE - VIBRANT 3D DESIGN
 * =============================================================================
 * Premium landing page showcasing all HostelOps facilities with
 * 3D effects, animated gradients, and interactive elements.
 * =============================================================================
 */
import Link from 'next/link';
import {
  AlertCircle,
  Bell,
  Search,
  Shield,
  Zap,
  BarChart3,
  Users,
  MessageSquare,
  Clock,
  CheckCircle2,
  Wrench,
  Lightbulb,
  Droplets,
  Sofa,
  Wifi,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient orbs with animation */}
        <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/25 to-blue-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[400px] bg-gradient-to-br from-emerald-500/20 to-teal-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {/* 3D Logo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-white"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            HostelOps
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2.5 text-slate-300 hover:text-white font-medium transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="relative group px-6 py-2.5 font-medium rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-all duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-white">Get Started</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 pt-16 pb-24 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent font-medium">
              Transparent · Accountable · Data-Driven
            </span>
          </div>

          {/* 3D Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1]">
            <span className="text-white drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]">
              Smart Hostel
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(232,121,249,0.4)]">
              Management
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Report issues instantly, track resolutions in real-time, manage announcements,
            and improve hostel facilities with powerful analytics.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/register"
              className="group relative px-8 py-4 rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 animate-gradient-x" />
              <div className="absolute inset-[2px] bg-slate-950 rounded-2xl" />
              <div className="absolute inset-[2px] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-2xl opacity-90" />
              <span className="relative flex items-center gap-2 text-white font-semibold">
                Start Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              View Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { value: '500+', label: 'Issues Resolved' },
              { value: '24/7', label: 'Support' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid with 3D Cards */}
      <section className="relative z-10 px-6 lg:px-12 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Comprehensive tools for students, staff, and administrators.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: AlertCircle,
              title: 'Issue Reporting',
              description: 'Report maintenance issues with photos, priority levels, and real-time tracking.',
              gradient: 'from-red-500 to-orange-500',
              delay: '0s',
            },
            {
              icon: Bell,
              title: 'Announcements',
              description: 'Stay updated with hostel-wide notices, events, and important updates.',
              gradient: 'from-amber-500 to-yellow-500',
              delay: '0.1s',
            },
            {
              icon: Search,
              title: 'Lost & Found',
              description: 'Report and search for lost items with image uploads and location tracking.',
              gradient: 'from-emerald-500 to-teal-500',
              delay: '0.2s',
            },
            {
              icon: BarChart3,
              title: 'Analytics Dashboard',
              description: 'Track KPIs, issue trends, and resolution times with visual charts.',
              gradient: 'from-blue-500 to-cyan-500',
              delay: '0.3s',
            },
            {
              icon: Users,
              title: 'Staff Management',
              description: 'Assign issues, track performance, and manage maintenance teams.',
              gradient: 'from-violet-500 to-purple-500',
              delay: '0.4s',
            },
            {
              icon: Shield,
              title: 'Secure & Private',
              description: 'Enterprise-grade security with role-based access and data encryption.',
              gradient: 'from-pink-500 to-rose-500',
              delay: '0.5s',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-500"
              style={{ animationDelay: feature.delay }}
            >
              <div className="relative h-full p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl overflow-hidden">
                {/* Hover glow effect */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                {/* Icon with 3D effect */}
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-[1px] mb-5 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Issue Categories Section */}
      <section className="relative z-10 px-6 lg:px-12 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Report Any Issue
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            From plumbing to security, we&apos;ve got all categories covered.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Droplets, label: 'Plumbing', color: 'from-blue-500 to-cyan-500' },
            { icon: Lightbulb, label: 'Electrical', color: 'from-yellow-500 to-amber-500' },
            { icon: Sofa, label: 'Furniture', color: 'from-orange-500 to-red-500' },
            { icon: Wrench, label: 'Maintenance', color: 'from-slate-500 to-zinc-500' },
            { icon: Wifi, label: 'Internet', color: 'from-emerald-500 to-green-500' },
            { icon: Lock, label: 'Security', color: 'from-violet-500 to-purple-500' },
            { icon: MessageSquare, label: 'Cleaning', color: 'from-pink-500 to-rose-500' },
            { icon: Zap, label: 'Appliances', color: 'from-indigo-500 to-blue-500' },
          ].map((category) => (
            <div
              key={category.label}
              className="group relative p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 backdrop-blur-sm transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} p-[1px] mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-white font-medium">{category.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 px-6 lg:px-12 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Simple 3-step process to get your issues resolved.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              icon: Zap,
              title: 'Report Issue',
              description: 'Submit your issue with details, photos, and priority level in under 30 seconds.',
            },
            {
              step: '02',
              icon: Clock,
              title: 'Track Progress',
              description: 'Watch real-time updates as staff is assigned and work begins on your issue.',
            },
            {
              step: '03',
              icon: CheckCircle2,
              title: 'Get Resolved',
              description: 'Receive notifications when your issue is resolved and rate the service.',
            },
          ].map((item, index) => (
            <div key={item.step} className="relative">
              {/* Connection line */}
              {index < 2 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-violet-500/50 to-transparent" />
              )}

              <div className="relative p-8 rounded-3xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-white/5 backdrop-blur-sm">
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-500/30">
                  {item.step}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-violet-400" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 lg:px-12 py-24 max-w-5xl mx-auto">
        <div className="relative p-12 md:p-16 rounded-[2.5rem] overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

          {/* Content */}
          <div className="relative text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Join hundreds of hostels already using HostelOps to streamline their operations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-violet-600 font-semibold rounded-2xl hover:bg-slate-100 transition-colors shadow-xl"
              >
                Create Free Account
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 lg:px-12 py-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 text-white"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-white font-semibold">HostelOps</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} HostelOps. Made with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}
