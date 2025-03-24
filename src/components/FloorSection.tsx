import React from 'react';
import { Building2 } from 'lucide-react';
import { FloorData } from '../types';
import { BinStatus } from './BinStatus';

interface FloorSectionProps {
  floorData: FloorData;
}

export const FloorSection: React.FC<FloorSectionProps> = ({ floorData }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
      <div className="flex items-center mb-6">
        <Building2 className="text-blue-400 mr-3" size={28} />
        <div>
          <h2 className="text-2xl font-bold text-white">Floor {floorData.floor}</h2>
          <p className="text-blue-300 text-sm">Monitoring 3 Smart Bins</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {floorData.bins.map((bin) => (
          <BinStatus key={bin.id} bin={bin} />
        ))}
      </div>
    </div>
  );
};