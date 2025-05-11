import StockModel from "./stock.model";

const getAllStockFromDB = async () => {
  const result = await StockModel.find({});
  return result;
};

export const StockService = { getAllStockFromDB };