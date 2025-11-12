
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { servers as initialServers } from '@/lib/data';
import { domains as initialDomains } from '@/lib/data';
import type { Server, Domain } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Loader2, ServerIcon, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type OfflineItem = (Server | Domain) & { itemType: 'server' | 'domain' };

export default function SystemCheckPage() {
  const [offlineItems, setOfflineItems] = useState<OfflineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const checkStatus = async () => {
    setIsLoading(true);
    setOfflineItems([]);

    const inactiveDomains = initialDomains
      .filter((domain) => domain.status === 'inactive')
      .map((d) => ({ ...d, itemType: 'domain' as const }));

    const offlineServers = initialServers
      .filter((server) => server.status === 'offline')
      .map((s) => ({ ...s, itemType: 'server' as const }));

    setOfflineItems([...inactiveDomains, ...offlineServers]);
    setIsLoading(false);
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Kiểm tra hệ thống</h1>
        <p className="text-muted-foreground">
          Báo cáo tự động về trạng thái của máy chủ và tên miền của bạn.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Kết quả kiểm tra</CardTitle>
              <CardDescription>
                Các mục sau đây được báo cáo là không hoạt động hoặc ngoại tuyến.
              </CardDescription>
            </div>
            <Button onClick={checkStatus} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              {isLoading ? 'Đang kiểm tra...' : 'Kiểm tra lại'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {offlineItems.length === 0 ? (
                <Alert variant="default" className="border-green-500">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <AlertTitle className="text-green-700">Hệ thống ổn định!</AlertTitle>
                  <AlertDescription>
                    Tất cả máy chủ và tên miền đều đang hoạt động bình thường.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {offlineItems.map((item) => (
                    <Alert key={item.id} variant="destructive">
                      <AlertCircle className="w-4 h-4" />
                       <div className="flex items-center justify-between w-full">
                        <div>
                           <AlertTitle className="flex items-center gap-2">
                             {item.itemType === 'server' ? <ServerIcon className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                             {item.itemType === 'server' ? 'Máy chủ ngoại tuyến:' : 'Tên miền không hoạt động:'} {(item as Server).name || (item as Domain).name}
                           </AlertTitle>
                           <AlertDescription>
                             Vui lòng kiểm tra lại cấu hình và trạng thái của mục này.
                           </AlertDescription>
                        </div>
                        <Button asChild variant="secondary" size="sm">
                            <Link href={item.itemType === 'server' ? '/dashboard/servers' : '/dashboard/domains'}>
                                Xem chi tiết
                            </Link>
                        </Button>
                       </div>
                    </Alert>
                  ))}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
