/**
 * =============================================================================
 * STUDENT DASHBOARD PAGE
 * =============================================================================
 * Main dashboard for students showing:
 * - Quick stats
 * - Recent issues
 * - Quick actions
 * =============================================================================
 */
import { createClient } from '@/lib/supabase/server';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
    Plus,
    AlertCircle,
    Clock,
    CheckCircle2,
    ArrowRight,
    Bell,
    Search,
} from 'lucide-react';

// Priority color mapping
const priorityColors: Record<string, string> = {
    low: 'bg-slate-500',
    medium: 'bg-yellow-500',
    high: 'bg-orange-500',
    emergency: 'bg-red-500',
};

// Status badge variants
const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    reported: 'outline',
    assigned: 'secondary',
    in_progress: 'default',
    resolved: 'default',
    closed: 'secondary',
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
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div>
                    <h1 className="font-semibold">Dashboard</h1>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Welcome back! 👋
                    </h2>
                    <p className="text-muted-foreground">
                        Here&apos;s what&apos;s happening with your hostel issues.
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-4 md:grid-cols-3 mb-8">
                    <Link href="/student/issues/new">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Report Issue</CardTitle>
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Plus className="h-5 w-5 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground">
                                    Submit a new issue in under 30 seconds
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/student/lost-found">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Lost & Found</CardTitle>
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Search className="h-5 w-5 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground">
                                    Report or find lost items
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/student/announcements">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Announcements</CardTitle>
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Bell className="h-5 w-5 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground">
                                    View hostel updates
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">All time</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pending}</div>
                            <p className="text-xs text-muted-foreground">Awaiting resolution</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.resolved}</div>
                            <p className="text-xs text-muted-foreground">Completed</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Issues & Announcements Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Issues */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Issues</CardTitle>
                                <CardDescription>Your latest reported issues</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/student/issues">
                                    View all <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentIssues.length === 0 ? (
                                    <p className="text-sm text-muted-foreground text-center py-8">
                                        No issues reported yet.{' '}
                                        <Link href="/student/issues/new" className="text-blue-500 hover:underline">
                                            Report one now
                                        </Link>
                                    </p>
                                ) : (
                                    recentIssues.map((issue) => (
                                        <Link
                                            key={issue.id}
                                            href={`/student/issues/${issue.id}`}
                                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                        >
                                            {/* Priority indicator */}
                                            <div
                                                className={`w-2 h-2 rounded-full ${priorityColors[issue.priority]}`}
                                            />

                                            {/* Issue info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">{issue.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {issue.category} •{' '}
                                                    {new Date(issue.created_at).toLocaleDateString()}
                                                </p>
                                            </div>

                                            {/* Status badge */}
                                            <Badge variant={statusVariant[issue.status]}>
                                                {issue.status.replace('_', ' ')}
                                            </Badge>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Announcements */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Announcements</CardTitle>
                                <CardDescription>Recent hostel updates</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/student/announcements">
                                    View all <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {announcements.length === 0 ? (
                                    <p className="text-sm text-muted-foreground text-center py-8">
                                        No announcements at this time.
                                    </p>
                                ) : (
                                    announcements.map((announcement) => (
                                        <div
                                            key={announcement.id}
                                            className="p-3 rounded-lg border bg-muted/30"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                                                    <Bell className="h-4 w-4 text-amber-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{announcement.title}</p>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {announcement.content}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {new Date(announcement.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
