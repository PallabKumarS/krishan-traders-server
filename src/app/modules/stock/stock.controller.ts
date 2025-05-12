import { Request, Response } from "express";
import { StockService } from "./stock.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

// get all stock
const getAllStock = catchAsync(async (req: Request, res: Response) => {
  const data = await StockService.getAllStockFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stocks retrieved successfully",
    data: data.data,
    meta: data.meta,
  });
});

// add stock
const addStock = catchAsync(async (req: Request, res: Response) => {
  const result = await StockService.addStockToDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Stock added successfully",
    data: result,
  });
});

// sell stock
const sellStock = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id!;
  const result = await StockService.sellStockFromDB(
    id,
    req.body,
    req.user.userId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stock sold successfully",
    data: result,
  });
});

// update stock
const updateStock = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id!;
  const result = await StockService.updateStockInDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stock updated successfully",
    data: result,
  });
});

// accept stock
const acceptStock = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id!;
  const result = await StockService.acceptStockInDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stock accepted successfully",
    data: result,
  });
});

// delete stock
const deleteStock = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id!;
  await StockService.deleteStockFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stock deleted successfully",
    data: null,
  });
});

export const StockController = {
  getAllStock,
  addStock,
  sellStock,
  updateStock,
  deleteStock,
  acceptStock,
};
