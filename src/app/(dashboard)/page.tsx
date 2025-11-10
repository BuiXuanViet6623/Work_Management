import { servers, tasks, type Task } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, Server, AlertTriangle, CircleCheckBig } from 'lucide-react';
import OverviewCharts from '@/components/dashboard/overview-charts';

const priorityTranslations: { [key in Task['priority']]: string } = {
  high: 'Cao',
  medium: 'Trung bình',
  low: 'Thấp',
};

export default function DashboardPage() {
  const onlineServers = servers.filter(s => s.status === 'online').length;
  const tasksDone = tasks.filter(t => t.status === 'done').length;
  const tasksInProgress = tasks.filter(t => t.status === 'in-progress').length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'done').length;

  const upcomingTasks = tasks
    .filter(t => t.status !== 'done')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  return (
    <div className="grid gap-6 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Máy chủ trực tuyến</CardTitle>
            <Server className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onlineServers} / {servers.length}</div>
            <p className="text-xs text-muted-foreground">
              {servers.length - onlineServers} máy chủ có sự cố
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Nhiệm vụ đã hoàn thành</CardTitle>
            <CircleCheckBig className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{tasksDone}</div>
            <p className="text-xs text-muted-foreground">
              {tasksInProgress} nhiệm vụ đang thực hiện
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Nhiệm vụ ưu tiên cao</CardTitle>
            <AlertTriangle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highPriorityTasks}</div>
            <p className="text-xs text-muted-foreground">
              Cần chú ý ngay
            </p>
          </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Năng suất</CardTitle>
            <ArrowUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">
              So với tuần trước
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Nhiệm vụ sắp tới</CardTitle>
            <CardDescription>
              Các nhiệm vụ cấp bách nhất của bạn trong những ngày tới.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="space-y-4">
              {upcomingTasks.map(task => (
                 <div key={task.id} className="flex items-start justify-between gap-4 p-2 rounded-lg hover:bg-muted">
                    <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">
                        Hạn: {new Date(task.dueDate).toLocaleDateString('vi-VN', { month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'} className="shrink-0">
                        {priorityTranslations[task.priority]}
                    </Badge>
                 </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Tổng quan hệ thống</CardTitle>
            <CardDescription>Tóm tắt sử dụng tài nguyên theo thời gian thực.</CardDescription>
          </CardHeader>
          <CardContent>
            <OverviewCharts />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}