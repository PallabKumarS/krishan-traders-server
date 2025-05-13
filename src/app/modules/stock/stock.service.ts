import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { TStock } from "./stock.interface";
import StockModel from "./stock.model";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";
import RecordModel from "../record/record.model";

// get all stock
const getAllStockFromDB = async (query: Record<string, unknown>) => {
  const stockQuery = new QueryBuilder(StockModel.find(), query)
    .paginate()
    .sort()
    .filter()
    .search(["productName", "brandName"]);

  const data = await stockQuery.modelQuery;
  const meta = await stockQuery.countTotal();

  return {
    meta,
    data,
  };
};

// update stock
const updateStockInDB = async (id: string, payload: Partial<TStock>) => {
  const isStockExist = await StockModel.findOne({
    _id: id,
    status: "ACCEPTED",
  });

  if (!isStockExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Stock not found");
  }

  const result = await StockModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// delete stock
const deleteStockFromDB = async (id: string) => {
  const isStockExist = await StockModel.findOne({
    _id: id,
  });

  if (!isStockExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Stock not found");
  }

  const result = await StockModel.findOneAndDelete({ _id: id });

  return result;
};

export const StockService = {
  getAllStockFromDB,
  updateStockInDB,
  deleteStockFromDB,
};
