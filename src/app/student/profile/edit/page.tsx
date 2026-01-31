/**
 * =============================================================================
 * EDIT PROFILE PAGE
 * =============================================================================
 * Allows students to update their profile information.
 * =============================================================================
 */
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Menu, ArrowLeft } from 'lucide-react';
import { EditProfileForm } from './edit-form';

export default async function EditProfilePage() {
    const supabase = await createClient();

    if (!supabase) {
        // Demo mode
        const demoProfile = {
            id: 'demo',
            full_name: 'Demo Student',
            email: 'demo@example.com',
            phone: '+123 456 7890',
            hostel: 'Demo Hostel',
            block: 'A',
            room: '101',
        };

        return (
            <>
                <EditHeader />
                <EditContent profile={demoProfile} />
            </>
        );
    }

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect('/login');
    }

    // Fetch current profile
    const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    const profile = {
        id: profileData?.id || user.id,
        full_name: profileData?.full_name || '',
        email: user.email || '',
        phone: profileData?.phone || '',
        hostel: profileData?.hostel || '',
        block: profileData?.block || '',
        room: profileData?.room || '',
    };

    return (
        <>
            <EditHeader />
            <EditContent profile={profile} />
        </>
    );
}

function EditHeader() {
    return (
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-purple-100 bg-white/80 backdrop-blur-sm px-6">
            <SidebarTrigger className="-ml-1 text-purple-600 hover:text-purple-700">
                <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div className="h-4 w-px bg-purple-200" />
            <div className="flex items-center gap-3">
                <Link
                    href="/student/profile"
                    className="text-purple-600 hover:text-purple-700 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="font-semibold text-slate-900">Edit Profile</h1>
                    <p className="text-xs text-purple-600">Profile / Edit</p>
                </div>
            </div>
        </header>
    );
}

interface ProfileData {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    hostel: string;
    block: string;
    room: string;
}

function EditContent({ profile }: { profile: ProfileData }) {
    return (
        <div className="flex-1 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-6">Update Your Information</h2>
                    <EditProfileForm profile={profile} />
                </div>
            </div>
        </div>
    );
}
