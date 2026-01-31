/**
 * =============================================================================
 * STUDENT PROFILE PAGE
 * =============================================================================
 * Displays and allows editing of student profile information.
 * =============================================================================
 */
import { createClient } from '@/lib/supabase/server';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Building2, DoorOpen, Calendar, Shield } from 'lucide-react';

export default async function ProfilePage() {
    const supabase = await createClient();

    // Demo profile data
    let profile = {
        id: 'demo-user',
        email: 'student@demo.com',
        full_name: 'Demo Student',
        role: 'student' as const,
        hostel: 'Demo Hostel',
        block: 'A',
        room: '101',
        created_at: new Date().toISOString(),
    };

    // Fetch real profile if Supabase is configured
    if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { data: dbProfile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (dbProfile) {
                profile = {
                    ...dbProfile,
                    email: user.email || 'N/A',
                };
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
                    <h1 className="font-semibold">My Profile</h1>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6 max-w-4xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">Profile Information</h2>
                    <p className="text-muted-foreground">
                        View and manage your account details.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Personal Details
                            </CardTitle>
                            <CardDescription>
                                Your basic account information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-bold">
                                    {profile.full_name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <p className="font-medium text-lg">{profile.full_name}</p>
                                    <Badge variant="secondary" className="capitalize">
                                        {profile.role}
                                    </Badge>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Email:</span>
                                    <span className="font-medium">{profile.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Member since:</span>
                                    <span className="font-medium">
                                        {new Date(profile.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5" />
                                Hostel Details
                            </CardTitle>
                            <CardDescription>
                                Your assigned accommodation.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4">
                                <div className="p-4 rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground mb-1">Hostel</p>
                                    <p className="font-medium text-lg">{profile.hostel || 'Not assigned'}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-lg bg-muted/50">
                                        <p className="text-sm text-muted-foreground mb-1">Block</p>
                                        <p className="font-medium">{profile.block || 'N/A'}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-muted/50">
                                        <div className="flex items-center gap-1 mb-1">
                                            <DoorOpen className="h-3 w-3 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">Room</p>
                                        </div>
                                        <p className="font-medium">{profile.room || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Security */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Account Security
                            </CardTitle>
                            <CardDescription>
                                Manage your account security settings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 rounded-lg border">
                                <div>
                                    <p className="font-medium">Password</p>
                                    <p className="text-sm text-muted-foreground">
                                        Last changed: Unknown
                                    </p>
                                </div>
                                <Badge variant="outline">Secure</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
