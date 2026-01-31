/**
 * =============================================================================
 * LOST & FOUND PAGE
 * =============================================================================
 * Browse and report lost/found items.
 * =============================================================================
 */
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, MapPin, Calendar, Package } from 'lucide-react';

export default async function LostFoundPage() {
    const supabase = await createClient();

    // Fetch lost & found items
    const { data: items, error } = await supabase
        .from('lost_found_items')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching lost & found items:', error);
    }

    const safeItems = items || [];

    return (
        <>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="flex-1">
                    <h1 className="font-semibold">Lost & Found</h1>
                </div>
                <Link href="/student/lost-found/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Report Item
                    </Button>
                </Link>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">Lost & Found Items</h2>
                    <p className="text-muted-foreground">
                        Report lost items or help others find their belongings.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <Button variant="secondary" size="sm">
                        All ({safeItems.length})
                    </Button>
                    {/* Simplified filters for now - could be client-side filtered later */}
                </div>

                {safeItems.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <Search className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No items reported</h3>
                            <p className="text-muted-foreground text-center mb-4">
                                No lost or found items have been reported yet.
                            </p>
                            <Link href="/student/lost-found/new">
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Report an Item
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {safeItems.map((item) => (
                            <Card key={item.id} className="overflow-hidden">
                                {/* Image placeholder or real image */}
                                <div className="h-40 bg-muted flex items-center justify-center overflow-hidden">
                                    {item.image_url ? (
                                        <img src={item.image_url} alt={item.description} className="w-full h-full object-cover" />
                                    ) : (
                                        <Package className="h-12 w-12 text-muted-foreground/50" />
                                    )}
                                </div>

                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge
                                            variant={item.type === 'lost' ? 'destructive' : 'default'}
                                            className={
                                                item.type === 'lost'
                                                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                                            }
                                        >
                                            {item.type === 'lost' ? 'Lost' : 'Found'}
                                        </Badge>
                                        {item.status === 'claimed' && (
                                            <Badge variant="secondary">Claimed</Badge>
                                        )}
                                    </div>

                                    <p className="font-medium mb-3 line-clamp-2">{item.description}</p>

                                    <div className="space-y-1 text-sm text-muted-foreground">
                                        {item.location && (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-3.5 w-3.5" />
                                                <span>{item.location}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>{new Date(item.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="p-4 pt-0">
                                    {item.status === 'open' && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                            // TODO: Implement claim/found functionality
                                            disabled
                                        >
                                            {item.type === 'lost' ? 'I Found This' : 'This is Mine'}
                                        </Button>
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
