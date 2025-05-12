import { Model, Types } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  status: TUserStatus;
  isDeleted: boolean;
  phoneNumber?: string;
  address?: string;
  profileImg?: string;
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TUserRole = "admin" | "staff" | "guest";

export type TUserStatus = "active" | "blocked";

export interface IUser extends Model<TUser> {
  isUserExists(id: Types.ObjectId): Promise<TUser | null>;

  isPasswordMatched(
    myPlaintextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
