'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isAuthenticated } from '@/lib/auth'; 

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    const auth = isAuthenticated();
    if (auth) {
      router.replace('/'); 
    } else {
      router.replace('/login');
    }
  }, [router]);

  return null; 
}
