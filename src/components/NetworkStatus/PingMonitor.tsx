"use client";

import React from "react";
import { Card } from "react-bootstrap";
import { usePing } from "@/app/hooks/usePing";

const PingMonitor: React.FC = () => {
  const ping = usePing("https://www.google.com");

  return (
    <Card className="m-4 p-3 shadow">
      <Card.Body>
        <Card.Title>📡 Ping del Servidor</Card.Title>
        <p>Latencia: <b>{ping ? `${ping.toFixed(2)} ms` : "Desconocido"}</b></p>
      </Card.Body>
    </Card>
  );
};

export default PingMonitor;
