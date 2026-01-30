/**
 * =============================================================================
 * ISSUES LIST PAGE
 * =============================================================================
 * Displays all issues reported by the student.
 * Features filtering by status and search.
 * =============================================================================
 */
import { createClient } from '@/lib/supabase/server';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Plus, Filter } from 'lucide-react';

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

const statusColors: Record<string, string> = {
    reported: 'border-slate-300 text-slate-700',
    assigned: 'bg-blue-100 text-blue-800 border-blue-200',
    in_progress: 'bg-amber-100 text-amber-800 border-amber-200',
    resolved: 'bg-green-100 text-green-800 border-green-200',
    closed: 'bg-slate-100 text-slate-600 border-slate-200',
};

export default async function IssuesListPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Mock data for demo (replace with real query when DB is set up)
    const issues = [
        {
            id: '1',
            title: 'Water leakage in bathroom',
            description: 'There is continuous water leakage from the bathroom tap. It has been going on for 3 days now.',
            category: 'Plumbing',
            priority: 'high',
            status: 'in_progress',
            visibility: 'public',
            hostel: 'Hostel A',
            block: 'B1',
            room: '101',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            id: '2',
            title: 'Fan not working',
            description: 'The ceiling fan in my room stopped working yesterday. It makes a buzzing sound but does not rotate.',
            category: 'Electrical',
            priority: 'medium',
            status: 'assigned',
            visibility: 'public',
            hostel: 'Hostel A',
            block: 'B1',
            room: '101',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            updated_at: new Date(Date.now() - 43200000).toISOString(),
        },
        {
            id: '3',
            title: 'Broken window latch',
            description: 'The latch on the window is broken and the window cannot be closed properly.',
            category: 'Furniture',
            priority: 'low',
            status: 'resolved',
            visibility: 'private',
            hostel: 'Hostel A',
            block: 'B1',
            room: '101',
            created_at: new Date(Date.now() - 172800000).toISOString(),
            updated_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
            id: '4',
            title: 'WiFi connectivity issues',
            description: 'The WiFi signal is very weak in my room. Internet keeps disconnecting.',
            category: 'Internet',
            priority: 'medium',
            status: 'reported',
            visibility: 'public',
            hostel: 'Hostel A',
            block: 'B1',
            room: '101',
            created_at: new Date(Date.now() - 3600000).toISOString(),
            updated_at: new Date(Date.now() - 3600000).toISOString(),
        },
    ];

    // Count by status
    const statusCounts = issues.reduce((acc, issue) => {
        acc[issue.status] = (acc[issue.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="flex-1">
                    <h1 className="font-semibold">My Issues</h1>
                </div>
                <Button asChild>
                    <Link href="/student/issues/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Report Issue
                    </Link>
                </Button>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Status Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <Button variant="secondary" size="sm">
                        All ({issues.length})
                    </Button>
                    <Button variant="ghost" size="sm">
                        Reported ({statusCounts.reported || 0})
                    </Button>
                    <Button variant="ghost" size="sm">
                        In Progress ({statusCounts.in_progress || 0})
                    </Button>
                    <Button variant="ghost" size="sm">
                        Resolved ({statusCounts.resolved || 0})
                    </Button>
                </div>

                {/* Issues List */}
                {issues.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <Filter className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No issues yet</h3>
                            <p className="text-muted-foreground text-center mb-4">
                                You haven&apos;t reported any issues. Click the button below to get started.
                            </p>
                            <Button asChild>
                                <Link href="/student/issues/new">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Report Your First Issue
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {issues.map((issue) => (
                            <Link key={issue.id} href={`/student/issues/${issue.id}`}>
                                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-4">
                                            {/* Priority indicator */}
                                            <div
                                                className={`w-1 h-16 rounded-full ${priorityColors[issue.priority]}`}
                                            />

                                            {/* Issue Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-medium truncate">{issue.title}</h3>
                                                    {issue.visibility === 'private' && (
                                                        <Badge variant="outline" className="text-xs">
                                                            Private
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                                    {issue.description}
                                                </p>
                                                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                                    <Badge variant="outline" className="font-normal">
                                                        {issue.category}
                                                    </Badge>
                                                    <span>•</span>
                                                    <span>
                                                        {new Date(issue.created_at).toLocaleDateString()}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="capitalize">
                                                        {issue.priority} priority
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Status Badge */}
                                            <Badge className={statusColors[issue.status]}>
                                                {issue.status.replace('_', ' ')}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
