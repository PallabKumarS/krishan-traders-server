import { Request, Response } from "express";
import { StockService } from "./stock.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const getAllStock = catchAsync(async (req: Request, res: Response) => {
  const data = await StockService.getAllStockFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Stocks retrieved successfully",
    data,
  });
});

export const StockController = { getAllStock };