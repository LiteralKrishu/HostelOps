/**
 * =============================================================================
 * ADMIN - ANNOUNCEMENTS PAGE
 * =============================================================================
 * Create and manage hostel announcements.
 * =============================================================================
 */
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Megaphone } from 'lucide-react';

export default async function AdminAnnouncementsPage() {
    // Mock announcements
    const announcements = [
        {
            id: '1',
            title: 'Water Supply Interruption',
            content: 'Water supply will be interrupted tomorrow (29th Jan) from 10 AM to 2 PM for tank cleaning.',
            type: 'maintenance',
            hostel: null,
            status: 'active',
            created_at: new Date().toISOString(),
        },
        {
            id: '2',
            title: 'Hostel Day Celebrations',
            content: 'Annual Hostel Day celebrations will be held on 5th February.',
            type: 'general',
            hostel: null,
            status: 'active',
            created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
            id: '3',
            title: 'WiFi Maintenance',
            content: 'Scheduled WiFi router maintenance on Sunday from 6 AM to 8 AM.',
            type: 'info',
            hostel: 'Hostel A',
            status: 'draft',
            created_at: new Date(Date.now() - 172800000).toISOString(),
        },
    ];

    return (
        <>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="flex-1">
                    <h1 className="font-semibold">Announcements</h1>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Announcement
                </Button>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6 max-w-4xl mx-auto">
                <div className="space-y-4">
                    {announcements.map((announcement) => (
                        <Card key={announcement.id}>
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                            <Megaphone className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">{announcement.title}</CardTitle>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge
                                                    variant={
                                                        announcement.status === 'active' ? 'default' : 'secondary'
                                                    }
                                                    className={
                                                        announcement.status === 'active'
                                                            ? 'bg-green-100 text-green-800'
                                                            : ''
                                                    }
                                                >
                                                    {announcement.status}
                                                </Badge>
                                                <Badge variant="outline">{announcement.type}</Badge>
                                                {announcement.hostel && (
                                                    <Badge variant="outline">{announcement.hostel}</Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{announcement.content}</p>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Created {new Date(announcement.created_at).toLocaleDateString()}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
