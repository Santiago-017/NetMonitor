import NetworkStatus from "../components/NetworkStatus";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">📡 NetMonitor</h1>
      <p className="text-gray-700 text-lg">Monitoreo de red en tiempo real.</p>

      <div className="mt-6">
        <NetworkStatus />
      </div>
    </div>
  );
}
