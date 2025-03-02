"use client";

import React from 'react';
import { Table, Card } from 'react-bootstrap';
import { useNetworkInfo } from '@/app/hooks/useNetworkInfo';

const NetworkInfo: React.FC = () => {
  const { type, downlink, rtt } = useNetworkInfo();

  return (
    <Card className="m-4 p-3 shadow">
      <Card.Body>
        <Card.Title>🌐 Información de la Red</Card.Title>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Tipo de conexión:</td>
              <td>{type}</td>
            </tr>
            <tr>
              <td>Velocidad de bajada:</td>
              <td>{downlink} Mbps</td>
            </tr>
            <tr>
              <td>Latencia:</td>
              <td>{rtt} ms</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default NetworkInfo;
