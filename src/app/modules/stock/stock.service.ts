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

// add stock
const addStockToDB = async (payload: Partial<TStock>) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const stockResult = await StockModel.create([payload], { session });

    if (!stockResult.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to add stock");
    }

    const recordResult = await RecordModel.create(
      [
        {
          stockId: stockResult[0]!._id as mongoose.Types.ObjectId,
          stockDate: stockResult[0]!.stockDate,
          stockedBy: stockResult[0]!.stockedBy,
          quantity: stockResult[0]!.quantity,
        },
      ],
      { session }
    );

    if (!recordResult.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to add to records");
    }

    await session.commitTransaction();
    await session.endSession();

    return stockResult[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
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

// sell stock
const sellStockFromDB = async (
  id: string,
  payload: Partial<TStock>,
  userId: mongoose.Types.ObjectId
) => {
  const isStockExist = await StockModel.findOne({
    _id: id,
    status: "accepted",
  });

  if (!isStockExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Stock not found");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const quantity = isStockExist.quantity - payload.quantity!;

    const stockResult = await StockModel.findOneAndUpdate(
      { _id: id },
      {
        quantity: quantity,
        soldBy: userId,
        soldDate: new Date(),
        status: quantity === 0 ? "sold" : "accepted",
      },
      {
        new: true,
        session,
      }
    );

    if (!stockResult) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to sell stock");
    }

    const recordResult = await RecordModel.create(
      [
        {
          stockId: stockResult._id,
          quantity: payload.quantity,
          soldBy: userId,
          soldDate: new Date(),
        },
      ],
      { session }
    );

    if (!recordResult.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to add to records");
    }

    await session.commitTransaction();
    await session.endSession();

    return stockResult;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

// change stock status to accepted
const acceptStockInDB = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isStockExist = await StockModel.findOne({
      _id: id,
    });

    if (!isStockExist) {
      throw new AppError(httpStatus.NOT_FOUND, "Stock not found");
    }

    const result = await StockModel.findOneAndUpdate(
      { _id: id },
      { status: "accepted" },
      {
        new: true,
      }
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to accept stock");
    }

    const recordResult = await RecordModel.findOneAndUpdate(
      { stockId: result._id },
      { status: "accepted" },
      { new: true }
    );

    if (!recordResult) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to add to records");
    }
    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
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
  addStockToDB,
  updateStockInDB,
  sellStockFromDB,
  acceptStockInDB,
  deleteStockFromDB,
};
