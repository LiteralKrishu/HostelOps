/**
 * =============================================================================
 * ADMIN AUTH LAYOUT
 * =============================================================================
 * Simple layout for admin login and register pages.
 * Does NOT include the sidebar - these are standalone pages.
 * =============================================================================
 */
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Portal - HostelOps',
    description: 'Login or register as admin, management, or staff',
};

export default function AdminAuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
