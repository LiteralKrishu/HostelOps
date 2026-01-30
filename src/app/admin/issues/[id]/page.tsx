/**
 * =============================================================================
 * ADMIN - ISSUE DETAIL PAGE
 * =============================================================================
 * Detailed view of an issue with assignment and status management.
 * =============================================================================
 */
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import {
    ArrowLeft,
    Building2,
    Clock,
    User,
    MessageSquare,
    CheckCircle2,
} from 'lucide-react';

// Priority colors
const priorityColors: Record<string, string> = {
    low: 'bg-slate-100 text-slate-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    emergency: 'bg-red-100 text-red-800',
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AdminIssueDetailPage({ params }: PageProps) {
    const { id } = await params;

    // Mock issue data
    const issue = {
        id,
        title: 'Water leakage in Block B bathroom',
        description:
            'There is continuous water leakage from the bathroom tap. It has been going on for 3 days now. The water is pooling on the floor and creating a mess. Please send someone to fix this urgently.',
        category: 'Plumbing',
        priority: 'emergency',
        status: 'reported',
        visibility: 'public',
        hostel: 'Hostel A',
        block: 'B',
        room: '205',
        created_by: {
            id: 'user1',
            full_name: 'John Doe',
            email: 'john.doe@example.com',
        },
        assigned_to: null,
        created_at: new Date(Date.now() - 1800000).toISOString(),
        updated_at: new Date(Date.now() - 1800000).toISOString(),
    };

    // Mock staff list for assignment
    const availableStaff = [
        { id: 'staff1', full_name: 'Mike Tech', specialty: 'Electrical' },
        { id: 'staff2', full_name: 'Sam Fix', specialty: 'Plumbing' },
        { id: 'staff3', full_name: 'Alex Build', specialty: 'Furniture' },
    ];

    // Mock comments
    const comments = [
        {
            id: '1',
            content: 'I tried closing the tap tightly but the leak continues from the pipe connection.',
            created_at: new Date(Date.now() - 3600000).toISOString(),
            user: { full_name: 'John Doe', role: 'student' },
        },
    ];

    return (
        <>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/issues">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Issues
                    </Link>
                </Button>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6 max-w-5xl mx-auto">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Issue Header */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge className={priorityColors[issue.priority]}>
                                                {issue.priority}
                                            </Badge>
                                            <Badge variant="outline">{issue.category}</Badge>
                                        </div>
                                        <CardTitle className="text-xl">{issue.title}</CardTitle>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-wrap">
                                    {issue.description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Comments */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <MessageSquare className="h-4 w-4" />
                                    Comments ({comments.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                                                {comment.user.full_name[0]}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-sm">
                                                        {comment.user.full_name}
                                                    </span>
                                                    <Badge variant="outline" className="text-xs py-0">
                                                        {comment.user.role}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(comment.created_at).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {comment.content}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Assign Staff */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Assign To</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select staff member" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableStaff.map((staff) => (
                                                <SelectItem key={staff.id} value={staff.id}>
                                                    {staff.full_name} ({staff.specialty})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Update Status */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>
                                    <Select defaultValue={issue.status}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="reported">Reported</SelectItem>
                                            <SelectItem value="assigned">Assigned</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="resolved">Resolved</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Update Priority */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Priority</label>
                                    <Select defaultValue={issue.priority}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="emergency">Emergency</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button className="w-full">
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                        {issue.hostel}
                                        {issue.block && ` • Block ${issue.block}`}
                                        {issue.room && ` • Room ${issue.room}`}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                        Reported by{' '}
                                        <span className="font-medium">{issue.created_by.full_name}</span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                        Created {new Date(issue.created_at).toLocaleString()}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
