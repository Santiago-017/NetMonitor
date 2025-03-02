"use client";

import { useState, useEffect } from 'react';

export function useBatteryStatus() {
  const [batteryInfo, setBatteryInfo] = useState({ level: 1, charging: false });

  interface BatteryManager {
    level: number;
    charging: boolean;
    addEventListener: (type: "levelchange" | "chargingchange", listener: () => void) => void;
  }

  interface NavigatorWithBattery extends Navigator {
    getBattery: () => Promise<BatteryManager>;
  }
  
  useEffect(() => {
    async function getBatteryStatus() {
      if ("getBattery" in navigator) {
        const battery = await (navigator as NavigatorWithBattery).getBattery();
        setBatteryInfo({ level: battery.level, charging: battery.charging });
  
        battery.addEventListener("levelchange", () => {
          setBatteryInfo({ level: battery.level, charging: battery.charging });
        });
  
        battery.addEventListener("chargingchange", () => {
          setBatteryInfo({ level: battery.level, charging: battery.charging });
        });
      }
    }
  
    getBatteryStatus();
  }, []);
  

  return batteryInfo;
}
