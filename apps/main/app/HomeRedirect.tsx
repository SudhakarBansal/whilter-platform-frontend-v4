'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { PUBLIC_ROUTES } from '@whilter/config';
import { getTokenPayload } from '@/lib/auth';

export default function HomeRedirect() {
  
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get('auth-token');
    if (token) {
      try {
        const { role, exp } = getTokenPayload(token);
        router.replace(PUBLIC_ROUTES.HOME[role]);
      } catch (error) {
        console.error('Invalid token:', error);
        router.replace(PUBLIC_ROUTES.LOGIN);
      }
    } else {
      router.replace(PUBLIC_ROUTES.LOGIN);
    }
  }, [router]);

  return null;
}
