/**
 * =============================================================================
 * ADMIN - STAFF PAGE
 * =============================================================================
 * Staff management with performance metrics and assignment stats.
 * =============================================================================
 */
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, MoreVertical, CheckCircle2, Clock, Star } from 'lucide-react';

export default async function StaffPage() {
    // Mock staff data
    const staff = [
        {
            id: '1',
            full_name: 'Mike Tech',
            email: 'mike.tech@hostelops.com',
            specialty: 'Electrical',
            status: 'online',
            stats: { assigned: 3, resolved: 47, avgTime: '2.5 hrs', rating: 4.8 },
        },
        {
            id: '2',
            full_name: 'Sam Fix',
            email: 'sam.fix@hostelops.com',
            specialty: 'Plumbing',
            status: 'online',
            stats: { assigned: 5, resolved: 62, avgTime: '3.1 hrs', rating: 4.6 },
        },
        {
            id: '3',
            full_name: 'Alex Build',
            email: 'alex.build@hostelops.com',
            specialty: 'Furniture',
            status: 'offline',
            stats: { assigned: 2, resolved: 38, avgTime: '4.0 hrs', rating: 4.5 },
        },
        {
            id: '4',
            full_name: 'Lisa Clean',
            email: 'lisa.clean@hostelops.com',
            specialty: 'Cleaning',
            status: 'online',
            stats: { assigned: 1, resolved: 55, avgTime: '1.5 hrs', rating: 4.9 },
        },
    ];

    const onlineCount = staff.filter((s) => s.status === 'online').length;

    return (
        <>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="flex-1">
                    <h1 className="font-semibold">Staff Management</h1>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Staff
                </Button>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Summary */}
                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                    <Card>
                        <CardContent className="py-4">
                            <p className="text-2xl font-bold">{staff.length}</p>
                            <p className="text-sm text-muted-foreground">Total Staff</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-50 border-green-200">
                        <CardContent className="py-4">
                            <p className="text-2xl font-bold text-green-700">{onlineCount}</p>
                            <p className="text-sm text-green-600">Online Now</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="py-4">
                            <p className="text-2xl font-bold">
                                {staff.reduce((sum, s) => sum + s.stats.assigned, 0)}
                            </p>
                            <p className="text-sm text-muted-foreground">Active Assignments</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Staff Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {staff.map((member) => (
                        <Card key={member.id}>
                            <CardHeader className="pb-3">
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                            {member.full_name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-base">{member.full_name}</CardTitle>
                                            <span
                                                className={`h-2 w-2 rounded-full ${member.status === 'online' ? 'bg-green-500' : 'bg-slate-300'
                                                    }`}
                                            />
                                        </div>
                                        <p className="text-sm text-muted-foreground">{member.specialty}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-amber-500" />
                                        <div>
                                            <p className="font-medium">{member.stats.assigned}</p>
                                            <p className="text-xs text-muted-foreground">Assigned</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        <div>
                                            <p className="font-medium">{member.stats.resolved}</p>
                                            <p className="text-xs text-muted-foreground">Resolved</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-blue-500" />
                                        <div>
                                            <p className="font-medium">{member.stats.avgTime}</p>
                                            <p className="text-xs text-muted-foreground">Avg Time</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <div>
                                            <p className="font-medium">{member.stats.rating}</p>
                                            <p className="text-xs text-muted-foreground">Rating</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t flex gap-2">
                                    <Badge
                                        variant={member.status === 'online' ? 'default' : 'secondary'}
                                        className={
                                            member.status === 'online' ? 'bg-green-100 text-green-800' : ''
                                        }
                                    >
                                        {member.status}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
