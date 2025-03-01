"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar estilos de Bootstrap

export default function NetworkStatus() {
    const [networkInfo, setNetworkInfo] = useState<{ type: string; downlink: number; rtt: number } | null>(null);
    const [batteryInfo, setBatteryInfo] = useState({ level: 1, charging: false });
    const [publicIP, setPublicIP] = useState("Cargando...");
    const [speedHistory, setSpeedHistory] = useState<{ time: number; speed: number }[]>([]);
    const [isClient, setIsClient] = useState(false); // Prevenir errores SSR

    useEffect(() => {
        setIsClient(true); // ⚡ Asegura que el código solo se ejecute en el cliente

        async function testDownloadSpeed() {
            try {
                const url = "https://speed.cloudflare.com/__down?bytes=10485760"; // Archivo ligero de 10MB
                const startTime = Date.now();
                const response = await fetch(url, { method: "HEAD" });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const endTime = Date.now();
                const duration = (endTime - startTime) / 1000; // Tiempo en segundos
                const fileSizeInBits = 10 * 8 * 1024 * 1024; // 10MB en bits
                const speedMbps = (fileSizeInBits / duration) / (1024 * 1024); // Conversión a Mbps

                return speedMbps.toFixed(2);
            } catch (error) {
                console.error("⚠️ Error en testDownloadSpeed:", error);
                return "Error"; // Evita bloquear la app
            }
        }

        function updateNetworkInfo() {
            if (typeof window !== "undefined" && "connection" in navigator) {
                const connection = (navigator as any).connection;
                setNetworkInfo({
                    type: connection.effectiveType || "No disponible",
                    downlink: isNaN(connection.downlink) ? 0 : parseFloat(connection.downlink.toFixed(2)),
                    rtt: isNaN(connection.rtt) ? 0 : parseFloat(connection.rtt.toFixed(2)),
                });
            }
        }

        updateNetworkInfo();
        const interval = setInterval(updateNetworkInfo, 5000); // Actualizar cada 5 segundos

        return () => clearInterval(interval);
    }, []);

    // Obtener estado de la batería
    interface BatteryManager extends EventTarget {
        level: number;
        charging: boolean;
        addEventListener: (type: "levelchange" | "chargingchange", listener: () => void) => void;
        removeEventListener: (type: "levelchange" | "chargingchange", listener: () => void) => void;
    }

    useEffect(() => {
        let battery: BatteryManager | null = null;

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

    // ⚡ Evitar renderizar en el servidor para prevenir errores de Hydration
    if (!isClient) return null;

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <h2 className="text-center fw-bold">📡 Estado de la Red</h2>
                {networkInfo ? (
                    <ul className="list-group mt-3">
                        <li className="list-group-item">
                            📶 Tipo de conexión: <strong>{networkInfo.type}</strong>
                        </li>
                        <li className="list-group-item">
                            ⬇️ Velocidad: <strong>{networkInfo.downlink} Mbps</strong>
                        </li>
                        <li className="list-group-item">
                            ⏳ Latencia: <strong>{networkInfo.rtt} ms</strong>
                        </li>
                    </ul>
                ) : (
                    <p className="text-center">🔄 Cargando datos de red...</p>
                )}
            </div>

            {/* 📊 Gráfico de la velocidad de red en tiempo real */}
            <div className="card mt-4 p-4">
                <h3 className="fw-bold">📈 Historial de Velocidad</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={speedHistory}>
                        <XAxis dataKey="time" tickFormatter={(time) => new Date(time).toLocaleTimeString()} />
                        <YAxis domain={[0, "dataMax + 1"]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="speed" stroke="#8884d8" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* 🌍 Información adicional */}
            <div className="card mt-4 p-4">
                <h3 className="fw-bold">🌍 Información Adicional</h3>
                <p>🌐 IP Pública: <strong>{publicIP}</strong></p>
                <p>
                    🔋 Batería: {Math.round(batteryInfo.level * 100)}% {batteryInfo.charging ? "⚡ Cargando" : "🔋 No cargando"}
                </p>
            </div>
        </div>
    );
}
