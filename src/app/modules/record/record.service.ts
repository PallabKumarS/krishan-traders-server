import RecordModel from "./record.model";

const getAllRecordFromDB = async () => {
  const result = await RecordModel.find({});
  return result;
};

export const RecordService = { getAllRecordFromDB };