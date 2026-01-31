/**
 * =============================================================================
 * REPORT ISSUE PAGE
 * =============================================================================
 * Form for students to report new hostel issues.
 * Features category selection, priority, and media upload.
 * =============================================================================
 */
import { createClient } from '@/lib/supabase/server';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { ReportIssueForm } from './report-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export default async function ReportIssuePage() {
    const supabase = await createClient();

    // Demo mode fallback
    let location = {
        hostel: 'Demo Hostel',
        block: 'A',
        room: '101',
    };

    if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();

        // Get user profile for location auto-fill
        if (user) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('hostel, block, room')
                .eq('id', user.id)
                .single();

            if (profile) {
                location = profile;
            }
        }
    }

    return (
        <>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div>
                    <h1 className="font-semibold">Report Issue</h1>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6 max-w-4xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">Report a New Issue</h2>
                    <p className="text-muted-foreground">
                        Describe your issue and we&apos;ll get it resolved as quickly as possible.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Issue Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Issue Details</CardTitle>
                                <CardDescription>
                                    Provide as much detail as possible to help us resolve your issue quickly.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ReportIssueForm location={location} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Location Info (Auto-filled) */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    Your Location
                                </CardTitle>
                                <CardDescription>
                                    This information is auto-filled from your profile.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Hostel</p>
                                    <p className="font-medium">{location.hostel}</p>
                                </div>
                                {location.block && (
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Block</p>
                                        <p className="font-medium">{location.block}</p>
                                    </div>
                                )}
                                {location.room && (
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Room</p>
                                        <p className="font-medium">{location.room}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Tips Card */}
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle className="text-sm">💡 Tips for Quick Resolution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-sm text-muted-foreground space-y-2">
                                    <li>• Be specific about the location</li>
                                    <li>• Describe the issue clearly</li>
                                    <li>• Attach photos if possible</li>
                                    <li>• Set appropriate priority</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
