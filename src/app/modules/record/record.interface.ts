import { Types } from "mongoose";

export type TRecord = {
  soldBy?: Types.ObjectId;
  stockedBy?: Types.ObjectId;
  soldDate?: string;
  stockDate?: string;
  quantity: number;
  stockId: Types.ObjectId;
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
