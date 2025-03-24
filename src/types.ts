export interface Bin {
  id: number;
  floor: number;
  position: number;
  fillLevel: number;
}

export type FillStatus = 'low' | 'medium' | 'high';

export interface FloorData {
  floor: number;
  bins: Bin[];
}

export interface BuildingFloor {
  floor: number;
  status: FillStatus;
}