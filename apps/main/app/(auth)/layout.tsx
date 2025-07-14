'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/platform'); 
    }
  }, [router]);

  return <> <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] text-white">
        {children}
    </div></>;
}
