'use client';

/**
 * PageClientLayout
 *
 * This component provides a client-side wrapper for the shared `PageLayout` component.
 * It enables client-side navigation by injecting an `onNavigate` handler using Next.js's `useRouter`.
 * 
 * Usage:
 * - Used in pages where breadcrumb links or other actions require client-side routing.
 * - Passes all received props to the underlying `PageLayout` component.
 */

import { useRouter } from 'next/navigation';
import { PageLayout, type PageLayoutProps } from "@whilter/shared-layouts/styled";

export default function PageClientLayout(props: PageLayoutProps) {
  const router = useRouter();

  return (
    <PageLayout
      {...props}
      onNavigate={(path) => router.push(path)}
    />
  );
}
