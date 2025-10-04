
import { RealTimeGraph } from '@/components/Monitor/RealTimeGraph';
import { useDataHistoryStore } from '@/store/dataHistoryStore';
import { useNodeStore } from '@/store/nodeStore';

export function MonitoringView() {
  const nodes = useNodeStore((state) => Array.from(state.nodes.values()));
  const waterSensors = nodes.filter(n => n.nodeTypes.includes(10 as any)); // WATER_LEVEL_SENSOR (NodeType.WATER_LEVEL_SENSOR = 20 in agriculture.ts)
  const getWaterLevelHistory = useDataHistoryStore((state) => state.getWaterLevelHistory);
  const getBatteryHistory = useDataHistoryStore((state) => state.getBatteryHistory);
  const getSignalHistory = useDataHistoryStore((state) => state.getSignalHistory);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Real-Time Monitoring
          </h1>
          <p className="text-gray-600 mt-2">
            Live data visualization and trends
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Water Level Charts */}
          {waterSensors.map((node) => {
            const numericId = parseInt(node.id) || 0;
            const history = getWaterLevelHistory(numericId);
            return history.length > 0 ? (
              <RealTimeGraph
                key={`water-${node.id}`}
                data={history}
                title={`Water Level - ${node.userGivenName || node.id}`}
                unit="ft"
                color="#3b82f6"
                height={300}
              />
            ) : null;
          })}

          {/* Battery Level Charts */}
          {nodes.map((node) => {
            const numericId = parseInt(node.id) || 0;
            const history = getBatteryHistory(numericId);
            return history.length > 0 ? (
              <RealTimeGraph
                key={`battery-${node.id}`}
                data={history}
                title={`Battery Level - ${node.userGivenName || node.id}`}
                unit="%"
                color="#10b981"
                height={300}
              />
            ) : null;
          })}

          {/* Signal Strength Charts */}
          {nodes.map((node) => {
            const numericId = parseInt(node.id) || 0;
            const history = getSignalHistory(numericId);
            return history.length > 0 ? (
              <RealTimeGraph
                key={`signal-${node.id}`}
                data={history}
                title={`Signal Strength - ${node.userGivenName || node.id}`}
                unit="dBm"
                color="#8b5cf6"
                height={300}
              />
            ) : null;
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Active Nodes</h3>
            <div className="text-3xl font-bold text-blue-600">{nodes.length}</div>
            <p className="text-sm text-gray-600 mt-1">Connected devices</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Water Sensors</h3>
            <div className="text-3xl font-bold text-green-600">{waterSensors.length}</div>
            <p className="text-sm text-gray-600 mt-1">Monitoring water levels</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Data Points</h3>
            <div className="text-3xl font-bold text-purple-600">
              {nodes.reduce((total, node) => {
                const numericId = parseInt(node.id) || 0;
                const waterHistory = getWaterLevelHistory(numericId).length;
                const batteryHistory = getBatteryHistory(numericId).length;
                const signalHistory = getSignalHistory(numericId).length;
                return total + waterHistory + batteryHistory + signalHistory;
              }, 0)}
            </div>
            <p className="text-sm text-gray-600 mt-1">Total collected</p>
          </div>
        </div>

        {/* Empty State */}
        {nodes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Data Available</h3>
            <p className="text-gray-500">
              Connect to your GateMesh network to start monitoring real-time data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}