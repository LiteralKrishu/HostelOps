/**
 * =============================================================================
 * ANNOUNCEMENTS PAGE
 * =============================================================================
 * Displays hostel announcements and notices.
 * =============================================================================
 */
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, Info, Megaphone } from 'lucide-react';

// Announcement type icons
const typeIcons: Record<string, typeof Bell> = {
    general: Megaphone,
    maintenance: AlertTriangle,
    info: Info,
};

export default async function AnnouncementsPage() {
    // Mock announcements data
    const announcements = [
        {
            id: '1',
            title: 'Water Supply Interruption',
            content: 'Water supply will be interrupted tomorrow (29th Jan) from 10 AM to 2 PM for tank cleaning and maintenance work. Please store sufficient water for your needs.',
            type: 'maintenance',
            hostel: null, // null means all hostels
            created_at: new Date().toISOString(),
        },
        {
            id: '2',
            title: 'Hostel Day Celebrations',
            content: 'Annual Hostel Day celebrations will be held on 5th February. All residents are invited to participate in various events and cultural programs.',
            type: 'general',
            hostel: null,
            created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
            id: '3',
            title: 'WiFi Maintenance',
            content: 'Scheduled WiFi router maintenance will take place on Sunday from 6 AM to 8 AM. Internet connectivity may be affected during this time.',
            type: 'info',
            hostel: 'Hostel A',
            created_at: new Date(Date.now() - 172800000).toISOString(),
        },
    ];

    return (
        <>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div>
                    <h1 className="font-semibold">Announcements</h1>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6 max-w-3xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">Hostel Announcements</h2>
                    <p className="text-muted-foreground">
                        Stay updated with the latest notices and updates from hostel management.
                    </p>
                </div>

                {announcements.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <Bell className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No announcements</h3>
                            <p className="text-muted-foreground text-center">
                                There are no announcements at this time. Check back later.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {announcements.map((announcement) => {
                            const Icon = typeIcons[announcement.type] || Bell;

                            return (
                                <Card key={announcement.id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${announcement.type === 'maintenance'
                                                        ? 'bg-amber-100 text-amber-600'
                                                        : announcement.type === 'info'
                                                            ? 'bg-blue-100 text-blue-600'
                                                            : 'bg-indigo-100 text-indigo-600'
                                                    }`}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-semibold">{announcement.title}</h3>
                                                    {announcement.hostel && (
                                                        <Badge variant="outline" className="text-xs">
                                                            {announcement.hostel}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-muted-foreground mb-3">
                                                    {announcement.content}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Posted on{' '}
                                                    {new Date(announcement.created_at).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
