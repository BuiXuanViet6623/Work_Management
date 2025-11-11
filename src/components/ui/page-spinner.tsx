
'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import './page-spinner.css';

export default function PageSpinner() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); 
    return () => clearTimeout(timer);
  }, [pathname]);

  return loading ? <div className="page-spinner"></div> : null;
}
