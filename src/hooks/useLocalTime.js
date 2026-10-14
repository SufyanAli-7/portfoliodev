"use client";

import { useState, useEffect } from "react";

// Fallback lookup table for common IANA timezones to clean City, Country
const TIMEZONE_MAP = {
  "America/New_York": "New York, USA",
  "America/Los_Angeles": "Los Angeles, USA",
  "America/Chicago": "Chicago, USA",
  "America/Phoenix": "Phoenix, USA",
  "America/Denver": "Denver, USA",
  "America/Toronto": "Toronto, Canada",
  "America/Vancouver": "Vancouver, Canada",
  "America/Mexico_City": "Mexico City, Mexico",
  "America/Sao_Paulo": "São Paulo, Brazil",
  "Asia/Karachi": "Faisalabad, Pakistan",
  "Asia/Dubai": "Dubai, UAE",
  "Asia/Riyadh": "Riyadh, Saudi Arabia",
  "Asia/Tokyo": "Tokyo, Japan",
  "Asia/Singapore": "Singapore, Singapore",
  "Asia/Hong_Kong": "Hong Kong, China",
  "Asia/Shanghai": "Shanghai, China",
  "Asia/Kolkata": "New Delhi, India",
  "Asia/Dhaka": "Dhaka, Bangladesh",
  "Asia/Kuala_Lumpur": "Kuala Lumpur, Malaysia",
  "Asia/Bangkok": "Bangkok, Thailand",
  "Europe/London": "London, UK",
  "Europe/Berlin": "Berlin, Germany",
  "Europe/Paris": "Paris, France",
  "Europe/Madrid": "Madrid, Spain",
  "Europe/Rome": "Rome, Italy",
  "Europe/Amsterdam": "Amsterdam, Netherlands",
  "Europe/Zurich": "Zurich, Switzerland",
  "Australia/Sydney": "Sydney, Australia",
  "Australia/Melbourne": "Melbourne, Australia",
};

function parseFallbackLocation(timeZone) {
  if (TIMEZONE_MAP[timeZone]) {
    return TIMEZONE_MAP[timeZone];
  }

  // Derive city from IANA format e.g. "Region/City_Name"
  if (timeZone && timeZone.includes("/")) {
    const parts = timeZone.split("/");
    const city = parts[parts.length - 1].replace(/_/g, " ");
    const region = parts[0];
    return `${city}, ${region}`;
  }

  return "Faisalabad, Pakistan";
}

function getFormattedTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // 12-hour clock
  const formattedHours = String(hours).padStart(2, "0");

  return {
    time: `${formattedHours}:${minutes}`,
    period,
  };
}

export function useLocalTime() {
  const [clock, setClock] = useState({
    time: "12:00",
    period: "PM",
    location: "Faisalabad, Pakistan",
  });

  useEffect(() => {
    // 1. Initial immediate time and IANA timezone resolution
    let detectedTimezone = "";
    try {
      detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch {
      detectedTimezone = "Asia/Karachi";
    }

    const initialLocation = parseFallbackLocation(detectedTimezone);
    const initialTime = getFormattedTime();

    setClock({
      time: initialTime.time,
      period: initialTime.period,
      location: initialLocation,
    });

    // 2. Fetch user's exact city and country via fast IP geolocation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    fetch("https://ipwho.is/", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        clearTimeout(timeoutId);
        if (data && data.success !== false && data.city && data.country) {
          // Clean city name (e.g. remove administrative terms like "Sadar Tehsil")
          const cleanCity = data.city.replace(/\s+(Sadar\s+)?Tehsil$/i, "").trim();
          const country =
            data.country === "United States"
              ? "USA"
              : data.country === "United Kingdom"
              ? "UK"
              : data.country;

          setClock((prev) => ({
            ...prev,
            location: `${cleanCity}, ${country}`,
          }));
        }
      })
      .catch(() => {
        // Fallback already set cleanly from IANA timezone
      });

    // 3. Keep 12-hour clock updated every second
    const interval = setInterval(() => {
      const updated = getFormattedTime();
      setClock((prev) => ({
        ...prev,
        time: updated.time,
        period: updated.period,
      }));
    }, 1000);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, []);

  return clock;
}
