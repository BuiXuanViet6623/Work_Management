
'use client';

import { notes as initialNotes, type Note } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MoreVertical, PlusCircle, Search } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function NotesPage() {
  const [notes, setNotes] = useState(initialNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  const filteredNotes = useMemo(() => {
    return notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notes, searchTerm]);

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: formData.get('title') as string,
      language: formData.get('language') as Note['language'],
      content: formData.get('content') as string,
    };
    setNotes([newNote, ...notes]);
    setIsAddDialogOpen(false);
  };
  
  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingNote) return;
  
    const formData = new FormData(event.currentTarget);
    const updatedNote: Note = {
      ...editingNote,
      title: formData.get('title') as string,
      language: formData.get('language') as Note['language'],
      content: formData.get('content') as string,
    };
    
    setNotes(notes.map(n => n.id === editingNote.id ? updatedNote : n));
    setEditingNote(null);
  };

  const handleDelete = () => {
    if (!noteToDelete) return;
    setNotes(notes.filter(note => note.id !== noteToDelete.id));
    setNoteToDelete(null);
  }

  return (
    <>
    <div>
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Ghi chú Code Snippet</h1>
                <p className="text-muted-foreground">Thư viện cá nhân của bạn về các đoạn mã và ghi chú nhanh.</p>
            </div>
             <div className="flex gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Tìm kiếm ghi chú..."
                        className="pl-8 sm:w-[200px] md:w-[300px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Thêm ghi chú
                </Button>
            </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map((note) => (
            <Card key={note.id} className="relative flex flex-col">
              <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                  <CardDescription>
                  <Badge variant="outline" className="capitalize">{note.language}</Badge>
                  </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                  <pre className="p-3 h-full text-sm rounded-md bg-muted text-muted-foreground overflow-x-auto">
                  <code>{note.content}</code>
                  </pre>
              </CardContent>
              <div className="absolute top-2 right-2">
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setEditingNote(note)}>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => setNoteToDelete(note)} className="text-destructive focus:text-destructive focus:bg-destructive/10">Xóa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
              </div>
            </Card>
        ))}
        </div>
    </div>
    
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm ghi chú mới</DialogTitle>
          <DialogDescription>Tạo một code snippet hoặc ghi chú mới.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAdd}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Tiêu đề</Label>
              <Input id="title" name="title" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language" className="text-right">Ngôn ngữ</Label>
              <Select name="language" required defaultValue="text">
                  <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="css">CSS</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="bash">Bash</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                  </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">Nội dung</Label>
              <Textarea id="content" name="content" className="col-span-3 min-h-[150px]" required />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="outline">Hủy</Button></DialogClose>
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    
    <Dialog open={!!editingNote} onOpenChange={(isOpen) => !isOpen && setEditingNote(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa ghi chú</DialogTitle>
          <DialogDescription>Cập nhật code snippet hoặc ghi chú của bạn.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEdit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title-edit" className="text-right">Tiêu đề</Label>
              <Input id="title-edit" name="title" className="col-span-3" defaultValue={editingNote?.title} required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language-edit" className="text-right">Ngôn ngữ</Label>
              <Select name="language" defaultValue={editingNote?.language} required>
                  <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="css">CSS</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="bash">Bash</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                  </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content-edit" className="text-right">Nội dung</Label>
              <Textarea id="content-edit" name="content" className="col-span-3 min-h-[150px]" defaultValue={editingNote?.content} required />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="outline" onClick={() => setEditingNote(null)}>Hủy</Button></DialogClose>
            <Button type="submit">Lưu thay đổi</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    
    <AlertDialog open={!!noteToDelete} onOpenChange={(isOpen) => !isOpen && setNoteToDelete(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa không?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể được hoàn tác. Thao tác này sẽ xóa vĩnh viễn ghi chú này.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setNoteToDelete(null)}>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Xóa</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
