
'use client';

import { NavbarLayout } from "@whilter/shared-layouts/navbar";
import { useRouter } from 'next/navigation';

export function NavbarClientWrapper({
    user,
    children
}: {
    user: any;
    children: React.ReactNode;
}) {
    const router = useRouter();

    return (
        <NavbarLayout
            onSettings={(path) => router.push(path)}
            user={user}
        >
            {children}
        </NavbarLayout>
    );
}