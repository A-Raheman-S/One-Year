import { useState, useEffect } from 'react';

export interface TimeDuration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownDuration {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  targetDate: Date;
}

export function useRelationshipTimer(startDateIso: string) {
  const [elapsed, setElapsed] = useState<TimeDuration>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [countdown, setCountdown] = useState<CountdownDuration>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    targetDate: new Date(),
  });

  useEffect(() => {
    const startDate = new Date(startDateIso);

    const updateTimes = () => {
      const now = new Date();

      // 1. Elapsed duration calculation
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes -= 1;
      }
      if (minutes < 0) {
        minutes += 60;
        hours -= 1;
      }
      if (hours < 0) {
        hours += 24;
        days -= 1;
      }
      if (days < 0) {
        // days in previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months -= 1;
      }
      if (months < 0) {
        months += 12;
        years -= 1;
      }

      setElapsed({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds),
      });

      // 2. Next Anniversary Countdown calculation
      const currentYear = now.getFullYear();
      let nextAnniv = new Date(
        currentYear,
        startDate.getMonth(),
        startDate.getDate(),
        startDate.getHours(),
        startDate.getMinutes(),
        startDate.getSeconds()
      );

      // If anniversary has already occurred this year, count down to next year
      if (now.getTime() >= nextAnniv.getTime()) {
        nextAnniv = new Date(
          currentYear + 1,
          startDate.getMonth(),
          startDate.getDate(),
          startDate.getHours(),
          startDate.getMinutes(),
          startDate.getSeconds()
        );
      }

      const diffMs = nextAnniv.getTime() - now.getTime();
      const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

      const countDays = Math.floor(totalSeconds / 86400);
      const countHours = Math.floor((totalSeconds % 86400) / 3600);
      const countMinutes = Math.floor((totalSeconds % 3600) / 60);
      const countSecs = totalSeconds % 60;

      setCountdown({
        days: countDays,
        hours: countHours,
        minutes: countMinutes,
        seconds: countSecs,
        targetDate: nextAnniv,
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [startDateIso]);

  return { elapsed, countdown };
}
