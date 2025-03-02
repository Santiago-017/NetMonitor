"use client";

import React from "react";
import { Card } from "react-bootstrap";
import { useNetworkSpeed } from "@/app/hooks/useNetworkSpeed";

const NetworkSpeedMonitor: React.FC = () => {
  const speed = useNetworkSpeed();

  return (
    <Card className="m-4 p-3 shadow">
      <Card.Body>
        <Card.Title>🚀 Velocidad de Red</Card.Title>
        <p>Velocidad actual: <b>{speed ? `${speed} Mbps` : "Desconocida"}</b></p>
      </Card.Body>
    </Card>
  );
};

export default NetworkSpeedMonitor;
