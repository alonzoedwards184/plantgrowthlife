// Plant.ts
export interface Plant {
  id: number;
  plantName: string;
  growthStage: string;
  nutrientLevel: string;
  plantDate: string; // Changed type to Date
}
