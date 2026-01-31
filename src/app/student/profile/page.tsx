/**
 * =============================================================================
 * STUDENT PROFILE PAGE
 * =============================================================================
 * Displays student profile information including hostel, block, and room.
 * =============================================================================
 */
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import {
    Menu,
    User,
    Mail,
    Phone,
    Building2,
    Home,
    MapPin,
    Calendar,
    Edit,
    Shield,
    GraduationCap,
} from 'lucide-react';

export default async function StudentProfilePage() {
    const supabase = await createClient();
    let profile = {
        id: 'demo',
        full_name: 'Demo Student',
        email: 'demo@example.com',
        phone: '+123 456 7890',
        hostel: 'Demo Hostel',
        block: 'A',
        room: '101',
        role: 'student',
        created_at: new Date().toISOString(),
    };

    if (supabase) {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            redirect('/login');
        }

        // Fetch user profile
        const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (profileData) {
            profile = {
                id: profileData.id,
                full_name: profileData.full_name || 'Unknown',
                email: user.email || '',
                phone: profileData.phone || '-',
                hostel: profileData.hostel || 'Not assigned',
                block: profileData.block || '-',
                room: profileData.room || '-',
                role: profileData.role || 'student',
                created_at: profileData.created_at || new Date().toISOString(),
            };
        }
    }

    // Get initials for avatar
    const initials = profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-4 border-b border-purple-100 bg-white/80 backdrop-blur-sm px-6">
                <SidebarTrigger className="-ml-1 text-purple-600 hover:text-purple-700">
                    <Menu className="h-5 w-5" />
                </SidebarTrigger>
                <div className="h-4 w-px bg-purple-200" />
                <div>
                    <h1 className="font-semibold text-slate-900">My Profile</h1>
                    <p className="text-xs text-purple-600">Dashboard / Profile</p>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Header Card */}
                    <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden mb-6">
                        {/* Cover gradient */}
                        <div className="h-32 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600" />

                        {/* Profile info */}
                        <div className="relative px-6 pb-6">
                            {/* Avatar */}
                            <div className="absolute -top-12 left-6">
                                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white">
                                    {initials}
                                </div>
                            </div>

                            {/* Name and role */}
                            <div className="pt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">{profile.full_name}</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">
                                            <GraduationCap className="h-3 w-3" />
                                            {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                                        </span>
                                        <span className="text-sm text-slate-500">
                                            Member since {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    href="/student/profile/edit"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-all text-sm font-medium"
                                >
                                    <Edit className="h-4 w-4" />
                                    Edit Profile
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Info Cards Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Personal Information */}
                        <div className="bg-white rounded-xl border border-purple-100 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <User className="h-4 w-4 text-purple-600" />
                                </div>
                                <h3 className="font-semibold text-slate-900">Personal Information</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-500">Full Name</p>
                                        <p className="text-sm font-medium text-slate-900">{profile.full_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-500">Email Address</p>
                                        <p className="text-sm font-medium text-slate-900">{profile.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-500">Phone Number</p>
                                        <p className="text-sm font-medium text-slate-900">{profile.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hostel Information */}
                        <div className="bg-white rounded-xl border border-purple-100 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <Building2 className="h-4 w-4 text-purple-600" />
                                </div>
                                <h3 className="font-semibold text-slate-900">Hostel Information</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Building2 className="h-5 w-5 text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-500">Hostel Name</p>
                                        <p className="text-sm font-medium text-slate-900">{profile.hostel}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-500">Block</p>
                                        <p className="text-sm font-medium text-slate-900">Block {profile.block}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Home className="h-5 w-5 text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-500">Room Number</p>
                                        <p className="text-sm font-medium text-slate-900">Room {profile.room}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl border border-purple-100 shadow-sm p-5">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                    <Building2 className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-900">{profile.hostel}</p>
                                    <p className="text-xs text-slate-500">Hostel</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-purple-100 shadow-sm p-5">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                    <MapPin className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-900">Block {profile.block}</p>
                                    <p className="text-xs text-slate-500">Block</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-purple-100 shadow-sm p-5">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                                    <Home className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-900">#{profile.room}</p>
                                    <p className="text-xs text-slate-500">Room</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-purple-100 shadow-sm p-5">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                                    <Calendar className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-900">{new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                                    <p className="text-xs text-slate-500">Joined</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Card */}
                    <div className="mt-6 bg-white rounded-xl border border-purple-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                                <Shield className="h-4 w-4 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-slate-900">Account & Security</h3>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/student/profile/change-password"
                                className="flex-1 p-4 rounded-xl border border-purple-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all group"
                            >
                                <p className="font-medium text-slate-900 group-hover:text-purple-700">Change Password</p>
                                <p className="text-sm text-slate-500">Update your account password</p>
                            </Link>
                            <Link
                                href="/student/profile/notifications"
                                className="flex-1 p-4 rounded-xl border border-purple-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all group"
                            >
                                <p className="font-medium text-slate-900 group-hover:text-purple-700">Notifications</p>
                                <p className="text-sm text-slate-500">Manage your notification preferences</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
