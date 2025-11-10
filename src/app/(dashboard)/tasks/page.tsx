'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
    <Card>
      <CardHeader>
        <CardTitle>Báo cáo công việc cuối ngày</CardTitle>
        <CardDescription>
          Viết báo cáo tóm tắt về công việc bạn đã hoàn thành trong ngày.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Hôm nay tôi đã hoàn thành..."
          className="min-h-[200px]"
          value={report}
          onChange={(e) => setReport(e.target.value)}
        />
        <Button onClick={handleSubmit}>Gửi báo cáo</Button>
      </CardContent>
    </Card>
  );
}
