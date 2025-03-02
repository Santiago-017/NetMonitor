import React from 'react';
import DataUsageMonitor from './DataUsageMonitor';
import NetworkInfo from './NetworkInfo';
import BatteryStatus from './BatteryStatus';
import NetworkSpeedMonitor from './NetworkSpeedMonitor';

const NetworkStatus: React.FC = () => {
  return (
    <div>
      <NetworkInfo />
      <DataUsageMonitor />
      <BatteryStatus />
      <NetworkSpeedMonitor/>
    </div>
  );
};

export default NetworkStatus;
