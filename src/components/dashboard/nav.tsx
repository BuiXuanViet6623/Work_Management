'use client';

import {
  LayoutDashboard,
  Server,
  ClipboardList,
  FileCode2,
  StickyNote,
  Bot,
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
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/', label: 'Bảng điều khiển', icon: LayoutDashboard },
  { href: '/servers', label: 'Máy chủ', icon: Server },
  { href: '/tasks', label: 'Việc hằng ngày', icon: ClipboardList },
  { href: '/templates', label: 'Mẫu', icon: FileCode2 },
  { href: '/notes', label: 'Ghi chú Code', icon: StickyNote },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Bot className="w-8 h-8 text-primary" />
          <span className="text-lg font-semibold text-sidebar-foreground">
            TaskMaster Pro
          </span>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarMenu className="w-full">
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
        <div className="p-2 text-xs text-center text-sidebar-foreground/50">
          © 2024 TaskMaster Pro
        </div>
      </SidebarFooter>
    </>
  );
}
