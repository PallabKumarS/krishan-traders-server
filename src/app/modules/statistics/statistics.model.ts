import { Schema, model } from "mongoose";
import { TStatistics, IStatistics } from "./statistics.interface";

const statisticsSchema = new Schema<TStatistics, IStatistics>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

statisticsSchema.statics.isStatisticsExists = async function (id: string) {
  return await StatisticsModel.findOne({ id });
};

const StatisticsModel = model<TStatistics, IStatistics>(
  "Statisticss",
  statisticsSchema
);

export default StatisticsModel;
