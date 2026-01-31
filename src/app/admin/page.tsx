/**
 * =============================================================================
 * ADMIN DASHBOARD PAGE - LIGHT PURPLE THEME
 * =============================================================================
 * Overview dashboard with key metrics, charts, and recent activity.
 * Features light purple/lavender design matching reference.
 * =============================================================================
 */
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import {
    AlertCircle,
    Clock,
    CheckCircle2,
    Users,
    ArrowRight,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Zap,
    GraduationCap,
    Menu,
} from 'lucide-react';

// Priority colors
const priorityColors: Record<string, string> = {
    low: 'bg-slate-500',
    medium: 'bg-yellow-500',
    high: 'bg-orange-500',
    emergency: 'bg-red-500',
};

// Status badge colors
const statusColors: Record<string, string> = {
    reported: 'bg-slate-100 text-slate-600 border-slate-200',
    assigned: 'bg-blue-100 text-blue-700 border-blue-200',
    in_progress: 'bg-purple-100 text-purple-700 border-purple-200',
    resolved: 'bg-green-100 text-green-700 border-green-200',
    closed: 'bg-slate-100 text-slate-600 border-slate-200',
};

export default async function AdminDashboard() {
    // Mock dashboard stats
    const stats = {
        totalIssues: 156,
        pendingIssues: 23,
        resolvedToday: 8,
        avgResolutionTime: '4.2 hrs',
        staffOnline: 5,
        totalStudents: 284,
        issuesTrend: +12,
    };

    // Mock category distribution
    const categoryStats = [
        { category: 'Plumbing', count: 42, percentage: 27, color: 'from-violet-500 to-purple-600' },
        { category: 'Electrical', count: 38, percentage: 24, color: 'from-amber-500 to-orange-600' },
        { category: 'Furniture', count: 28, percentage: 18, color: 'from-emerald-500 to-teal-600' },
        { category: 'Internet', count: 25, percentage: 16, color: 'from-blue-500 to-indigo-600' },
        { category: 'Cleaning', count: 15, percentage: 10, color: 'from-rose-500 to-pink-600' },
        { category: 'Other', count: 8, percentage: 5, color: 'from-slate-400 to-slate-500' },
    ];

    // Mock recent issues
    const recentIssues = [
        {
            id: '1',
            title: 'Water leakage in Block B bathroom',
            hostel: 'Hostel A',
            priority: 'emergency',
            status: 'reported',
            created_at: new Date(Date.now() - 1800000).toISOString(),
        },
        {
            id: '2',
            title: 'AC not cooling properly',
            hostel: 'Hostel B',
            priority: 'high',
            status: 'assigned',
            created_at: new Date(Date.now() - 3600000).toISOString(),
        },
        {
            id: '3',
            title: 'Broken door lock',
            hostel: 'Hostel A',
            priority: 'high',
            status: 'in_progress',
            created_at: new Date(Date.now() - 7200000).toISOString(),
        },
        {
            id: '4',
            title: 'WiFi connectivity issues in Room 204',
            hostel: 'Hostel C',
            priority: 'medium',
            status: 'reported',
            created_at: new Date(Date.now() - 10800000).toISOString(),
        },
    ];

    // Format time ago
    function timeAgo(date: string) {
        const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    }

    return (
        <>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-4 border-b border-purple-100 bg-white/80 backdrop-blur-sm px-6">
                <SidebarTrigger className="-ml-1 text-purple-600 hover:text-purple-700">
                    <Menu className="h-5 w-5" />
                </SidebarTrigger>
                <div className="h-4 w-px bg-purple-200" />
                <div>
                    <h1 className="font-semibold text-slate-900">Dashboard</h1>
                    <p className="text-xs text-purple-600">Welcome back, Admin</p>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                    {/* Total Issues */}
                    <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-500">Total Issues</span>
                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                <AlertCircle className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{stats.totalIssues}</div>
                        <div className="flex items-center mt-1 text-xs">
                            {stats.issuesTrend > 0 ? (
                                <>
                                    <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
                                    <span className="text-red-500">+{stats.issuesTrend}%</span>
                                </>
                            ) : (
                                <>
                                    <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
                                    <span className="text-green-500">{stats.issuesTrend}%</span>
                                </>
                            )}
                            <span className="ml-1 text-slate-400">from last week</span>
                        </div>
                    </div>

                    {/* Pending Issues */}
                    <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-500">Pending</span>
                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                                <Clock className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{stats.pendingIssues}</div>
                        <p className="text-xs text-slate-400 mt-1">Awaiting resolution</p>
                    </div>

                    {/* Resolved Today */}
                    <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-500">Resolved Today</span>
                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                <CheckCircle2 className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{stats.resolvedToday}</div>
                        <p className="text-xs text-slate-400 mt-1">Avg: {stats.avgResolutionTime}</p>
                    </div>

                    {/* Total Students */}
                    <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-500">Total Students</span>
                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <GraduationCap className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{stats.totalStudents}</div>
                        <p className="text-xs text-slate-400 mt-1">Across all hostels</p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Recent Issues */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-purple-100 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-purple-50">
                            <div>
                                <h3 className="font-semibold text-slate-900">Recent Issues</h3>
                                <p className="text-xs text-slate-500">Issues requiring attention</p>
                            </div>
                            <Link
                                href="/admin/issues"
                                className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors"
                            >
                                View all <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="p-3">
                            <div className="space-y-2">
                                {recentIssues.map((issue) => (
                                    <Link
                                        key={issue.id}
                                        href={`/admin/issues/${issue.id}`}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-purple-50/50 transition-colors"
                                    >
                                        {/* Priority indicator */}
                                        {issue.priority === 'emergency' ? (
                                            <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                                                <Zap className="h-5 w-5 text-red-600" />
                                            </div>
                                        ) : (
                                            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                <AlertCircle className="h-5 w-5 text-purple-600" />
                                            </div>
                                        )}

                                        {/* Issue info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-slate-900 truncate">{issue.title}</p>
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span>{issue.hostel}</span>
                                                <span>•</span>
                                                <span>{timeAgo(issue.created_at)}</span>
                                            </div>
                                        </div>

                                        {/* Status badge */}
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-lg border ${statusColors[issue.status]} ${issue.priority === 'emergency' ? 'bg-red-100 text-red-700 border-red-200' : ''
                                                }`}
                                        >
                                            {issue.status.replace('_', ' ')}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Category Distribution */}
                    <div className="bg-white rounded-xl border border-purple-100 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-purple-50">
                            <h3 className="font-semibold text-slate-900">Issues by Category</h3>
                            <p className="text-xs text-slate-500">Distribution of issue types</p>
                        </div>
                        <div className="p-5">
                            <div className="space-y-4">
                                {categoryStats.map((cat) => (
                                    <div key={cat.category} className="space-y-1.5">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-700">{cat.category}</span>
                                            <span className="text-slate-500 font-medium">{cat.count}</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                                                style={{ width: `${cat.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Emergency Alert */}
                {recentIssues.filter((i) => i.priority === 'emergency').length > 0 && (
                    <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-amber-900">
                                {recentIssues.filter((i) => i.priority === 'emergency').length} emergency issues require immediate attention
                            </p>
                            <p className="text-sm text-amber-700">
                                Review and assign staff to resolve critical issues.
                            </p>
                        </div>
                        <Link
                            href="/admin/issues?priority=emergency"
                            className="px-4 py-2 text-sm font-medium text-amber-700 border border-amber-300 rounded-lg hover:bg-amber-100 transition-all"
                        >
                            Review Now
                        </Link>
                    </div>
                )}

                {/* Quick Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <Link href="/admin/students" className="p-5 bg-white rounded-xl border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all group">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                                <GraduationCap className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">Students</p>
                                <p className="text-xs text-slate-500">Manage students</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/admin/staff" className="p-5 bg-white rounded-xl border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all group">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                                <Users className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">Staff</p>
                                <p className="text-xs text-slate-500">Manage staff</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/admin/issues" className="p-5 bg-white rounded-xl border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all group">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                                <AlertCircle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">Issues</p>
                                <p className="text-xs text-slate-500">View all issues</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/admin/announcements" className="p-5 bg-white rounded-xl border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all group">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                                <AlertCircle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">Announcements</p>
                                <p className="text-xs text-slate-500">Post updates</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
