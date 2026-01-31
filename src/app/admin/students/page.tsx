/**
 * =============================================================================
 * STUDENTS LIST PAGE - FILTERED BY ADMIN HOSTEL
 * =============================================================================
 * Admin page to view and manage students from their assigned hostel.
 * Features: table view, search, pagination, and action buttons.
 * =============================================================================
 */
import { createClient } from '@/lib/supabase/server';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import {
    Search,
    Plus,
    ChevronLeft,
    ChevronRight,
    Pencil,
    Trash2,
    Menu,
    GraduationCap,
    Filter,
    Building2,
} from 'lucide-react';

// Demo student data for display
const demoStudents = [
    {
        id: '1',
        full_name: 'Eleanor Pena',
        email: 'eleanor@example.com',
        hostel: 'Hostel A',
        block: 'A',
        room: '101',
        phone: '+123 6988567',
        avatar: 'EP',
        created_at: '2024-02-05',
    },
    {
        id: '2',
        full_name: 'Jessie Rose',
        email: 'jessie@example.com',
        hostel: 'Hostel A',
        block: 'A',
        room: '102',
        phone: '+123 8988569',
        avatar: 'JR',
        created_at: '2024-03-04',
    },
    {
        id: '3',
        full_name: 'Jenny Wilson',
        email: 'jenny@example.com',
        hostel: 'Hostel A',
        block: 'B',
        room: '201',
        phone: '+123 7988566',
        avatar: 'JW',
        created_at: '2024-12-05',
    },
    {
        id: '4',
        full_name: 'Guy Hawkins',
        email: 'guy@example.com',
        hostel: 'Hostel A',
        block: 'B',
        room: '202',
        phone: '+123 5988565',
        avatar: 'GH',
        created_at: '2024-03-05',
    },
    {
        id: '5',
        full_name: 'Jacob Jones',
        email: 'jacob@example.com',
        hostel: 'Hostel A',
        block: 'A',
        room: '103',
        phone: '+123 9988568',
        avatar: 'JJ',
        created_at: '2024-12-05',
    },
];

export default async function StudentsListPage() {
    const supabase = await createClient();
    let students = demoStudents;
    let adminHostel = 'Demo Hostel';

    // Try to fetch real students if Supabase is configured
    if (supabase) {
        try {
            // Get current admin's hostel
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: adminProfile } = await supabase
                    .from('profiles')
                    .select('hostel')
                    .eq('id', user.id)
                    .single();

                if (adminProfile?.hostel) {
                    adminHostel = adminProfile.hostel;

                    // Fetch students from this hostel only
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('role', 'student')
                        .eq('hostel', adminHostel)
                        .order('created_at', { ascending: false });

                    if (data && data.length > 0 && !error) {
                        students = data.map((s) => ({
                            id: s.id,
                            full_name: s.full_name || 'Unknown',
                            email: s.email || '',
                            hostel: s.hostel || 'Not assigned',
                            block: s.block || '-',
                            room: s.room || '-',
                            phone: s.phone || '-',
                            avatar: (s.full_name || 'U').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2),
                            created_at: s.created_at ? new Date(s.created_at).toLocaleDateString() : '-',
                        }));
                    }
                }
            }
        } catch {
            // Use demo data
        }
    }

    // Count stats
    const uniqueBlocks = [...new Set(students.map(s => s.block))].filter(b => b !== '-');
    const uniqueRooms = [...new Set(students.map(s => s.room))].filter(r => r !== '-');

    return (
        <>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-purple-100 bg-white/80 backdrop-blur-sm px-6">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="-ml-1 text-purple-600 hover:text-purple-700">
                        <Menu className="h-5 w-5" />
                    </SidebarTrigger>
                    <div className="h-4 w-px bg-purple-200" />
                    <div>
                        <h1 className="font-semibold text-slate-900">Students List</h1>
                        <p className="text-xs text-purple-600">Home / Students</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* Hostel Badge */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                        <Building2 className="h-4 w-4" />
                        {adminHostel}
                    </div>
                    <Link
                        href="/admin/students/new"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg shadow-purple-200"
                    >
                        <Plus className="h-4 w-4" />
                        Add Student
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Students Information Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
                    {/* Card Header with Search */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 border-b border-purple-50">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">Students Information</h2>
                            <p className="text-xs text-slate-500">Showing students from {adminHostel}</p>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            {/* Search */}
                            <div className="relative flex-1 sm:flex-initial">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name or room"
                                    className="w-full sm:w-64 h-10 pl-10 pr-4 text-sm border border-purple-100 rounded-lg bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
                                />
                            </div>
                            {/* Filter */}
                            <button className="flex items-center gap-2 h-10 px-4 text-sm text-slate-600 border border-purple-100 rounded-lg hover:bg-purple-50 transition-all">
                                <Filter className="h-4 w-4" />
                                <span className="hidden sm:inline">Filter</span>
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-purple-50/50">
                                    <th className="w-12 px-4 py-3">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Student Name
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Room
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Block
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Joined
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-purple-50">
                                {students.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                                            No students found in {adminHostel}
                                        </td>
                                    </tr>
                                ) : (
                                    students.map((student) => (
                                        <tr key={student.id} className="hover:bg-purple-50/30 transition-colors">
                                            <td className="px-4 py-4">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                                                />
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium shadow-sm">
                                                        {student.avatar}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900">{student.full_name}</p>
                                                        <p className="text-xs text-slate-500">{student.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-md">
                                                    #{student.room}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md">
                                                    {student.block}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-slate-600">{student.created_at}</td>
                                            <td className="px-4 py-4 text-sm text-slate-600">{student.phone}</td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                                                        <Pencil className="h-4 w-4" />
                                                    </button>
                                                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-purple-50 bg-purple-50/30">
                        <p className="text-sm text-slate-500">
                            Showing <span className="font-medium text-slate-700">1</span> to{' '}
                            <span className="font-medium text-slate-700">{students.length}</span> of{' '}
                            <span className="font-medium text-slate-700">{students.length}</span> entries
                        </p>
                        <div className="flex items-center gap-1">
                            <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-white rounded-lg transition-all border border-purple-100">
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            {[1, 2, 3].map((page) => (
                                <button
                                    key={page}
                                    className={`min-w-[36px] h-9 px-3 text-sm font-medium rounded-lg transition-all ${page === 1
                                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
                                            : 'text-slate-600 hover:bg-white hover:text-purple-600 border border-purple-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-white rounded-lg transition-all border border-purple-100">
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                <GraduationCap className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">{students.length}</p>
                                <p className="text-xs text-slate-500">Total Students</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">1</p>
                                <p className="text-xs text-slate-500">Hostel</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">{uniqueBlocks.length}</p>
                                <p className="text-xs text-slate-500">Blocks</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">{uniqueRooms.length}</p>
                                <p className="text-xs text-slate-500">Rooms Occupied</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
