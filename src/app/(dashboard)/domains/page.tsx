
'use client';

import { domains as initialDomains, type Domain } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
import { useState, useMemo } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const statusTranslations: { [key in Domain['status']]: string } = {
  active: 'Hoạt động',
  inactive: 'Không hoạt động',
};

const statusVariants: { [key in Domain['status']]: 'default' | 'destructive' } = {
    active: 'default',
    inactive: 'destructive',
};

export default function DomainsPage() {
  const [domains, setDomains] = useState(initialDomains);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState<Domain | null>(null);
  const [domainToDelete, setDomainToDelete] = useState<Domain | null>(null);

  const filteredDomains = useMemo(() => {
    return domains.filter(domain =>
      domain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      domain.provider.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [domains, searchTerm]);

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newDomain: Domain = {
      id: `domain-${Date.now()}`,
      name: formData.get('name') as string,
      provider: formData.get('provider') as string,
      status: formData.get('status') as Domain['status'],
    };
    setDomains([newDomain, ...domains]);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingDomain) return;

    const formData = new FormData(event.currentTarget);
    const updatedDomain: Domain = {
      ...editingDomain,
      name: formData.get('name') as string,
      provider: formData.get('provider') as string,
      status: formData.get('status') as Domain['status'],
    };
    
    setDomains(domains.map(d => d.id === editingDomain.id ? updatedDomain : d));
    setEditingDomain(null);
  };


  const handleDelete = () => {
    if (!domainToDelete) return;
    setDomains(domains.filter(domain => domain.id !== domainToDelete.id));
    setDomainToDelete(null);
  }

  return (
    <>
    <div>
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Quản lý Tên miền</h1>
                <p className="text-muted-foreground">Theo dõi và xem trước các tên miền của bạn.</p>
            </div>
            <div className="flex gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Tìm kiếm tên miền..."
                        className="pl-8 sm:w-[200px] md:w-[300px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Thêm tên miền
                </Button>
            </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDomains.map((domain) => (
            <Card key={domain.id} className="relative flex flex-col">
              <CardHeader>
                  <CardTitle className="truncate">
                    <a href={`//${domain.name}`} target="_blank" rel="noopener noreferrer">
                        {domain.name}
                    </a>
                  </CardTitle>
                  <CardDescription>
                    Nhà cung cấp: {domain.provider}
                  </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                  <div className="aspect-[4/3] w-full bg-muted rounded-md overflow-hidden border">
                      <iframe
                        src={`//${domain.name}`}
                        className="w-full h-full"
                        sandbox="allow-scripts allow-same-origin"
                        loading="lazy"
                        title={domain.name}
                      />
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant={statusVariants[domain.status]}>
                        {statusTranslations[domain.status]}
                    </Badge>
                  </div>
              </CardContent>
              <div className="absolute top-4 right-4">
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setEditingDomain(domain)}>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => setDomainToDelete(domain)} className="text-destructive focus:text-destructive focus:bg-destructive/10">Xóa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
              </div>
            </Card>
        ))}
        </div>
    </div>


    {/* Add/Edit Dialogs */}
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm tên miền mới</DialogTitle>
            <DialogDescription>Nhập thông tin chi tiết cho tên miền mới.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAdd}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Tên miền</Label>
                <Input id="name" name="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="provider" className="text-right">Nhà cung cấp</Label>
                <Input id="provider" name="provider" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Trạng thái</Label>
                 <Select name="status" required>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Hoạt động</SelectItem>
                        <SelectItem value="inactive">Không hoạt động</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Hủy</Button>
              </DialogClose>
              <Button type="submit">Lưu</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    
      <Dialog open={!!editingDomain} onOpenChange={(isOpen) => !isOpen && setEditingDomain(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa tên miền</DialogTitle>
            <DialogDescription>Cập nhật thông tin chi tiết cho tên miền.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name-edit" className="text-right">Tên miền</Label>
                <Input id="name-edit" name="name" className="col-span-3" defaultValue={editingDomain?.name} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="provider-edit" className="text-right">Nhà cung cấp</Label>
                <Input id="provider-edit" name="provider" className="col-span-3" defaultValue={editingDomain?.provider} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status-edit" className="text-right">Trạng thái</Label>
                 <Select name="status" defaultValue={editingDomain?.status} required>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Hoạt động</SelectItem>
                        <SelectItem value="inactive">Không hoạt động</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={() => setEditingDomain(null)}>Hủy</Button>
              </DialogClose>
              <Button type="submit">Lưu thay đổi</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    
      <AlertDialog open={!!domainToDelete} onOpenChange={(isOpen) => !isOpen && setDomainToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa không?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể được hoàn tác. Thao tác này sẽ xóa vĩnh viễn tên miền khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDomainToDelete(null)}>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

    