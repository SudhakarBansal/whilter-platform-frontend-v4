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

  return <div className="min-h-screen flex items-center justify-center 
  bg-gradient-to-b from-blue-700 to-blue-900 
  bg-[url('/images/auth-background.png')] bg-cover bg-center bg-no-repeat text-white">
  {children}
</div>
}
