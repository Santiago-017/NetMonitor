"use client";

import { useState, useEffect } from 'react';

export function useNetworkInfo() {
  const [networkInfo, setNetworkInfo] = useState({
    type: 'unknown',
    downlink: 0,
    rtt: 0,
  });

  interface NavigatorWithConnection extends Navigator {
    connection?: {
      effectiveType?: string;
      downlink?: number;
      rtt?: number;
    };
  }
  
  useEffect(() => {
    function updateNetworkInfo() {
      if ("connection" in navigator) {
        const connection = (navigator as NavigatorWithConnection).connection;
  
        setNetworkInfo({
          type: connection?.effectiveType || "unknown",
          downlink: connection?.downlink || 0,
          rtt: connection?.rtt || 0,
        });
      }
    }
  
    updateNetworkInfo();
  }, []);
  

  return networkInfo;
}
