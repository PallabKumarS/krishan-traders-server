import StatisticsModel from "./statistics.model";

const getAllStatisticsFromDB = async () => {
  const result = await StatisticsModel.find({});
  return result;
};

export const StatisticsService = { getAllStatisticsFromDB };