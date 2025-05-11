import { Model, Types } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "seller";
  phoneNumber?: string;
  address?: string;
  profileImg?: string;
  status?: string;
  isDeleted?: boolean;
};

export type TUserRole = "admin" | "seller";

export interface IUser extends Model<TUser> {
  isUserExists(id: Types.ObjectId): Promise<TUser | null>;
}
