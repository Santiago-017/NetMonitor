"use client";

import React from 'react';
import { Card } from 'react-bootstrap';
import { useBatteryStatus } from '../../hooks/useBatteryStatus';

const BatteryStatus: React.FC = () => {
  const { level, charging } = useBatteryStatus();

  return (
    <Card className="m-4 p-3 shadow">
      <Card.Body>
        <Card.Title>🔋 Estado de la Batería</Card.Title>
        <p>Nivel de batería: {(level * 100).toFixed(0)}%</p>
        <p>Estado de carga: {charging ? 'Cargando' : 'No cargando'}</p>
      </Card.Body>
    </Card>
  );
};

export default BatteryStatus;
