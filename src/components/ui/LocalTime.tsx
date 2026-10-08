"use client";

import { useEffect, useState } from "react";

/** Live clock in Pune (IST). Renders nothing until mounted to avoid hydration mismatch. */
export default function LocalTime({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const time = now
    ? now.toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "--:--:--";

  return (
    <span className={`tabular-nums ${className}`} suppressHydrationWarning>
      Pune {time} IST
    </span>
  );
}
