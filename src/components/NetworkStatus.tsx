"use client";

import { useState, useEffect } from "react";

export default function NetworkStatus() {
  const [networkInfo, setNetworkInfo] = useState({
    type: "Desconocido",
    downlink: 0,
    rtt: 0,
  });

  useEffect(() => {
    function updateNetworkInfo() {
        if ("connection" in navigator) {
          const connection = (navigator as any).connection;
      
          setNetworkInfo({
            type: connection.effectiveType || "No disponible",
            downlink: parseFloat(connection.downlink.toFixed(2)) || 0, // 🔍 Redondeo a 2 decimales
            rtt: parseFloat(connection.rtt.toFixed(2)) || 0, // 🔍 Redondeo a 2 decimales
          });
        }
      }
      

    // Actualizar cada segundo
    const interval = setInterval(updateNetworkInfo, 1000);

    // Ejecutar la primera actualización inmediatamente
    updateNetworkInfo();

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-center">
      <h2 className="text-xl font-bold">📡 Estado de la Red</h2>
      <ul className="mt-2">
        <li>📶 Tipo de conexión: <b>{networkInfo.type}</b></li>
        <li>⬇️ Velocidad: <b>{networkInfo.downlink} Mbps</b></li>
        <li>⏳ Latencia: <b>{networkInfo.rtt} ms</b></li>
      </ul>
    </div>
  );
}
