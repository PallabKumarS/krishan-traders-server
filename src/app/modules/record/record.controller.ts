import { Request, Response } from "express";
import { RecordService } from "./record.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllRecord = catchAsync(async (req: Request, res: Response) => {
  const data = await RecordService.getAllRecordFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Records retrieved successfully",
    data: data.data,
    meta: data.meta,
  });
});

export const RecordController = { getAllRecord };
