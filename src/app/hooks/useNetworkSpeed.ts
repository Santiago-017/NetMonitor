"use client";

import { useState, useEffect } from "react";

export function useNetworkSpeed() {
  const [speed, setSpeed] = useState<number | null>(null);

  useEffect(() => {
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      setSpeed(connection.downlink); // Mbps

      const updateSpeed = () => setSpeed(connection.downlink);
      connection.addEventListener("change", updateSpeed);

      return () => connection.removeEventListener("change", updateSpeed);
    }
  }, []);

  return speed;
}
