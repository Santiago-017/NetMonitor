"use client";

import { useState, useEffect } from 'react';

export function useBatteryStatus() {
  const [batteryInfo, setBatteryInfo] = useState({ level: 1, charging: false });

  useEffect(() => {
    async function getBatteryStatus() {
      if ('getBattery' in navigator) {
        const battery = await (navigator as any).getBattery();
        setBatteryInfo({ level: battery.level, charging: battery.charging });

        battery.addEventListener('levelchange', () => {
          setBatteryInfo({ level: battery.level, charging: battery.charging });
        });
        battery.addEventListener('chargingchange', () => {
          setBatteryInfo({ level: battery.level, charging: battery.charging });
        });
      }
    }

    getBatteryStatus();
  }, []);

  return batteryInfo;
}
