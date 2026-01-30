/**
 * =============================================================================
 * LOADING SKELETON COMPONENTS
 * =============================================================================
 * Reusable skeleton components for loading states.
 * =============================================================================
 */
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Stats card skeleton for dashboard loading
 */
export function StatCardSkeleton() {
    return (
        <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-3 w-20" />
            </CardContent>
        </Card>
    );
}

/**
 * Issue item skeleton for list loading
 */
export function IssueItemSkeleton() {
    return (
        <div className="flex items-center gap-4 p-3 rounded-lg animate-fade-in">
            <Skeleton className="w-2 h-2 rounded-full" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
        </div>
    );
}

/**
 * Dashboard skeleton - full layout
 */
export function DashboardSkeleton() {
    return (
        <div className="p-6 space-y-8 animate-fade-in">
            {/* Welcome */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
            </div>

            {/* Quick actions */}
            <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-10 rounded-lg" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-3 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <StatCardSkeleton key={i} />
                ))}
            </div>

            {/* Content grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-3 w-40" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <IssueItemSkeleton key={i} />
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-3 w-40" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="p-3 rounded-lg border space-y-2">
                                <div className="flex gap-3">
                                    <Skeleton className="h-8 w-8 rounded-lg" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-3 w-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

/**
 * Issue list skeleton
 */
export function IssueListSkeleton() {
    return (
        <div className="space-y-4 animate-fade-in">
            {[1, 2, 3, 4, 5].map((i) => (
                <IssueItemSkeleton key={i} />
            ))}
        </div>
    );
}

/**
 * Table row skeleton
 */
export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
    return (
        <div className="flex items-center gap-4 p-4 border-b animate-fade-in">
            {Array.from({ length: columns }).map((_, i) => (
                <Skeleton key={i} className="h-4 flex-1" />
            ))}
        </div>
    );
}
