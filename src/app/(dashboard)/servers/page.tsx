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
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingServer, setEditingServer] = useState<Server | null>(null);
  const [serverToDelete, setServerToDelete] = useState<Server | null>(null);
  
  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newServer: Server = {
      id: `server-${Date.now()}`,
      name: formData.get('name') as string,
      ip: formData.get('ip') as string,
      user: formData.get('user') as string,
      // password is not stored for security reasons in this example
      status: 'online', // Default status
      cpuUsage: 0,
      ramUsage: 0,
      storageUsage: 0,
    };
    setServers([newServer, ...servers]);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingServer) return;
  
    const formData = new FormData(event.currentTarget);
    const updatedServer: Server = {
      ...editingServer,
      name: formData.get('name') as string,
      ip: formData.get('ip') as string,
      user: formData.get('user') as string,
    };
    
    setServers(servers.map(s => s.id === editingServer.id ? updatedServer : s));
    setEditingServer(null);
  };

  const handleDelete = () => {
    if (!serverToDelete) return;
    setServers(servers.filter(server => server.id !== serverToDelete.id));
    setServerToDelete(null);
  }

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Trạng thái máy chủ</CardTitle>
            <CardDescription>Theo dõi trạng thái máy chủ, sử dụng tài nguyên và các chỉ số hiệu suất.</CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
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
                        <DropdownMenuItem onClick={() => setEditingServer(server)}>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => setServerToDelete(server)} className="text-destructive hover:text-destructive">Xóa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm máy chủ mới</DialogTitle>
            <DialogDescription>Nhập thông tin chi tiết cho máy chủ mới.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAdd}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name-add" className="text-right">Tên máy chủ</Label>
                <Input id="name-add" name="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ip-add" className="text-right">Địa chỉ IP</Label>
                <Input id="ip-add" name="ip" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user-add" className="text-right">Tên đăng nhập</Label>
                <Input id="user-add" name="user" className="col-span-3" required />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password-add" className="text-right">Mật khẩu</Label>
                <Input id="password-add" name="password" type="password" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
                <DialogClose asChild><Button type="button" variant="outline">Hủy</Button></DialogClose>
                <Button type="submit">Lưu</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={!!editingServer} onOpenChange={(isOpen) => !isOpen && setEditingServer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa máy chủ</DialogTitle>
            <DialogDescription>Cập nhật thông tin chi tiết cho máy chủ.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name-edit" className="text-right">Tên máy chủ</Label>
                <Input id="name-edit" name="name" className="col-span-3" defaultValue={editingServer?.name} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ip-edit" className="text-right">Địa chỉ IP</Label>
                <Input id="ip-edit" name="ip" className="col-span-3" defaultValue={editingServer?.ip} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user-edit" className="text-right">Tên đăng nhập</Label>
                <Input id="user-edit" name="user" className="col-span-3" defaultValue={editingServer?.user} required />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password-edit" className="text-right">Mật khẩu mới</Label>
                <Input id="password-edit" name="password" type="password" placeholder="Để trống nếu không đổi" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
                <DialogClose asChild><Button type="button" variant="outline" onClick={() => setEditingServer(null)}>Hủy</Button></DialogClose>
                <Button type="submit">Lưu thay đổi</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!serverToDelete} onOpenChange={(isOpen) => !isOpen && setServerToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa không?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể được hoàn tác. Thao tác này sẽ xóa vĩnh viễn máy chủ khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setServerToDelete(null)}>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
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