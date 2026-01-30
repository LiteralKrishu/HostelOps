/**
 * =============================================================================
 * SUBMIT BUTTON WITH LOADING STATE
 * =============================================================================
 * A button component that shows loading state during form submission.
 * =============================================================================
 */
'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';

interface SubmitButtonProps {
    children: React.ReactNode;
    loadingText?: string;
    className?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function SubmitButton({
    children,
    loadingText = 'Processing...',
    className,
    variant = 'default',
    size = 'default',
}: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            variant={variant}
            size={size}
            className={cn(
                'transition-all duration-200',
                pending && 'opacity-80',
                className
            )}
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {loadingText}
                </>
            ) : (
                children
            )}
        </Button>
    );
}

/**
 * Loading spinner component
 */
export function LoadingSpinner({ className }: { className?: string }) {
    return (
        <div className={cn('flex items-center justify-center', className)}>
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    );
}

/**
 * Full page loading state
 */
export function PageLoading() {
    return (
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
                <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-muted animate-pulse mx-auto" />
                    <Loader2 className="h-8 w-8 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
            </div>
        </div>
    );
}
