/**
 * =============================================================================
 * ADMIN SETTINGS PAGE
 * =============================================================================
 * Settings page for admin portal.
 * =============================================================================
 */
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Settings,
    Bell,
    Shield,
    Palette,
    Database,
    Mail,
} from 'lucide-react';

export default async function AdminSettingsPage() {
    const supabase = await createClient();

    // Handle case where supabase is not configured
    if (!supabase) {
        redirect('/admin-auth/login');
    }

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect('/admin-auth/login');
    }

    return (
        <>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-purple-100 bg-white/80 backdrop-blur-sm px-4">
                <SidebarTrigger className="-ml-1 text-purple-600" />
                <Separator orientation="vertical" className="mr-2 h-4 bg-purple-200" />
                <div className="flex-1">
                    <h1 className="font-semibold text-slate-900">Settings</h1>
                    <p className="text-xs text-purple-600">Configure your preferences</p>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h2>
                        <p className="text-slate-600">
                            Manage your account settings and preferences.
                        </p>
                    </div>

                    {/* Notifications */}
                    <Card className="border-purple-100">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <Bell className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">Notifications</CardTitle>
                                    <CardDescription>Configure how you receive notifications</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900">Email Notifications</p>
                                    <p className="text-sm text-slate-600">Receive email updates about issues</p>
                                </div>
                                <Badge variant="outline" className="text-slate-400">Off</Badge>
                            </div>
                            <Separator className="bg-purple-100" />
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900">New Issue Alerts</p>
                                    <p className="text-sm text-slate-600">Get notified when new issues are reported</p>
                                </div>
                                <Badge variant="outline" className="text-slate-400">Off</Badge>
                            </div>
                            <Separator className="bg-purple-100" />
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900">Weekly Summary</p>
                                    <p className="text-sm text-slate-600">Receive weekly activity summary</p>
                                </div>
                                <Badge variant="outline" className="text-slate-400">Off</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security */}
                    <Card className="border-purple-100">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <Shield className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">Security</CardTitle>
                                    <CardDescription>Manage your security preferences</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                                    <p className="text-sm text-slate-600">Add an extra layer of security</p>
                                </div>
                                <Badge variant="outline" className="text-slate-400">Off</Badge>
                            </div>
                            <Separator className="bg-purple-100" />
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900">Session Timeout</p>
                                    <p className="text-sm text-slate-600">Auto-logout after inactivity</p>
                                </div>
                                <span className="text-sm text-slate-500">30 minutes</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* System Info */}
                    <Card className="border-purple-100">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <Database className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">System Information</CardTitle>
                                    <CardDescription>Application details</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600">Version</span>
                                <span className="font-medium text-slate-900">1.0.0</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600">Environment</span>
                                <span className="font-medium text-slate-900">Production</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600">Database</span>
                                <span className="font-medium text-green-600">Connected</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Coming Soon Notice */}
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                        <Settings className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-slate-700">More settings options coming soon!</p>
                    </div>
                </div>
            </div>
        </>
    );
}
