import { Schema, model } from "mongoose";
import { TStock } from "./stock.interface";

const stockSchema = new Schema<TStock>(
  {
    brandName: { type: String, required: true },
    productName: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    stockDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    sellDate: { type: Date },
    stockedBy: { type: Schema.Types.ObjectId, ref: "User",required: true },
    soldBy: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "SOLD", "EXPIRED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

stockSchema.pre("save", function (next) {
  const currentDate = new Date();
  if (this.expiryDate < currentDate) {
    this.status = "EXPIRED";
  }
  next();
});

const StockModel = model<TStock>("Stocks", stockSchema);

export default StockModel;
