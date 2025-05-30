import { Model } from "mongoose";

export type TStatistics = {
  name: string;
  id?: string;
};

export interface IStatistics extends Model<TStatistics> {
  isStatisticsExists(id: string): Promise<TStatistics | null>;
}