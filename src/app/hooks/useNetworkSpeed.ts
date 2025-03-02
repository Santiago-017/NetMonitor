"use client";

import { useState, useEffect } from "react";

export function useNetworkSpeed() {
  const [speed, setSpeed] = useState<number | null>(null);

  interface NavigatorWithConnection extends Navigator {
    connection?: {
      downlink?: number;
      addEventListener?: (event: string, callback: () => void) => void;
      removeEventListener?: (event: string, callback: () => void) => void;
    };
  }
  
  useEffect(() => {
    if ("connection" in navigator) {
      const connection = (navigator as NavigatorWithConnection).connection;
      if (!connection) return;
  
      setSpeed(connection.downlink || 0); // Mbps
  
      const updateSpeed = () => setSpeed(connection.downlink || 0);
      connection.addEventListener?.("change", updateSpeed);
  
      return () => {
        connection.removeEventListener?.("change", updateSpeed);
      };
    }
  }, []);  

  return speed;
}
