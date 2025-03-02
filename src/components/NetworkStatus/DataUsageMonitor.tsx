"use client";

import React from 'react';
import { Card } from 'react-bootstrap';
import { useDataUsage } from '../../hooks/useDataUsage';

const DataUsageMonitor: React.FC = () => {
  const dataUsage = useDataUsage();

  return (
    <Card className="m-4 p-3 shadow">
      <Card.Body>
        <Card.Title>📡 Monitor de Consumo de Datos</Card.Title>
        <p>Datos descargados: {dataUsage.toFixed(2)} MB</p>
      </Card.Body>
    </Card>
  );
};

export default DataUsageMonitor;
