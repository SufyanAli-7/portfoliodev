"use client";

import { useState, useEffect } from "react";

export function useLocalTime(timeZone = "Europe/Madrid", fallback = "12:38") {
  const [time, setTime] = useState(fallback);

  useEffect(() => {
    function updateClock() {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone,
          hour12: false,
        }).format(now);
        setTime(formatted);
      } catch (err) {
        // Fallback gracefully if timezone is unsupported
        const fallbackDate = new Date();
        const hours = String(fallbackDate.getHours()).padStart(2, "0");
        const minutes = String(fallbackDate.getMinutes()).padStart(2, "0");
        setTime(`${hours}:${minutes}`);
      }
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return time;
}
