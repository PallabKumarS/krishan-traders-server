import QueryBuilder from "../../builder/QueryBuilder";
import RecordModel from "./record.model";

const getAllRecordFromDB = async (query: Record<string, unknown>) => {
  const recordQuery = new QueryBuilder(RecordModel.find({}), query)
    .paginate()
    .sort()
    .filter();

  const data = await recordQuery.modelQuery
    .populate("stockId")
    .populate("soldBy")
    .populate("stockedBy");
  const meta = await recordQuery.countTotal();

  return {
    meta,
    data,
  };
};

export const RecordService = { getAllRecordFromDB };
