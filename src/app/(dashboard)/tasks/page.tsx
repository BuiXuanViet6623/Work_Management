
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { reports as initialReports, type Report } from '@/lib/data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { add, format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, sub, isToday } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
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

export default function TasksPage() {
  const [reports, setReports] = useState(initialReports);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(format(new Date(), 'MMM-yyyy'));
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [reportToDelete, setReportToDelete] = useState<Report | null>(null);
  const { toast } = useToast();
  
  const firstDayCurrentMonth = useMemo(() => {
    const [month, year] = currentMonth.split('-');
    return startOfMonth(new Date(`${month} 1, ${year}`));
  }, [currentMonth]);

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    });
  }, [firstDayCurrentMonth]);

  const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ];

  const previousMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  };

  const selectedDayReport = useMemo(() => {
    return reports.find((report) => isSameDay(new Date(report.date), selectedDay));
  }, [reports, selectedDay]);

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

    const updatedReport: Report = { ...editingReport, content: content };
    
    setReports(reports.map(r => r.id === editingReport.id ? updatedReport : r));
    setEditingReport(null);
    toast({
      title: 'Thành công',
      description: 'Báo cáo đã được cập nhật.',
    });
  };

  const handleSubmitReport = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

    const existingReport = reports.find(r => isSameDay(new Date(r.date), selectedDay));

    if (existingReport) {
       const updatedReport: Report = { ...existingReport, content: content };
       setReports(reports.map(r => r.id === existingReport.id ? updatedReport : r));
        toast({
          title: 'Thành công',
          description: 'Báo cáo đã được cập nhật.',
       });
    } else {
      const newReport: Report = {
        id: `report-${Date.now()}`,
        date: selectedDay.toISOString(),
        content,
      };
      setReports([newReport, ...reports]);
       toast({
        title: 'Thành công',
        description: 'Báo cáo đã được gửi.',
      });
    }
  };
  
  const handleDelete = () => {
    if (!reportToDelete) return;
    setReports(reports.filter(r => r.id !== reportToDelete.id));
    setReportToDelete(null);
    toast({
      title: 'Đã xóa',
      description: 'Báo cáo đã được xóa thành công.',
    });
  }


  return (
    <>
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={previousMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-lg font-semibold text-center capitalize min-w-[150px]">
                  {format(firstDayCurrentMonth, 'MMMM yyyy', { locale: vi })}
                </h2>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Button onClick={() => { setSelectedDay(new Date()); setCurrentMonth(format(new Date(), 'MMM-yyyy')); }}>Hôm nay</Button>
            </div>
             <div className="grid grid-cols-7 mt-4 text-xs font-medium text-center text-muted-foreground">
                <div>CN</div>
                <div>T2</div>
                <div>T3</div>
                <div>T4</div>
                <div>T5</div>
                <div>T6</div>
                <div>T7</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-px">
              {days.map((day, dayIdx) => {
                const reportExists = reports.some(report => isSameDay(new Date(report.date), day));
                return (
                  <div
                    key={day.toString()}
                    className={cn(
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      'relative py-2 px-1'
                    )}
                  >
                    <button
                      onClick={() => setSelectedDay(day)}
                      className={cn(
                        'mx-auto flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                        isSameDay(day, selectedDay) && 'bg-primary text-primary-foreground',
                        !isSameDay(day, selectedDay) && isToday(day) && 'bg-accent text-accent-foreground',
                        !isSameDay(day, selectedDay) && !isToday(day) && 'hover:bg-accent'
                      )}
                    >
                      <time dateTime={format(day, 'yyyy-MM-dd')}>
                        {format(day, 'd')}
                      </time>
                    </button>
                     {reportExists && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                     )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Báo cáo ngày {format(selectedDay, 'dd/MM/yyyy')}</CardTitle>
            <CardDescription>
              {selectedDayReport ? 'Xem hoặc cập nhật báo cáo của bạn.' : 'Thêm báo cáo mới cho ngày đã chọn.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDayReport ? (
              <div className="space-y-4">
                <div className="p-3 text-sm whitespace-pre-wrap border rounded-md bg-muted min-h-48">{selectedDayReport.content}</div>
                <div className="flex gap-2">
                  <Button variant="outline" className="w-full" onClick={() => setEditingReport(selectedDayReport)}>
                    <Edit2 className="w-4 h-4 mr-2" /> Chỉnh sửa
                  </Button>
                  <Button variant="destructive" className="w-full" onClick={() => setReportToDelete(selectedDayReport)}>
                    <Trash2 className="w-4 h-4 mr-2" /> Xóa
                  </Button>
                </div>
              </div>
            ) : (
               <form onSubmit={handleSubmitReport} className="space-y-4">
                <Textarea
                  name="content"
                  placeholder="Hôm nay tôi đã hoàn thành..."
                  className="min-h-[200px]"
                />
                <Button type="submit" className="w-full">Gửi báo cáo</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

       <Dialog open={!!editingReport} onOpenChange={(isOpen) => !isOpen && setEditingReport(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa báo cáo</DialogTitle>
            <DialogDescription>
              Cập nhật nội dung báo cáo cho ngày {editingReport ? format(new Date(editingReport.date), 'dd/MM/yyyy', {locale: vi}) : ''}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
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
