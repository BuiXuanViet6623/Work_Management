'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, Server, Globe, StickyNote } from 'lucide-react';
import OverviewCharts from '@/components/dashboard/overview-charts';
import { reports, servers, domains, notes } from '@/lib/data';
import Link from 'next/link';

const overviewItems = [
    {
        title: 'Báo cáo đã gửi',
        count: reports.length,
        icon: ClipboardList,
        href: '/dashboard/tasks'
    },
    {
        title: 'Máy chủ đang theo dõi',
        count: servers.length,
        icon: Server,
        href: '/dashboard/servers'
    },
    {
        title: 'Tên miền đang quản lý',
        count: domains.length,
        icon: Globe,
        href: '/dashboard/domains'
    },
    {
        title: 'Ghi chú đã lưu',
        count: notes.length,
        icon: StickyNote,
        href: '/dashboard/notes'
    }
]

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="grid gap-6 md:col-span-3">
            <div className="grid gap-6 md:grid-cols-2">
                {overviewItems.map((item) => (
                     <Link href={item.href} key={item.title}>
                        <Card className="transition-all hover:shadow-md hover:-translate-y-1">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                                <item.icon className="w-5 h-5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{item.count}</div>
                            </CardContent>
                        </Card>
                     </Link>
                ))}
            </div>
            {/* Add more cards or main content here */}
        </div>
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Tổng quan hệ thống</CardTitle>
                    <CardDescription>Biểu đồ tải tài nguyên và công việc.</CardDescription>
                </CardHeader>
                <CardContent>
                    <OverviewCharts />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
