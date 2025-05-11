import UserModel from "./user.model";

const getAllUserFromDB = async () => {
  const result = await UserModel.find({});
  return result;
};

export const UserService = { getAllUserFromDB };