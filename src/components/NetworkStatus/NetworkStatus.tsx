"use client";

import { useState, useEffect } from "react";
import { Table, Card } from "react-bootstrap";

export default function NetworkStatus() {
    const [networkInfo, setNetworkInfo] = useState({
        type: "",
        downlink: 0,
        rtt: 0,
    });
    const [batteryInfo, setBatteryInfo] = useState({ level: 1, charging: false });
    const [publicIP, setPublicIP] = useState("Cargando...");
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    
        function updateNetworkInfo() {
            if (typeof window !== "undefined" && "connection" in navigator) {
                const connection = navigator.connection as any;
                setNetworkInfo({
                    type: connection.effectiveType || "No disponible",
                    downlink: isNaN(connection.downlink) ? 0 : parseFloat(connection.downlink.toFixed(2)),
                    rtt: isNaN(connection.rtt) ? 0 : parseFloat(connection.rtt.toFixed(2)),
                });
            }
        }
    
        updateNetworkInfo();
        const interval = setInterval(updateNetworkInfo, 5000);
        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        async function getBatteryStatus() {
            try {
                if ("getBattery" in navigator) {
                    const battery = await (navigator as any).getBattery();
                    setBatteryInfo({ level: battery.level, charging: battery.charging });
    
                    battery.addEventListener("levelchange", () => setBatteryInfo({
                        level: battery.level,
                        charging: battery.charging,
                    }));
                    battery.addEventListener("chargingchange", () => setBatteryInfo({
                        level: battery.level,
                        charging: battery.charging,
                    }));
                }
            } catch (error) {
                console.error("Error obteniendo estado de batería:", error);
            }
        }
        getBatteryStatus();
    }, []);
    
    useEffect(() => {
        fetch("https://api64.ipify.org?format=json")
            .then((res) => res.json())
            .then((data) => setPublicIP(data.ip))
            .catch((error) => console.error("Error obteniendo IP:", error));
    }, []);
    
    if (!isClient) return null;
    
    return (
        <div className="container mt-4">
            <Card className="p-4 shadow">
                <h2 className="text-center">📡 Estado de la Red</h2>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>📶 Tipo de conexión:</td>
                            <td><b>{networkInfo.type}</b></td>
                        </tr>
                        <tr>
                            <td>🔽 Velocidad:</td>
                            <td><b>{networkInfo.downlink} Mbps</b></td>
                        </tr>
                        <tr>
                            <td>⏳ Latencia:</td>
                            <td><b>{networkInfo.rtt} ms</b></td>
                        </tr>
                    </tbody>
                </Table>
            </Card>
    
            <Card className="p-4 mt-3 shadow">
                <h2 className="text-center">🌎 Información Adicional</h2>
                <p>🌐 IP Pública: <b>{publicIP}</b></p>
                <p>🔋 Batería: {Math.round(batteryInfo.level * 100)}% {batteryInfo.charging ? "⚡ Cargando" : "🔋 No cargando"}</p>
            </Card>
        </div>
    );
}
