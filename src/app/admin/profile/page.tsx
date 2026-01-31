/**
 * =============================================================================
 * ADMIN PROFILE PAGE
 * =============================================================================
 * Displays admin/staff profile information.
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
    Calendar,
    Edit,
    Shield,
    Crown,
} from 'lucide-react';

export default async function AdminProfilePage() {
    const supabase = await createClient();

    // Handle case where supabase is not configured
    if (!supabase) {
        redirect('/admin-auth/login');
    }

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect('/admin-auth/login');
    }

    // Fetch user profile
    const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    const profile = {
        id: profileData?.id || user.id,
        full_name: profileData?.full_name || 'Unknown',
        email: user.email || '',
        phone: profileData?.phone || '-',
        hostel: profileData?.hostel || 'Not assigned',
        role: profileData?.role || 'staff',
        created_at: profileData?.created_at || new Date().toISOString(),
    };

    // Get initials for avatar
    const initials = profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    // Role icon and color
    const getRoleStyles = (role: string) => {
        switch (role) {
            case 'admin':
                return { icon: Crown, color: 'from-amber-500 to-orange-600', badge: 'bg-amber-100 text-amber-800' };
            case 'management':
                return { icon: Shield, color: 'from-violet-600 to-purple-700', badge: 'bg-violet-100 text-violet-800' };
            default:
                return { icon: User, color: 'from-blue-500 to-indigo-600', badge: 'bg-blue-100 text-blue-800' };
        }
    };

    const roleStyles = getRoleStyles(profile.role);
    const RoleIcon = roleStyles.icon;

    return (
        <>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-4 border-b border-purple-100 bg-white/80 backdrop-blur-sm px-6">
                <SidebarTrigger className="-ml-1 text-purple-600 hover:text-purple-700">
                    <Menu className="h-5 w-5" />
                </SidebarTrigger>
                <div className="h-4 w-px bg-purple-200" />
                <div className="flex-1">
                    <h1 className="font-semibold text-slate-900">Profile</h1>
                    <p className="text-xs text-purple-600">Manage your account</p>
                </div>
                <Link
                    href="/admin/profile/edit"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all shadow-sm"
                >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                </Link>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
                        {/* Header Banner */}
                        <div className={`h-32 bg-gradient-to-r ${roleStyles.color}`} />

                        {/* Profile Info */}
                        <div className="px-6 pb-6 -mt-16">
                            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                                {/* Avatar */}
                                <div className="h-32 w-32 rounded-2xl bg-white shadow-xl border-4 border-white flex items-center justify-center">
                                    <span className={`text-4xl font-bold bg-gradient-to-br ${roleStyles.color} bg-clip-text text-transparent`}>
                                        {initials}
                                    </span>
                                </div>

                                {/* Name & Role */}
                                <div className="flex-1 pb-2">
                                    <h2 className="text-2xl font-bold text-slate-900">{profile.full_name}</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${roleStyles.badge}`}>
                                            <RoleIcon className="h-4 w-4" />
                                            {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Contact Info */}
                        <div className="bg-white rounded-xl border border-purple-100 p-6">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                                        <Mail className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Email</p>
                                        <p className="font-medium text-slate-900">{profile.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                                        <Phone className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Phone</p>
                                        <p className="font-medium text-slate-900">{profile.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Assignment Info */}
                        <div className="bg-white rounded-xl border border-purple-100 p-6">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Assignment</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                                        <Building2 className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Hostel</p>
                                        <p className="font-medium text-slate-900">{profile.hostel}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                                        <Calendar className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Member Since</p>
                                        <p className="font-medium text-slate-900">
                                            {new Date(profile.created_at).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
