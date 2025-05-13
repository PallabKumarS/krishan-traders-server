import { Schema, model } from "mongoose";
import { TStock } from "./stock.interface";

const stockSchema = new Schema<TStock>(
  {
    brandName: { type: String, required: true },
    productName: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    stockedDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    soldDate: { type: Date },
    stockedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    soldBy: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "accepted", "sold", "expired", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const StockModel = model<TStock>("Stocks", stockSchema);

export default StockModel;
