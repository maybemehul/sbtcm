import React, { useState, useEffect } from 'react';
import { FloorSection } from './components/FloorSection';
import { BuildingVisualizer } from './components/BuildingVisualizer';
import { Bin, FloorData, BuildingFloor, FillStatus } from './types';
import { Activity } from 'lucide-react';

function App() {
  const [floorsData, setFloorsData] = useState<FloorData[]>([]);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

  const calculateFloorStatus = (bins: Bin[]): FillStatus => {
    const avgFillLevel = bins.reduce((sum, bin) => sum + bin.fillLevel, 0) / bins.length;
    if (avgFillLevel <= 25) return 'low';
    if (avgFillLevel <= 75) return 'medium';
    return 'high';
  };

  useEffect(() => {
    const generateBinData = (): Bin[] => {
      return Array.from({ length: 3 }, (_, i) => ({
        id: Math.random(),
        position: i + 1,
        floor: 1,
        fillLevel: Math.floor(Math.random() * 100)
      }));
    };

    const generateFloorsData = () => {
      return Array.from({ length: 13 }, (_, i) => ({
        floor: i + 1,
        bins: generateBinData()
      }));
    };

    setFloorsData(generateFloorsData());
    setSelectedFloor(null);

    const interval = setInterval(() => {
      setFloorsData(generateFloorsData());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const buildingFloors: BuildingFloor[] = floorsData.map(floor => ({
    floor: floor.floor,
    status: calculateFloorStatus(floor.bins)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <Activity className="text-blue-400" size={32} />
            <h1 className="text-4xl font-bold text-white">Smart Bin Management</h1>
          </div>
          <p className="text-blue-300">Real-time waste management monitoring system</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-6 text-center">Building Overview</h2>
              <BuildingVisualizer
                floors={buildingFloors}
                onFloorClick={setSelectedFloor}
                selectedFloor={selectedFloor}
              />
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {selectedFloor ? (
              <FloorSection
                floorData={floorsData.find(f => f.floor === selectedFloor)!}
              />
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/10">
                <p className="text-blue-300">Select a floor to view bin details</p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-8 text-center text-blue-300/60 text-sm">
          <p>Last updated: {new Date().toLocaleTimeString()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;