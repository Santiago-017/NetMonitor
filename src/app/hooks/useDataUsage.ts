import { useState, useEffect } from 'react';

export function useDataUsage() {
  const [dataUsage, setDataUsage] = useState(0);

  useEffect(() => {
    function calculateDataUsage() {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const totalSize = resources.reduce((acc, res) => acc + (res.transferSize || 0), 0);
      setDataUsage(totalSize / (1024 * 1024)); // Convertir a MB
    }

    const interval = setInterval(calculateDataUsage, 5000);
    return () => clearInterval(interval);
  }, []);

  return dataUsage;
}
