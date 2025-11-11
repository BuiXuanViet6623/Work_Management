
'use client';

import {
  LayoutDashboard,
  Server,
  ClipboardList,
  StickyNote,
  Bot,
  Globe,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', label: 'Bảng điều khiển', icon: LayoutDashboard },
  { href: '/dashboard/servers', label: 'Máy chủ', icon: Server },
  { href: '/dashboard/domains', label: 'Tên miền', icon: Globe },
  { href: '/dashboard/tasks', label: 'Báo cáo cuối ngày', icon: ClipboardList },
  { href: '/dashboard/notes', label: 'Ghi chú Code', icon: StickyNote },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-4">
          <Bot className="w-8 h-8 text-primary" />
          <span className="text-lg font-semibold text-sidebar-foreground">
            TaskMaster Pro
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="w-full p-4">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className="w-full justify-start"
                >
                  <a>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-center text-sidebar-foreground/50">
          © 2024 TaskMaster Pro
        </div>
      </SidebarFooter>
    </>
  );
}
