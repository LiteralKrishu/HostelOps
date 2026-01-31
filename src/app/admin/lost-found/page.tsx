/**
 * =============================================================================
 * ADMIN LOST & FOUND PAGE
 * =============================================================================
 * Admin view for managing lost & found items.
 * =============================================================================
 */
import { createClient } from '@/lib/supabase/server';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Calendar, Package, Trash2, CheckCircle } from 'lucide-react';

export default async function AdminLostFoundPage() {
    const supabase = await createClient();

    // Handle case where supabase is not configured
    if (!supabase) {
        return (
            <div className="flex-1 p-6 text-center">
                <p className="text-slate-600">Database connection not available</p>
            </div>
        );
    }

    // Fetch all lost & found items with reporter info
    const { data: items, error } = await supabase
        .from('lost_found_items')
        .select(`
            *,
            reporter:reported_by(full_name)
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching lost & found items:', error);
    }

    const safeItems = items || [];

    return (
        <>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-purple-100 bg-white/80 backdrop-blur-sm px-4">
                <SidebarTrigger className="-ml-1 text-purple-600" />
                <Separator orientation="vertical" className="mr-2 h-4 bg-purple-200" />
                <div className="flex-1">
                    <h1 className="font-semibold text-slate-900">Lost & Found</h1>
                    <p className="text-xs text-purple-600">Manage reported items</p>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Lost & Found Items</h2>
                    <p className="text-slate-600">
                        View and manage all reported lost and found items.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4 mb-6">
                    <Card className="border-purple-100">
                        <CardContent className="p-4">
                            <p className="text-sm text-slate-600">Total Items</p>
                            <p className="text-2xl font-bold text-slate-900">{safeItems.length}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-purple-100">
                        <CardContent className="p-4">
                            <p className="text-sm text-slate-600">Lost</p>
                            <p className="text-2xl font-bold text-red-600">
                                {safeItems.filter(i => i.type === 'lost').length}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-purple-100">
                        <CardContent className="p-4">
                            <p className="text-sm text-slate-600">Found</p>
                            <p className="text-2xl font-bold text-green-600">
                                {safeItems.filter(i => i.type === 'found').length}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-purple-100">
                        <CardContent className="p-4">
                            <p className="text-sm text-slate-600">Claimed</p>
                            <p className="text-2xl font-bold text-purple-600">
                                {safeItems.filter(i => i.status === 'claimed').length}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {safeItems.length === 0 ? (
                    <Card className="border-purple-100">
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="h-16 w-16 rounded-full bg-purple-50 flex items-center justify-center mb-4">
                                <Search className="h-8 w-8 text-purple-400" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 mb-2">No items reported</h3>
                            <p className="text-slate-600 text-center">
                                No lost or found items have been reported yet.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {safeItems.map((item) => (
                            <Card key={item.id} className="overflow-hidden border-purple-100 hover:shadow-md transition-shadow">
                                {/* Image */}
                                <div className="h-40 bg-purple-50 flex items-center justify-center overflow-hidden">
                                    {item.image_url ? (
                                        <img src={item.image_url} alt={item.description} className="w-full h-full object-cover" />
                                    ) : (
                                        <Package className="h-12 w-12 text-purple-300" />
                                    )}
                                </div>

                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge
                                            className={
                                                item.type === 'lost'
                                                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                                            }
                                        >
                                            {item.type === 'lost' ? 'Lost' : 'Found'}
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className={
                                                item.status === 'claimed'
                                                    ? 'border-purple-300 text-purple-700'
                                                    : item.status === 'closed'
                                                        ? 'border-slate-300 text-slate-600'
                                                        : 'border-amber-300 text-amber-700'
                                            }
                                        >
                                            {item.status}
                                        </Badge>
                                    </div>

                                    <p className="font-medium text-slate-900 mb-2 line-clamp-2">{item.description}</p>

                                    <div className="space-y-1 text-sm text-slate-600">
                                        {item.location && (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-3.5 w-3.5 text-purple-500" />
                                                <span>{item.location}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-3.5 w-3.5 text-purple-500" />
                                            <span>{new Date(item.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {item.reporter && (
                                        <p className="text-xs text-slate-500 mt-2">
                                            Reported by: {item.reporter.full_name}
                                        </p>
                                    )}
                                </CardContent>

                                <CardFooter className="p-4 pt-0 flex gap-2">
                                    {item.status === 'open' && (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                                                disabled
                                            >
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Mark Claimed
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-red-200 text-red-600 hover:bg-red-50"
                                                disabled
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
