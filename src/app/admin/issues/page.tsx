/**
 * =============================================================================
 * ADMIN - ALL ISSUES PAGE
 * =============================================================================
 * Table view of all hostel issues with filtering and actions.
 * =============================================================================
 */
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
    Search,
    Filter,
    ChevronRight,
    Clock,
    User,
    Building2,
} from 'lucide-react';

// Priority colors
const priorityColors: Record<string, string> = {
    low: 'bg-slate-100 text-slate-800 border-slate-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    emergency: 'bg-red-100 text-red-800 border-red-200',
};

// Status colors
const statusColors: Record<string, string> = {
    reported: 'bg-slate-100 text-slate-700 border-slate-200',
    assigned: 'bg-blue-100 text-blue-800 border-blue-200',
    in_progress: 'bg-amber-100 text-amber-800 border-amber-200',
    resolved: 'bg-green-100 text-green-800 border-green-200',
    closed: 'bg-slate-200 text-slate-600 border-slate-300',
};

export default async function AdminIssuesPage() {
    // Mock issues data
    const issues = [
        {
            id: '1',
            title: 'Water leakage in Block B bathroom',
            category: 'Plumbing',
            priority: 'emergency',
            status: 'reported',
            hostel: 'Hostel A',
            block: 'B',
            room: '205',
            created_by: { full_name: 'John Doe' },
            assigned_to: null,
            created_at: new Date(Date.now() - 1800000).toISOString(),
        },
        {
            id: '2',
            title: 'AC not cooling properly',
            category: 'Appliances',
            priority: 'high',
            status: 'assigned',
            hostel: 'Hostel B',
            block: 'A',
            room: '102',
            created_by: { full_name: 'Jane Smith' },
            assigned_to: { full_name: 'Mike Tech' },
            created_at: new Date(Date.now() - 3600000).toISOString(),
        },
        {
            id: '3',
            title: 'Broken door lock',
            category: 'Security',
            priority: 'high',
            status: 'in_progress',
            hostel: 'Hostel A',
            block: 'C',
            room: '301',
            created_by: { full_name: 'Bob Wilson' },
            assigned_to: { full_name: 'Sam Fix' },
            created_at: new Date(Date.now() - 7200000).toISOString(),
        },
        {
            id: '4',
            title: 'WiFi connectivity issues',
            category: 'Internet',
            priority: 'medium',
            status: 'reported',
            hostel: 'Hostel C',
            block: 'A',
            room: '204',
            created_by: { full_name: 'Alice Brown' },
            assigned_to: null,
            created_at: new Date(Date.now() - 10800000).toISOString(),
        },
        {
            id: '5',
            title: 'Ceiling fan making noise',
            category: 'Electrical',
            priority: 'low',
            status: 'resolved',
            hostel: 'Hostel B',
            block: 'B',
            room: '110',
            created_by: { full_name: 'Chris Lee' },
            assigned_to: { full_name: 'Mike Tech' },
            created_at: new Date(Date.now() - 86400000).toISOString(),
        },
    ];

    // Summary stats
    const stats = {
        reported: issues.filter((i) => i.status === 'reported').length,
        assigned: issues.filter((i) => i.status === 'assigned').length,
        in_progress: issues.filter((i) => i.status === 'in_progress').length,
        resolved: issues.filter((i) => i.status === 'resolved').length,
    };

    return (
        <>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="flex-1">
                    <h1 className="font-semibold">All Issues</h1>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Quick Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                    <Card className="bg-slate-50 border-slate-200">
                        <CardContent className="py-4 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-slate-200 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.reported}</p>
                                <p className="text-xs text-muted-foreground">Reported</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="py-4 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-blue-200 flex items-center justify-center">
                                <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.assigned}</p>
                                <p className="text-xs text-muted-foreground">Assigned</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-amber-50 border-amber-200">
                        <CardContent className="py-4 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-amber-200 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.in_progress}</p>
                                <p className="text-xs text-muted-foreground">In Progress</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-50 border-green-200">
                        <CardContent className="py-4 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-green-200 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.resolved}</p>
                                <p className="text-xs text-muted-foreground">Resolved</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="relative flex-1 min-w-[200px] max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search issues..." className="pl-10" />
                    </div>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                </div>

                {/* Issues Table */}
                <Card>
                    <CardHeader className="px-6">
                        <CardTitle className="text-base">Issues ({issues.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {issues.map((issue) => (
                                <Link
                                    key={issue.id}
                                    href={`/admin/issues/${issue.id}`}
                                    className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors"
                                >
                                    {/* Issue Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium truncate">{issue.title}</span>
                                            <Badge className={priorityColors[issue.priority]} variant="outline">
                                                {issue.priority}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Building2 className="h-3 w-3" />
                                                {issue.hostel} {issue.block && `• Block ${issue.block}`}{' '}
                                                {issue.room && `• Room ${issue.room}`}
                                            </span>
                                            <span>•</span>
                                            <span>{issue.category}</span>
                                            <span>•</span>
                                            <span>by {issue.created_by.full_name}</span>
                                        </div>
                                    </div>

                                    {/* Assigned To */}
                                    <div className="hidden sm:block text-sm text-muted-foreground w-32">
                                        {issue.assigned_to ? (
                                            <span className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                {issue.assigned_to.full_name}
                                            </span>
                                        ) : (
                                            <span className="text-amber-600">Unassigned</span>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <Badge className={statusColors[issue.status]}>
                                        {issue.status.replace('_', ' ')}
                                    </Badge>

                                    {/* Arrow */}
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
