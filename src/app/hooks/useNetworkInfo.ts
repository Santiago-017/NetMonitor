"use client";

import { useState, useEffect } from 'react';

export function useNetworkInfo() {
  const [networkInfo, setNetworkInfo] = useState({
    type: 'unknown',
    downlink: 0,
    rtt: 0,
  });

  useEffect(() => {
    function updateNetworkInfo() {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        setNetworkInfo({
          type: connection.effectiveType || 'unknown',
          downlink: connection.downlink || 0,
          rtt: connection.rtt || 0,
        });
      }
    }

    updateNetworkInfo();
    const interval = setInterval(updateNetworkInfo, 5000);
    return () => clearInterval(interval);
  }, []);

  return networkInfo;
}
