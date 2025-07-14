'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace(isAuthenticated() ? '/platform' : '/login');
  }, [router]);

  return null;
}
