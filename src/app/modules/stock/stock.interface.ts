import { Types } from "mongoose";

export type TStock = {
  brandName: string;
  productName: string;
  size: string;
  status: TStockStatus;
  quantity: number;
  stockDate: Date;
  stockedBy: Types.ObjectId;
  expiryDate: Date;
  sellDate?: Date;
  soldBy?: Types.ObjectId;
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TStockStatus =
  | "pending"
  | "accepted"
  | "sold"
  | "expired"
  | "rejected";
