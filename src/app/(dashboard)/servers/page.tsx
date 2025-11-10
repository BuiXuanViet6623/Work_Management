
'use client';

import { servers as initialServers, type Server } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Circle, EyeOff, Eye, MoreHorizontal, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import CopyButton from '@/components/dashboard/copy-button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const statusTranslations: { [key in Server['status']]: string } = {
  online: 'trực tuyến',
  warning: 'cảnh báo',
  offline: 'ngoại tuyến',
};

const PasswordCell = ({ password }: { password?: string }) => {
    const [show, setShow] = useState(false);
    if(!password) return <TableCell className="text-muted-foreground">N/A</TableCell>;
    return (
        <TableCell>
            <div className="flex items-center gap-2">
                <span>{show ? password : '••••••••'}</span>
                <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setShow(!show)}>
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
            </div>
        </TableCell>
    )
}

export default function ServersPage() {
  const [servers, setServers] = useState(initialServers);

  const handleDelete = (id: string) => {
    setServers(servers.filter(server => server.id !== id));
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>Trạng thái máy chủ</CardTitle>
          <CardDescription>Theo dõi trạng thái máy chủ, sử dụng tài nguyên và các chỉ số hiệu suất.</CardDescription>
        </div>
        <Button onClick={() => alert('Chức năng "Thêm máy chủ" đang được phát triển.')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Thêm máy chủ
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Trạng thái</TableHead>
              <TableHead>Tên máy chủ</TableHead>
              <TableHead>Địa chỉ IP</TableHead>
              <TableHead>Tên đăng nhập</TableHead>
              <TableHead>Mật khẩu</TableHead>
              <TableHead>Sử dụng CPU</TableHead>
              <TableHead>Sử dụng RAM</TableHead>
              <TableHead><span className="sr-only">Hành động</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servers.map((server) => (
              <TableRow key={server.id}>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(server.status)} className="flex items-center gap-2">
                    <Circle className={cn("w-2 h-2 fill-current", getStatusColor(server.status))} />
                    {statusTranslations[server.status]}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{server.name}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-1">
                        {server.ip}
                        <CopyButton textToCopy={server.ip} />
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-1">
                        {server.user}
                        <CopyButton textToCopy={server.user} />
                    </div>
                </TableCell>
                <PasswordCell password="password" />
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={server.cpuUsage} className="h-2 w-20" />
                    <span className="text-muted-foreground">{server.cpuUsage}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={server.ramUsage} className="h-2 w-20" />
                    <span className="text-muted-foreground">{server.ramUsage}%</span>
                  </div>
                </TableCell>
                <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => alert('Chức năng "Chỉnh sửa" đang được phát triển.')}>Chỉnh sửa</DropdownMenuItem>
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500">Xóa</DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Bạn có chắc chắn muốn xóa không?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Hành động này không thể được hoàn tác. Thao tác này sẽ xóa vĩnh viễn máy chủ khỏi hệ thống.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(server.id)}>Xóa</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
  
  function getStatusBadgeVariant(status: 'online' | 'warning' | 'offline'): 'default' | 'destructive' | 'secondary' {
    switch (status) {
      case 'online':
        return 'default';
      case 'warning':
        return 'secondary';
      case 'offline':
        return 'destructive';
    }
  };

  function getStatusColor(status: 'online' | 'warning' | 'offline') {
    switch (status) {
        case 'online': return 'text-green-500';
        case 'warning': return 'text-yellow-500';
        case 'offline': return 'text-red-500';
    }
  }
}
