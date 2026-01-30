/**
 * =============================================================================
 * ISSUE DETAIL PAGE
 * =============================================================================
 * Shows full details of an issue with status timeline and comments.
 * =============================================================================
 */
import { createClient } from '@/lib/supabase/server';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
    ArrowLeft,
    Clock,
    CheckCircle2,
    Circle,
    Building2,
    Eye,
    EyeOff,
    MessageSquare,
} from 'lucide-react';

// Priority colors
const priorityColors: Record<string, string> = {
    low: 'bg-slate-500',
    medium: 'bg-yellow-500',
    high: 'bg-orange-500',
    emergency: 'bg-red-500',
};

// Status timeline steps
const statusSteps = [
    { key: 'reported', label: 'Reported', icon: Circle },
    { key: 'assigned', label: 'Assigned', icon: Clock },
    { key: 'in_progress', label: 'In Progress', icon: Clock },
    { key: 'resolved', label: 'Resolved', icon: CheckCircle2 },
];

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function IssueDetailPage({ params }: PageProps) {
    const { id } = await params;
    const supabase = await createClient();

    // Mock issue data for demo
    const issue = {
        id,
        title: 'Water leakage in bathroom',
        description:
            'There is continuous water leakage from the bathroom tap. It has been going on for 3 days now. The water is pooling on the floor and creating a mess. I have placed a bucket but it fills up quickly. This needs urgent attention.',
        category: 'Plumbing',
        priority: 'high',
        status: 'in_progress',
        visibility: 'public',
        hostel: 'Hostel A',
        block: 'B1',
        room: '101',
        created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        updated_at: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        assigned_to: null,
        created_by: {
            full_name: 'John Doe',
        },
    };

    // Mock comments
    const comments = [
        {
            id: '1',
            content: 'A plumber has been assigned and will visit your room tomorrow between 10 AM and 12 PM.',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            user: { full_name: 'Hostel Admin' },
        },
        {
            id: '2',
            content: 'Thank you for the update. I will be available during that time.',
            created_at: new Date(Date.now() - 72000000).toISOString(),
            user: { full_name: 'John Doe' },
        },
    ];

    // Determine current step index
    const currentStepIndex = statusSteps.findIndex((s) => s.key === issue.status);

    return (
        <>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/student/issues">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Issues
                    </Link>
                </Button>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6 max-w-4xl mx-auto">
                {/* Issue Header */}
                <div className="mb-6">
                    <div className="flex items-start gap-3 mb-2">
                        <div className={`w-2 h-2 mt-2 rounded-full ${priorityColors[issue.priority]}`} />
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold">{issue.title}</h1>
                            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                                <Badge variant="outline">{issue.category}</Badge>
                                <span>•</span>
                                <span className="capitalize">{issue.priority} priority</span>
                                <span>•</span>
                                {issue.visibility === 'public' ? (
                                    <span className="flex items-center gap-1">
                                        <Eye className="h-3 w-3" /> Public
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1">
                                        <EyeOff className="h-3 w-3" /> Private
                                    </span>
                                )}
                            </div>
                        </div>
                        <Badge
                            className={
                                issue.status === 'resolved'
                                    ? 'bg-green-100 text-green-800'
                                    : issue.status === 'in_progress'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-blue-100 text-blue-800'
                            }
                        >
                            {issue.status.replace('_', ' ')}
                        </Badge>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-wrap">
                                    {issue.description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Status Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Status Timeline</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative">
                                    {statusSteps.map((step, index) => {
                                        const isCompleted = index <= currentStepIndex;
                                        const isCurrent = index === currentStepIndex;
                                        const Icon = step.icon;

                                        return (
                                            <div key={step.key} className="flex items-center gap-4 mb-4 last:mb-0">
                                                {/* Icon */}
                                                <div
                                                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isCompleted
                                                            ? 'bg-green-100 text-green-600'
                                                            : 'bg-muted text-muted-foreground'
                                                        } ${isCurrent ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}
                                                >
                                                    <Icon className="h-4 w-4" />
                                                </div>

                                                {/* Label */}
                                                <div className="flex-1">
                                                    <p
                                                        className={`font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'
                                                            }`}
                                                    >
                                                        {step.label}
                                                    </p>
                                                    {isCurrent && (
                                                        <p className="text-xs text-muted-foreground">Current status</p>
                                                    )}
                                                </div>

                                                {/* Connector line */}
                                                {index < statusSteps.length - 1 && (
                                                    <div
                                                        className={`absolute left-4 w-0.5 h-8 ${index < currentStepIndex ? 'bg-green-500' : 'bg-muted'
                                                            }`}
                                                        style={{ top: `${index * 48 + 32}px` }}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Comments Section */}
                        {issue.visibility === 'public' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MessageSquare className="h-5 w-5" />
                                        Comments ({comments.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {comments.map((comment) => (
                                            <div key={comment.id} className="flex gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-medium">
                                                    {comment.user.full_name[0]}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-medium text-sm">
                                                            {comment.user.full_name}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(comment.created_at).toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Location Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-sm">
                                    <Building2 className="h-4 w-4" />
                                    Location
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Hostel:</span>{' '}
                                    <span className="font-medium">{issue.hostel}</span>
                                </div>
                                {issue.block && (
                                    <div>
                                        <span className="text-muted-foreground">Block:</span>{' '}
                                        <span className="font-medium">{issue.block}</span>
                                    </div>
                                )}
                                {issue.room && (
                                    <div>
                                        <span className="text-muted-foreground">Room:</span>{' '}
                                        <span className="font-medium">{issue.room}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Timestamps */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Timeline</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Created:</span>{' '}
                                    <span className="font-medium">
                                        {new Date(issue.created_at).toLocaleString()}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Last updated:</span>{' '}
                                    <span className="font-medium">
                                        {new Date(issue.updated_at).toLocaleString()}
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
