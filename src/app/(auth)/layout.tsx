/**
 * =============================================================================
 * AUTH LAYOUT
 * =============================================================================
 * Shared layout for authentication pages (login, register).
 * =============================================================================
 */
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Authentication - HostelOps',
    description: 'Sign in or create an account to access HostelOps',
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
