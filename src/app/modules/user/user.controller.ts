import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.getAllUserFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data,
  });
});

export const UserController = { getAllUser };