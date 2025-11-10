import { tasks, type Task } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const priorityIcons: { [key in Task['priority']]: React.ReactNode } = {
  high: <ArrowUp className="w-4 h-4 text-red-500" />,
  medium: <Minus className="w-4 h-4 text-yellow-500" />,
  low: <ArrowDown className="w-4 h-4 text-green-500" />,
};

const priorityTranslations: { [key in Task['priority']]: string } = {
  high: 'Cao',
  medium: 'Trung bình',
  low: 'Thấp',
};

function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="mb-4">
      <CardHeader className="p-4">
        <CardTitle className="text-base">{task.title}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Badge
          variant="outline"
          className={cn(
            'flex items-center gap-1',
            task.priority === 'high' && 'border-red-500/50 text-red-500',
            task.priority === 'medium' && 'border-yellow-500/50 text-yellow-500',
            task.priority === 'low' && 'border-green-500/50 text-green-500'
          )}
        >
          {priorityIcons[task.priority]}
          {priorityTranslations[task.priority]}
        </Badge>
        <span className="text-xs text-muted-foreground">
          Hạn: {new Date(task.dueDate).toLocaleDateString('vi-VN')}
        </span>
      </CardFooter>
    </Card>
  );
}

export default function TasksPage() {
  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="flex flex-col">
        <h2 className="mb-4 text-xl font-semibold">Cần làm ({todoTasks.length})</h2>
        <div className="p-4 rounded-lg bg-card h-full">
          {todoTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="mb-4 text-xl font-semibold">Đang làm ({inProgressTasks.length})</h2>
        <div className="p-4 rounded-lg bg-card h-full">
          {inProgressTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="mb-4 text-xl font-semibold">Đã xong ({doneTasks.length})</h2>
        <div className="p-4 rounded-lg bg-card h-full">
          {doneTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
