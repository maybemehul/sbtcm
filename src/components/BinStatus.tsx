import React from 'react';
import { Trash2, Battery, Wifi } from 'lucide-react';
import { Bin, FillStatus } from '../types';

interface BinStatusProps {
  bin: Bin;
}

export const BinStatus: React.FC<BinStatusProps> = ({ bin }) => {
  const getFillStatus = (level: number): FillStatus => {
    if (level <= 25) return 'low';
    if (level <= 75) return 'medium';
    return 'high';
  };

  const getStatusColor = (status: FillStatus): string => {
    switch (status) {
      case 'low':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const status = getFillStatus(bin.fillLevel);
  const statusColor = getStatusColor(status);

  return (
    <div className="relative overflow-hidden bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-full ${statusColor}`}>
            <Trash2 className="text-white" size={24} />
          </div>
          <div className="flex gap-2">
            <Wifi className="text-green-400" size={16} />
            <Battery className="text-green-400" size={16} />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="font-medium text-white">Bin {bin.position}</p>
            <span className="text-sm text-blue-300">ID: {bin.id.toString().slice(2, 8)}</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${statusColor} transition-all duration-500`}
              style={{ width: `${bin.fillLevel}%` }}
            ></div>
          </div>
          <p className="text-right text-sm text-blue-200">{bin.fillLevel}% Capacity</p>
        </div>
      </div>
    </div>
  );
};