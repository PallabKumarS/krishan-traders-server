import { Schema, model } from "mongoose";
import { TRecord } from "./record.interface";

const recordSchema = new Schema<TRecord>(
  {
    quantity: { type: Number, required: true },
    soldBy: { type: Schema.Types.ObjectId, ref: "User" },
    soldDate: {
      type: Date,
      default: Date.now,
    },
    stockedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    stockDate: {
      type: Date,
      default: Date.now,
    },
    stockId: {
      type: Schema.Types.ObjectId,
      ref: "Stocks",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "sold", "stocked", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const RecordModel = model<TRecord>("Records", recordSchema);

export default RecordModel;
