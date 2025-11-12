
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for authentication status only on the client side
    setIsAuthenticated(sessionStorage.getItem('isAuthenticated') === 'true');
  }, []);

  useEffect(() => {
    // Wait until authentication status is determined
    if (isAuthenticated === null) {
      return; // Still loading
    }

    if (isAuthenticated) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  // Return null or a loading spinner while redirecting
  return null;
}
