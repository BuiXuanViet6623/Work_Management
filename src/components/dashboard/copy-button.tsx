'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type CopyButtonProps = {
  textToCopy: string;
  className?: string;
};

export default function CopyButton({ textToCopy, className }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setHasCopied(true);
        toast({ title: 'Đã sao chép!' });
        setTimeout(() => {
          setHasCopied(false);
        }, 2000);
      },
      (err) => {
        toast({
            variant: 'destructive',
            title: 'Lỗi',
            description: 'Không thể sao chép vào clipboard.',
        });
        console.error('Could not copy text: ', err);
      }
    );
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={copyToClipboard}
      className={className}
    >
      {hasCopied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      <span className="sr-only">Sao chép</span>
    </Button>
  );
}
