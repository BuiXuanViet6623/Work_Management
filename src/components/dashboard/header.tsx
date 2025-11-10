
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import CheckIn from './check-in';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LogOut, Settings } from 'lucide-react';

const pageTitles: { [key: string]: string } = {
  '/': 'Tổng quan Bảng điều khiển',
  '/servers': 'Quản lý Máy chủ',
  '/tasks': 'Báo cáo cuối ngày',
  '/notes': 'Ghi chú Code Snippet',
  '/domains': 'Quản lý Tên miền',
};

export default function Header() {
  const pathname = usePathname();
  const avatarImage = PlaceHolderImages.find(p => p.id === 'user-avatar-1');

  return (
    <header className="sticky top-0 z-10 flex items-center h-16 px-4 bg-background/80 backdrop-blur-sm border-b shrink-0 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex items-center w-full">
        <h1 className="text-lg font-semibold md:text-xl">
          {pageTitles[pathname] || 'Bảng điều khiển'}
        </h1>
        <div className="flex items-center gap-4 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="transition-transform rounded-full hover:scale-105">
                <Avatar className="w-9 h-9">
                   {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt="User Avatar" data-ai-hint={avatarImage.imageHint} />}
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <p className="font-semibold">Quản trị viên</p>
                <p className="text-xs font-normal text-muted-foreground">admin@taskmaster.pro</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-2">
                 <CheckIn />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2" />
                <span>Cài đặt</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
