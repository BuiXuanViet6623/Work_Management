
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { reports as initialReports, type Report } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function TasksPage() {
  const [reportContent, setReportContent] = useState('');
  const [reports, setReports] = useState(initialReports);
  const [reportToDelete, setReportToDelete] = useState<Report | null>(null);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (reportContent.trim() === '') {
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: 'Vui lòng nhập nội dung báo cáo.',
      });
      return;
    }
    
    const newReport: Report = {
      id: `report-${Date.now()}`,
      date: new Date().toISOString(),
      content: reportContent,
    };

    setReports([newReport, ...reports]);
    setReportContent('');

    toast({
      title: 'Thành công',
      description: 'Báo cáo cuối ngày của bạn đã được gửi.',
    });
  };

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingReport) return;
    
    const formData = new FormData(event.currentTarget);
    const content = formData.get('content') as string;

    if (content.trim() === '') {
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: 'Nội dung báo cáo không được để trống.',
      });
      return;
    }

    const updatedReport: Report = {
      ...editingReport,
      content: content,
    };
    
    setReports(reports.map(r => r.id === editingReport.id ? updatedReport : r));
    setEditingReport(null);
     toast({
      title: 'Thành công',
      description: 'Báo cáo đã được cập nhật.',
    });
  };

  const handleDelete = () => {
    if (!reportToDelete) return;
    setReports(reports.filter(r => r.id !== reportToDelete.id));
    setReportToDelete(null);
  }

  return (
    <>
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
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
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
                            <div className="mb-2 relative">
                                <p className="font-semibold pr-8">{new Date(item.date).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{item.content}</p>
                                <div className="absolute top-0 right-0">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreVertical className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                                          <DropdownMenuItem onClick={() => setEditingReport(item)}>Chỉnh sửa</DropdownMenuItem>
                                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => setReportToDelete(item)} className="text-destructive hover:text-destructive">Xóa</DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                </div>
                            </div>
                            {index < reports.length - 1 && <Separator />}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </CardContent>
      </Card>
    </div>

    <Dialog open={!!editingReport} onOpenChange={(isOpen) => !isOpen && setEditingReport(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa báo cáo</DialogTitle>
            <DialogDescription>
              Cập nhật nội dung báo cáo cho ngày {editingReport ? new Date(editingReport.date).toLocaleDateString('vi-VN') : ''}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit}>
            <div className="grid gap-4 py-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="content-edit">Nội dung</Label>
                <Textarea 
                  id="content-edit"
                  name="content"
                  className="min-h-[200px]"
                  defaultValue={editingReport?.content}
                  required
                />
              </div>
            </div>
            <DialogFooter>
                <DialogClose asChild><Button type="button" variant="outline" onClick={() => setEditingReport(null)}>Hủy</Button></DialogClose>
                <Button type="submit">Lưu thay đổi</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    
    <AlertDialog open={!!reportToDelete} onOpenChange={(isOpen) => !isOpen && setReportToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa không?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể được hoàn tác. Thao tác này sẽ xóa vĩnh viễn báo cáo này.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setReportToDelete(null)}>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}