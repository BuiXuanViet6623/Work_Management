
'use client';

import { domains as initialDomains, type Domain } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
import { useState } from 'react';

const statusTranslations: { [key in Domain['status']]: string } = {
  active: 'Hoạt động',
  expiring_soon: 'Sắp hết hạn',
  expired: 'Đã hết hạn',
};

const statusVariants: { [key in Domain['status']]: 'default' | 'secondary' | 'destructive' } = {
    active: 'default',
    expiring_soon: 'secondary',
    expired: 'destructive',
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default function DomainsPage() {
  const [domains, setDomains] = useState(initialDomains);

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa tên miền này không?')) {
      setDomains(domains.filter(domain => domain.id !== id));
    }
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
            <CardTitle>Quản lý Tên miền</CardTitle>
            <CardDescription>Theo dõi tất cả các tên miền đã đăng ký của bạn.</CardDescription>
        </div>
        <Button onClick={() => alert('Chức năng "Thêm tên miền" đang được phát triển.')}>Thêm tên miền</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên miền</TableHead>
              <TableHead>Nhà cung cấp</TableHead>
              <TableHead>Ngày đăng ký</TableHead>
              <TableHead>Ngày hết hạn</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead><span className="sr-only">Hành động</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {domains.map((domain) => (
              <TableRow key={domain.id}>
                <TableCell className="font-medium">{domain.name}</TableCell>
                <TableCell>{domain.provider}</TableCell>
                <TableCell>{formatDate(domain.registrationDate)}</TableCell>
                <TableCell>{formatDate(domain.expiryDate)}</TableCell>
                <TableCell>
                  <Badge variant={statusVariants[domain.status]}>
                    {statusTranslations[domain.status]}
                  </Badge>
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
                      <DropdownMenuItem onClick={() => alert('Chức năng "Gia hạn" đang được phát triển.')}>Gia hạn</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert('Chức năng "Chỉnh sửa" đang được phát triển.')}>Chỉnh sửa</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(domain.id)}>Xóa</DropdownMenuItem>
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
}
