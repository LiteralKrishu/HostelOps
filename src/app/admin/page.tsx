/**
 * =============================================================================
 * ADMIN DASHBOARD PAGE
 * =============================================================================
 * Overview dashboard with key metrics, charts, and recent activity.
 * =============================================================================
 */
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
} from 'lucide-react';

// Priority colors
const priorityColors: Record<string, string> = {
    low: 'bg-slate-500',
    medium: 'bg-yellow-500',
    high: 'bg-orange-500',
    emergency: 'bg-red-500',
};

export default async function AdminDashboard() {
    // Mock dashboard stats
    const stats = {
        totalIssues: 156,
        pendingIssues: 23,
        resolvedToday: 8,
        avgResolutionTime: '4.2 hrs',
        staffOnline: 5,
        issuesTrend: +12, // percentage change
    };

    // Mock category distribution
    const categoryStats = [
        { category: 'Plumbing', count: 42, percentage: 27 },
        { category: 'Electrical', count: 38, percentage: 24 },
        { category: 'Furniture', count: 28, percentage: 18 },
        { category: 'Internet', count: 25, percentage: 16 },
        { category: 'Cleaning', count: 15, percentage: 10 },
        { category: 'Other', count: 8, percentage: 5 },
    ];

    // Mock recent issues
    const recentIssues = [
        {
            id: '1',
            title: 'Water leakage in Block B bathroom',
            hostel: 'Hostel A',
            priority: 'emergency',
            status: 'reported',
            created_at: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
        },
        {
            id: '2',
            title: 'AC not cooling properly',
            hostel: 'Hostel B',
            priority: 'high',
            status: 'assigned',
            created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        },
        {
            id: '3',
            title: 'Broken door lock',
            hostel: 'Hostel A',
            priority: 'high',
            status: 'in_progress',
            created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        },
        {
            id: '4',
            title: 'WiFi connectivity issues in Room 204',
            hostel: 'Hostel C',
            priority: 'medium',
            status: 'reported',
            created_at: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
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
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div>
                    <h1 className="font-semibold">Dashboard</h1>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    {/* Total Issues */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalIssues}</div>
                            <div className="flex items-center text-xs text-muted-foreground">
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
                                <span className="ml-1">from last week</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pending Issues */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pendingIssues}</div>
                            <p className="text-xs text-muted-foreground">Awaiting assignment or resolution</p>
                        </CardContent>
                    </Card>

                    {/* Resolved Today */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.resolvedToday}</div>
                            <p className="text-xs text-muted-foreground">
                                Avg. resolution: {stats.avgResolutionTime}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Staff Online */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Staff Online</CardTitle>
                            <Users className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.staffOnline}</div>
                            <p className="text-xs text-muted-foreground">Available for assignment</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Recent Issues */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Issues</CardTitle>
                                <CardDescription>Issues requiring attention</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/admin/issues">
                                    View all <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentIssues.map((issue) => (
                                    <Link
                                        key={issue.id}
                                        href={`/admin/issues/${issue.id}`}
                                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        {/* Priority indicator */}
                                        {issue.priority === 'emergency' ? (
                                            <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center">
                                                <Zap className="h-4 w-4 text-red-600" />
                                            </div>
                                        ) : (
                                            <div
                                                className={`w-2 h-2 rounded-full ${priorityColors[issue.priority]}`}
                                            />
                                        )}

                                        {/* Issue info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{issue.title}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{issue.hostel}</span>
                                                <span>•</span>
                                                <span>{timeAgo(issue.created_at)}</span>
                                            </div>
                                        </div>

                                        {/* Status badge */}
                                        <Badge
                                            variant={issue.status === 'reported' ? 'outline' : 'secondary'}
                                            className={
                                                issue.priority === 'emergency'
                                                    ? 'bg-red-100 text-red-800 border-red-200'
                                                    : ''
                                            }
                                        >
                                            {issue.status.replace('_', ' ')}
                                        </Badge>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Category Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Issues by Category</CardTitle>
                            <CardDescription>Distribution of issue types</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {categoryStats.map((cat) => (
                                    <div key={cat.category} className="space-y-1">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>{cat.category}</span>
                                            <span className="text-muted-foreground">{cat.count}</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                                                style={{ width: `${cat.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Priority Alert */}
                <Card className="mt-6 border-amber-200 bg-amber-50/50 dark:bg-amber-950/20">
                    <CardContent className="flex items-center gap-4 py-4">
                        <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-amber-900 dark:text-amber-100">
                                {recentIssues.filter((i) => i.priority === 'emergency').length} emergency issues
                                require immediate attention
                            </p>
                            <p className="text-sm text-amber-700 dark:text-amber-300">
                                Review and assign staff to resolve critical issues.
                            </p>
                        </div>
                        <Button variant="outline" className="border-amber-300" asChild>
                            <Link href="/admin/issues?priority=emergency">Review Now</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
