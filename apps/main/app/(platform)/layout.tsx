'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { ThemeConfig } from '@whilter/config';
import { MainLayout } from '@whilter/shared-layouts/main';

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login'); 
    }
  }, [router]);

  return (
    <ThemeConfig>
      <MainLayout>{children}</MainLayout>
    </ThemeConfig>
  );
}
