import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface CountdownTimerProps {
  targetDate?: string;
  deadlineLabel?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate = '2026-08-30T23:59:59Z',
  deadlineLabel = 'Submission (Hard) Deadline: 30th August 2026'
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPast: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-gradient-to-r from-[#0F2942] to-[#00629B] rounded-xl p-4 sm:p-5 text-white shadow-md border border-slate-700/60">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="p-2.5 bg-white/10 rounded-lg text-emerald-400">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold block">
              Time Remaining Until Next Deadline
            </span>
            <h4 className="text-sm sm:text-base font-semibold text-white">
              {deadlineLabel}
            </h4>
          </div>
        </div>

        {timeLeft.isPast ? (
          <div className="flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-lg border border-amber-500/30 text-xs font-semibold">
            <AlertCircle className="w-4 h-4" />
            <span>Deadline Passed or In Review</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3 text-center font-mono">
            <div className="bg-black/30 backdrop-blur-xs px-3 py-2 rounded-lg border border-white/10 min-w-[55px]">
              <span className="text-xl sm:text-2xl font-black text-white">{timeLeft.days}</span>
              <span className="block text-[10px] text-slate-300 font-sans uppercase font-medium">Days</span>
            </div>
            <span className="text-xl font-bold text-slate-400">:</span>
            <div className="bg-black/30 backdrop-blur-xs px-3 py-2 rounded-lg border border-white/10 min-w-[55px]">
              <span className="text-xl sm:text-2xl font-black text-white">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="block text-[10px] text-slate-300 font-sans uppercase font-medium">Hours</span>
            </div>
            <span className="text-xl font-bold text-slate-400">:</span>
            <div className="bg-black/30 backdrop-blur-xs px-3 py-2 rounded-lg border border-white/10 min-w-[55px]">
              <span className="text-xl sm:text-2xl font-black text-white">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="block text-[10px] text-slate-300 font-sans uppercase font-medium">Mins</span>
            </div>
            <span className="text-xl font-bold text-slate-400">:</span>
            <div className="bg-black/30 backdrop-blur-xs px-3 py-2 rounded-lg border border-white/10 min-w-[55px]">
              <span className="text-xl sm:text-2xl font-black text-emerald-400">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="block text-[10px] text-slate-300 font-sans uppercase font-medium">Secs</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
