"use client";

import { useState, useEffect } from "react";

export function usePing(url: string) {
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    const pingTest = async () => {
      try {
        const start = performance.now();
        await fetch(url, { method: "HEAD", mode: "no-cors" });
        const end = performance.now();
        setLatency(end - start);
      } catch (error) {
        console.error("Error en el ping:", error);
        setLatency(null);
      }
    };

    pingTest();
    const interval = setInterval(pingTest, 5000); // Repite cada 5 segundos

    return () => clearInterval(interval);
  }, [url]);

  return latency;
}
