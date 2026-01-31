/**
 * =============================================================================
 * STUDENT DASHBOARD PAGE - LIGHT PURPLE THEME
 * =============================================================================
 * Main dashboard for students with light purple theme.
 * =============================================================================
 */
import { createClient } from '@/lib/supabase/server';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import {
    Plus,
    AlertCircle,
    Clock,
    CheckCircle2,
    ArrowRight,
    Bell,
    Search,
    Menu,
} from 'lucide-react';

// Priority color mapping
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

export default async function StudentDashboard() {
    const supabase = await createClient();

    // Fetch real data (falls back to demo data if tables don't exist or Supabase not configured)
    let stats = { total: 0, pending: 0, resolved: 0, emergency: 0 };
    let recentIssues: Array<{
        id: string;
        title: string;
        category: string;
        priority: string;
        status: string;
        created_at: string;
    }> = [];
    let announcements: Array<{
        id: string;
        title: string;
        content: string;
        created_at: string;
    }> = [];

    // Only fetch if Supabase is configured
    if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();

        try {
            // Attempt to fetch from database
            if (user) {
                const { data: issues } = await supabase
                    .from('issues')
                    .select('id, title, category, priority, status, created_at')
                    .eq('created_by', user.id)
                    .order('created_at', { ascending: false })
                    .limit(5);

                if (issues && issues.length > 0) {
                    recentIssues = issues;
                    stats = {
                        total: issues.length,
                        pending: issues.filter(i => ['reported', 'assigned', 'in_progress'].includes(i.status)).length,
                        resolved: issues.filter(i => ['resolved', 'closed'].includes(i.status)).length,
                        emergency: issues.filter(i => i.priority === 'emergency').length,
                    };
                }

                const { data: anns } = await supabase
                    .from('announcements')
                    .select('id, title, content, created_at')
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (anns && anns.length > 0) {
                    announcements = anns;
                }
            }
        } catch {
            // Database tables may not exist yet, use demo data
        }
    }

    // Demo data fallback
    if (recentIssues.length === 0) {
        recentIssues = [
            {
                id: 'demo-1',
                title: 'Water leakage in bathroom',
                category: 'Plumbing',
                priority: 'high',
                status: 'in_progress',
                created_at: new Date().toISOString(),
            },
            {
                id: 'demo-2',
                title: 'Fan not working',
                category: 'Electrical',
                priority: 'medium',
                status: 'assigned',
                created_at: new Date(Date.now() - 86400000).toISOString(),
            },
            {
                id: 'demo-3',
                title: 'Broken window latch',
                category: 'Furniture',
                priority: 'low',
                status: 'resolved',
                created_at: new Date(Date.now() - 172800000).toISOString(),
            },
        ];
        stats = { total: 5, pending: 2, resolved: 3, emergency: 0 };
    }

    if (announcements.length === 0) {
        announcements = [
            {
                id: 'demo-ann-1',
                title: 'Water supply interruption',
                content: 'Water supply will be interrupted tomorrow from 10 AM to 2 PM for maintenance.',
                created_at: new Date().toISOString(),
            },
        ];
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
                    <p className="text-xs text-purple-600">Welcome back!</p>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Quick Actions */}
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                    <Link href="/student/issues/new">
                        <div className="group p-5 rounded-xl bg-white border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-slate-900">Report Issue</span>
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-purple-200">
                                    <Plus className="h-5 w-5 text-white" />
                                </div>
                            </div>
                            <p className="text-xs text-slate-500">
                                Submit a new issue in under 30 seconds
                            </p>
                        </div>
                    </Link>

                    <Link href="/student/lost-found">
                        <div className="group p-5 rounded-xl bg-white border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-slate-900">Lost & Found</span>
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-emerald-200">
                                    <Search className="h-5 w-5 text-white" />
                                </div>
                            </div>
                            <p className="text-xs text-slate-500">
                                Report or find lost items
                            </p>
                        </div>
                    </Link>

                    <Link href="/student/announcements">
                        <div className="group p-5 rounded-xl bg-white border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-slate-900">Announcements</span>
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-amber-200">
                                    <Bell className="h-5 w-5 text-white" />
                                </div>
                            </div>
                            <p className="text-xs text-slate-500">
                                View hostel updates
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                    <div className="p-5 rounded-xl bg-white border border-purple-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-500">Total Issues</span>
                            <AlertCircle className="h-4 w-4 text-purple-500" />
                        </div>
                        <div className="text-3xl font-bold text-slate-900">{stats.total}</div>
                        <p className="text-xs text-slate-500">All time</p>
                    </div>

                    <div className="p-5 rounded-xl bg-white border border-purple-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-500">Pending</span>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </div>
                        <div className="text-3xl font-bold text-slate-900">{stats.pending}</div>
                        <p className="text-xs text-slate-500">Awaiting resolution</p>
                    </div>

                    <div className="p-5 rounded-xl bg-white border border-purple-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-500">Resolved</span>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="text-3xl font-bold text-slate-900">{stats.resolved}</div>
                        <p className="text-xs text-slate-500">Completed</p>
                    </div>
                </div>

                {/* Recent Issues & Announcements Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Issues */}
                    <div className="bg-white rounded-xl border border-purple-100 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-purple-50">
                            <div>
                                <h3 className="font-semibold text-slate-900">Recent Issues</h3>
                                <p className="text-xs text-slate-500">Your latest reported issues</p>
                            </div>
                            <Link href="/student/issues" className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors">
                                View all <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="p-3">
                            {recentIssues.length === 0 ? (
                                <p className="text-sm text-slate-500 text-center py-8">
                                    No issues reported yet.{' '}
                                    <Link href="/student/issues/new" className="text-purple-600 hover:underline">
                                        Report one now
                                    </Link>
                                </p>
                            ) : (
                                <div className="space-y-2">
                                    {recentIssues.map((issue) => (
                                        <Link
                                            key={issue.id}
                                            href={`/student/issues/${issue.id}`}
                                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-purple-50/50 transition-colors"
                                        >
                                            {/* Priority indicator */}
                                            <div className={`w-2 h-2 rounded-full ${priorityColors[issue.priority]}`} />

                                            {/* Issue info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-slate-900 truncate">{issue.title}</p>
                                                <p className="text-xs text-slate-500">
                                                    {issue.category} • {new Date(issue.created_at).toLocaleDateString()}
                                                </p>
                                            </div>

                                            {/* Status badge */}
                                            <span className={`px-2 py-1 text-xs font-medium rounded-lg border ${statusColors[issue.status]}`}>
                                                {issue.status.replace('_', ' ')}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Announcements */}
                    <div className="bg-white rounded-xl border border-purple-100 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-purple-50">
                            <div>
                                <h3 className="font-semibold text-slate-900">Announcements</h3>
                                <p className="text-xs text-slate-500">Recent hostel updates</p>
                            </div>
                            <Link href="/student/announcements" className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors">
                                View all <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="p-3">
                            {announcements.length === 0 ? (
                                <p className="text-sm text-slate-500 text-center py-8">
                                    No announcements at this time.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {announcements.map((announcement) => (
                                        <div
                                            key={announcement.id}
                                            className="p-4 rounded-xl bg-purple-50/50 border border-purple-100"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                                                    <Bell className="h-4 w-4 text-amber-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900">{announcement.title}</p>
                                                    <p className="text-sm text-slate-600 line-clamp-2">
                                                        {announcement.content}
                                                    </p>
                                                    <p className="text-xs text-slate-500 mt-1">
                                                        {new Date(announcement.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
