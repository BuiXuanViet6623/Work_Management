'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { reports } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function TasksPage() {
  const [report, setReport] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (report.trim() === '') {
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: 'Vui lòng nhập nội dung báo cáo.',
      });
      return;
    }
    console.log('End of day report submitted:', report);
    toast({
      title: 'Thành công',
      description: 'Báo cáo cuối ngày của bạn đã được gửi.',
    });
    setReport('');
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Báo cáo công việc cuối ngày</CardTitle>
          <CardDescription>
            Viết báo cáo tóm tắt về công việc bạn đã hoàn thành trong ngày.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Hôm nay tôi đã hoàn thành..."
            className="min-h-[200px]"
            value={report}
            onChange={(e) => setReport(e.target.value)}
          />
        </CardContent>
        <CardFooter>
            <Button onClick={handleSubmit}>Gửi báo cáo</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>Lịch sử báo cáo</CardTitle>
            <CardDescription>Xem lại các báo cáo đã gửi trước đây.</CardDescription>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-72">
                <div className="space-y-4">
                    {reports.map((item, index) => (
                        <div key={item.id}>
                            <div className="mb-2">
                                <p className="font-semibold">{new Date(item.date).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p className="text-sm text-muted-foreground">{item.content}</p>
                            </div>
                            {index < reports.length - 1 && <Separator />}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
