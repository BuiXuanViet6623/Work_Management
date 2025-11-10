'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { taskCompletionData, serverLoadData } from '@/lib/data';

const taskChartConfig = {
  completed: {
    label: 'Nhiệm vụ đã hoàn thành',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const serverChartConfig = {
    cpu: { label: 'CPU', color: 'hsl(var(--chart-1))' },
    ram: { label: 'RAM', color: 'hsl(var(--chart-2))' },
    storage: { label: 'Storage', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig

const dayTranslations: { [key: string]: string } = {
  'Mon': 'T2',
  'Tue': 'T3',
  'Wed': 'T4',
  'Thu': 'T5',
  'Fri': 'T6',
  'Sat': 'T7',
  'Sun': 'CN',
};

export default function OverviewCharts() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Hoàn thành nhiệm vụ hàng tuần</h3>
        <ChartContainer config={taskChartConfig} className="h-40 w-full">
          <BarChart accessibilityLayer data={taskCompletionData} margin={{ top: 0, right: 0, left: -20, bottom: -10 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => dayTranslations[value] ?? value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>

       <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Tải máy chủ trung bình</h3>
         <ChartContainer config={serverChartConfig} className="h-40 w-full">
            <BarChart accessibilityLayer data={serverLoadData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: -10 }}>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" hide />
                <ChartTooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent indicator="line" />} />
                <Bar dataKey="usage" radius={5} />
            </BarChart>
        </ChartContainer>
       </div>
    </div>
  );
}
