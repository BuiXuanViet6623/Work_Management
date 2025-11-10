'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { templates } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getTemplateSuggestion } from '@/app/actions';
import { Bot, FileCode, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <Bot />}
      Lấy gợi ý
    </Button>
  );
}

export default function TemplatesPage() {
  const initialState = { suggestion: '', error: null };
  const [state, formAction] = useFormState(getTemplateSuggestion, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: state.error,
      });
    }
  }, [state, toast]);


  return (
    <div className="grid gap-8">
      <Card className="bg-gradient-to-br from-primary/10 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            AI Gợi ý Mẫu
          </CardTitle>
          <CardDescription>
            Mô tả công việc lập trình của bạn và AI của chúng tôi sẽ đề xuất mẫu phù hợp nhất.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Textarea
              name="description"
              placeholder="ví dụ: 'Tôi cần một React hook để lấy dữ liệu từ API và xử lý các trạng thái tải/lỗi.'"
              className="min-h-[100px]"
            />
            <SubmitButton />
          </form>
          {state.suggestion && (
            <div className="p-4 mt-4 border-l-4 rounded-r-lg bg-primary/10 border-primary">
              <p className="font-semibold text-primary">Gợi ý của AI:</p>
              <p className="font-medium">{state.suggestion}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight">Thư viện Mẫu</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <FileCode className="w-5 h-5 text-muted-foreground" />
                </div>
                <Badge variant="secondary" className="w-fit">{template.category}</Badge>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </CardContent>
              <CardContent>
                <Button variant="outline" className="w-full">Xem Mẫu</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
