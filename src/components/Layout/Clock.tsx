
import { useState, useEffect } from 'react';
import { Clock as ClockIcon, Calendar } from 'lucide-react';

export function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex items-center space-x-4 text-sm">
      <div className="flex items-center space-x-2">
        <ClockIcon className="h-4 w-4" />
        <span className="font-mono">{formatTime(currentTime)}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4" />
        <span className="capitalize">{formatDate(currentTime)}</span>
      </div>
    </div>
  );
}
