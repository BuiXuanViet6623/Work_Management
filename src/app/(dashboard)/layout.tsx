
'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from '@/components/dashboard/header';
import Nav from '@/components/dashboard/nav';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [router]);

  // Redirect root of (dashboard) group to /dashboard
  useEffect(() => {
    if (pathname === '/') {
      router.replace('/dashboard');
    }
  }, [pathname, router]);

  return (
    <SidebarProvider>
      <Sidebar>
        <Nav />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
