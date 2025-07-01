'use client';

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