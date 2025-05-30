import { Request, Response } from "express";
import { StatisticsService } from "./statistics.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const getAllStatistics = catchAsync(async (req: Request, res: Response) => {
  const data = await StatisticsService.getAllStatisticsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Statisticss retrieved successfully",
    data,
  });
});

export const StatisticsController = { getAllStatistics };