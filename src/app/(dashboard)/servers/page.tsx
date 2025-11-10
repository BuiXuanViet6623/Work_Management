import { servers, type Server } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';

const statusTranslations: { [key in Server['status']]: string } = {
  online: 'trực tuyến',
  warning: 'cảnh báo',
  offline: 'ngoại tuyến',
};

export default function ServersPage() {
  const getStatusBadgeVariant = (status: 'online' | 'warning' | 'offline'): 'default' | 'destructive' | 'secondary' => {
    switch (status) {
      case 'online':
        return 'default';
      case 'warning':
        return 'secondary';
      case 'offline':
        return 'destructive';
    }
  };

  const getStatusColor = (status: 'online' | 'warning' | 'offline') => {
    switch (status) {
        case 'online': return 'text-green-500';
        case 'warning': return 'text-yellow-500';
        case 'offline': return 'text-red-500';
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trạng thái máy chủ</CardTitle>
        <CardDescription>Theo dõi trạng thái máy chủ, sử dụng tài nguyên và các chỉ số hiệu suất.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Trạng thái</TableHead>
              <TableHead>Tên máy chủ</TableHead>
              <TableHead>Sử dụng CPU</TableHead>
              <TableHead>Sử dụng RAM</TableHead>
              <TableHead>Lưu trữ</TableHead>
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
                  <div className="flex items-center gap-2">
                    <Progress value={server.cpuUsage} className="h-2 w-24" />
                    <span>{server.cpuUsage}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={server.ramUsage} className="h-2 w-24" />
                    <span>{server.ramUsage}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={server.storageUsage} className="h-2 w-24" />
                    <span>{server.storageUsage}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
