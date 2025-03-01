"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function NetworkStatus() {
  const [networkInfo, setNetworkInfo] = useState<{
    type: string;
    downlink: number;
    rtt: number;
  } | null>(null);
  const [batteryInfo, setBatteryInfo] = useState({ level: 1, charging: false });
  const [publicIP, setPublicIP] = useState("Cargando...");
  const [speedHistory, setSpeedHistory] = useState<{ time: number; speed: number }[]>([]);
  const [isClient, setIsClient] = useState(false); // Previene errores de SSR

  useEffect(() => {
    setIsClient(true); // ⚡ Asegura que el código solo se ejecute en el cliente

    async function testDownloadSpeed() {
      const startTime = Date.now();
      await fetch("https://speed.hetzner.de/100MB.bin", { method: "HEAD" }); // Descarga de prueba
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000; // Tiempo en segundos
      const fileSizeInBits = 100 * 8 * 1024 * 1024; // 100MB en bits
      return (fileSizeInBits / duration / (1024 * 1024)).toFixed(2); // Velocidad en Mbps
    }

    async function updateNetworkInfo() {
      if (typeof window !== "undefined" && "connection" in navigator) {
        const connection = (navigator as any).connection;
        const speedTest = await testDownloadSpeed();

        setNetworkInfo({
          type: connection.effectiveType || "No disponible",
          downlink: parseFloat(speedTest),
          rtt: parseFloat(connection.rtt.toFixed(2)) || 0,
        });

        // Agregar datos al historial para el gráfico
        setSpeedHistory((prev) => [...prev.slice(-10), { time: Date.now(), speed: parseFloat(speedTest) }]);
      }
    }

    updateNetworkInfo();
    const interval = setInterval(updateNetworkInfo, 5000); // Actualizar cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  // Obtener estado de la 
  
  interface BatteryManager extends EventTarget {
    level: number;
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    addEventListener: (type: "levelchange" | "chargingchange", listener: () => void) => void;
    removeEventListener: (type: "levelchange" | "chargingchange", listener: () => void) => void;
  }
  
  useEffect(() => {
    let battery: BatteryManager | null = null; // Definimos la variable para limpiar event listeners
  
    async function getBatteryStatus() {
      try {
        if ("getBattery" in navigator) {
          battery = await (navigator as any).getBattery(); // 🔥 TypeScript necesita 'as any' aquí
  
          if (battery) {
            setBatteryInfo({ level: battery.level, charging: battery.charging });
          }
  
          // Agregar event listeners
          const updateBattery = () => setBatteryInfo({ level: battery!.level, charging: battery!.charging });
          if (battery) {
            battery.addEventListener("levelchange", updateBattery);
            battery.addEventListener("chargingchange", updateBattery);
          }
        }
      } catch (error) {
        console.error("No se pudo obtener el estado de la batería:", error);
      }
    }
  
    getBatteryStatus();
  
    // Limpiar event listeners cuando el componente se desmonte
    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", () => {});
        battery.removeEventListener("chargingchange", () => {});
      }
    };
  }, []);
  

  // Obtener la IP pública del usuario
  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setPublicIP(data.ip));
  }, []);

  // ⚠️ Evitar renderizar en el servidor para prevenir errores de Hydration
  if (!isClient) return null;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-center">
      <h2 className="text-xl font-bold">📡 Estado de la Red</h2>
      {networkInfo ? (
        <ul className="mt-2">
          <li>📶 Tipo de conexión: <b>{networkInfo.type}</b></li>
          <li>⬇️ Velocidad: <b>{networkInfo.downlink} Mbps</b></li>
          <li>⏳ Latencia: <b>{networkInfo.rtt} ms</b></li>
        </ul>
      ) : (
        <p>Cargando datos de red...</p>
      )}

      {/* 📊 Gráfico de la velocidad de red en tiempo real */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">📈 Historial de Velocidad</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={speedHistory}>
            <XAxis dataKey="time" tickFormatter={(time) => new Date(time).toLocaleTimeString()} />
            <YAxis domain={[0, "dataMax + 5"]} />
            <Tooltip />
            <Line type="monotone" dataKey="speed" stroke="#8884d8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🌍 Información adicional */}
      <div className="mt-4 p-4 bg-gray-200 rounded-md">
        <h3 className="text-lg font-bold">🌍 Información Adicional</h3>
        <p>📡 IP Pública: {publicIP}</p>
        <p>🔋 Batería: {Math.round(batteryInfo.level * 100)}% {batteryInfo.charging ? "⚡ Cargando" : "🔋 No cargando"}</p>
      </div>
    </div>
  );
}
