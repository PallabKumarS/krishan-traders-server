import UserModel from "../user/user.model";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";
import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";
import { TLoginUser } from "./auth.interface";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TUser } from "../user/user.interface";

// login user here
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await UserModel.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // checking if the user is active
  if (user.status !== "active") {
    throw new AppError(httpStatus.FORBIDDEN, "Your account is deactivated !");
  }

  // checking if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  //checking if the password is correct
  if (
    !(await UserModel.isPasswordMatched(
      payload?.password,
      user?.password as string
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not match");
  }

  //create token and sent to the  client
  const jwtPayload = {
    userId: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

// register user
const registerUser = async (payload: Partial<TUser>) => {
  const user = await UserModel.create(payload);
  return user;
};

// change password here
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // checking if the user is exist
  const user = await UserModel.isUserExists(userData.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // checking if the user is active
  if (user.status !== "active") {
    throw new AppError(httpStatus.FORBIDDEN, "Your account is deactivated !");
  }

  // checking if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  //checking if the password is correct
  if (
    !(await UserModel.isPasswordMatched(
      payload.oldPassword,
      user?.password as string
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not match");
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await UserModel.findOneAndUpdate(
    {
      userId: userData.userId,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

// refresh token here service here
const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId } = decoded;

  // checking if the user is exist
  const user = await UserModel.isUserExists(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // checking if the user is active
  if (user.status !== "active") {
    throw new AppError(httpStatus.FORBIDDEN, "Your account is deactivated !");
  }
  // checking if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  const jwtPayload = {
    userId: user._id!,
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
  registerUser,
};
