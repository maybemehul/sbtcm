import React from 'react';
import { BuildingFloor } from '../types';

interface BuildingVisualizerProps {
  floors: BuildingFloor[];
  onFloorClick: (floor: number) => void;
  selectedFloor: number | null;
}

export const BuildingVisualizer: React.FC<BuildingVisualizerProps> = ({
  floors,
  onFloorClick,
  selectedFloor,
}) => {
  const getFloorColor = (status: string) => {
    switch (status) {
      case 'low':
        return 'bg-green-400';
      case 'medium':
        return 'bg-yellow-400';
      case 'high':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="relative w-64 mx-auto">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-600/20 rounded-lg backdrop-blur-sm"></div>
      <div className="relative flex flex-col-reverse gap-1 p-4">
        {floors.map((floor) => (
          <div
            key={floor.floor}
            onClick={() => onFloorClick(floor.floor)}
            className={`h-8 ${
              getFloorColor(floor.status)
            } cursor-pointer transition-all duration-300 rounded-r-lg
            ${selectedFloor === floor.floor ? 'w-full scale-x-105' : 'w-3/4'}
            hover:w-full hover:shadow-lg hover:shadow-blue-500/20
            flex items-center justify-end pr-4 font-mono text-sm`}
          >
            <span className="text-white font-semibold">Floor {floor.floor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}