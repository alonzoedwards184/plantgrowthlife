// Plant.ts
export interface Plant {
  id: number;
  plantName: string;
  growthStage: string;
  nutrientLevel: string;
  plantDate: Date; // Changed type to Date
}
