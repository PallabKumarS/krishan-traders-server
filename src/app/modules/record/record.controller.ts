import { Request, Response } from "express";
import { RecordService } from "./record.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const getAllRecord = catchAsync(async (req: Request, res: Response) => {
  const data = await RecordService.getAllRecordFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Records retrieved successfully",
    data,
  });
});

export const RecordController = { getAllRecord };