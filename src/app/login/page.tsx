
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bot, TriangleAlert } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'XuanViet23@') {
      setError('');
      sessionStorage.setItem('isAuthenticated', 'true');
      router.replace('/dashboard');
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không chính xác.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Bot className="w-12 h-12 text-primary" />
            </div>
          <CardTitle>TaskMaster Pro</CardTitle>
          <CardDescription>Đăng nhập để truy cập Bảng điều khiển</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
             {error && (
              <Alert variant="destructive" className="p-2">
                <div className="flex items-center gap-2">
                    <TriangleAlert className="h-4 w-4" />
                    <AlertDescription className="text-xs">{error}</AlertDescription>
                </div>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
          </form>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-center text-muted-foreground w-full">© 2024 TaskMaster Pro</p>
        </CardFooter>
      </Card>
    </div>
  );
}
