import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { AuthValidation } from "./auth.validation";
import { UserValidation } from "../user/user.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

router.post(
  "/register",
  validateRequest(UserValidation.registerValidationSchema),
  AuthController.registerUser
);

router.patch(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.seller),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword
);

router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
