"use client";

import { useState, useEffect } from "react";

export function useDataUsage() {
  const [dataUsage, setDataUsage] = useState(0);

  useEffect(() => {
    const updateDataUsage = () => {
      const resources = performance.getEntriesByType("resource");
      const totalBytes = resources.reduce((sum, resource) => sum + ((resource as PerformanceResourceTiming).transferSize || 0), 0);
      setDataUsage(totalBytes / (1024 * 1024)); // Convertir a MB
    };

    const interval = setInterval(updateDataUsage, 5000); // Actualizar cada 5s
    return () => clearInterval(interval);
  }, []);

  return dataUsage;
}
