
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Clock } from 'lucide-react';

export default function CheckIn() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCheckedIn && checkInTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - checkInTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setElapsedTime(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn, checkInTime]);

  const handleToggleCheckIn = () => {
    if (isCheckedIn) {
      setIsCheckedIn(false);
    } else {
      setIsCheckedIn(true);
      setCheckInTime(new Date());
      setElapsedTime('00:00:00');
    }
  };
  
  const handleCheckOut = () => {
    setIsCheckedIn(false);
  };

  if (isCheckedIn) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between p-3 text-sm rounded-md bg-primary/10">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <Clock className="w-5 h-5" />
            <span>Đã Check In</span>
          </div>
          <span className="font-mono font-semibold text-primary">{elapsedTime}</span>
        </div>
        <Button onClick={handleCheckOut} variant="outline" className="w-full">
          <LogOut />
          Check Out
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleToggleCheckIn} className="w-full" variant="default">
      <LogIn />
      Check In
    </Button>
  );
}
