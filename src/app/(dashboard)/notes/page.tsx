
'use client';

import { notes as initialNotes } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MoreVertical, PlusCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function NotesPage() {
  const [notes, setNotes] = useState(initialNotes);

  const handleDelete = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  }

  return (
    <div>
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Ghi chú Code Snippet</h1>
                <p className="text-muted-foreground">Thư viện cá nhân của bạn về các đoạn mã và ghi chú nhanh.</p>
            </div>
            <Button onClick={() => alert('Chức năng "Thêm ghi chú mới" đang được phát triển.')}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Thêm ghi chú mới
            </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
            <Card key={note.id} className="relative">
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
            <div className="absolute top-4 right-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => alert('Chức năng "Chỉnh sửa" đang được phát triển.')}>Chỉnh sửa</DropdownMenuItem>
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500">Xóa</DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Bạn có chắc chắn muốn xóa không?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Hành động này không thể được hoàn tác. Thao tác này sẽ xóa vĩnh viễn ghi chú này.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(note.id)}>Xóa</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
            </div>
            </Card>
        ))}
        </div>
    </div>
  );
}
