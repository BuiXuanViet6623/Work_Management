import { notes } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function NotesPage() {
  return (
    <div>
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Ghi chú Code Snippet</h1>
                <p className="text-muted-foreground">Thư viện cá nhân của bạn về các đoạn mã và ghi chú nhanh.</p>
            </div>
            <Button>Thêm ghi chú mới</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
            <Card key={note.id}>
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <CardDescription>
                <Badge variant="outline" className="capitalize">{note.language}</Badge>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <pre className="p-3 text-sm rounded-md bg-muted text-muted-foreground overflow-x-auto">
                <code>{note.content}</code>
                </pre>
            </CardContent>
            </Card>
        ))}
        </div>
    </div>
  );
}
