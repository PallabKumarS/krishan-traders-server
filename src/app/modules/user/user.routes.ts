import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = Router();

// Define routes
router.get("/", auth(USER_ROLE.admin), UserController.getAllUser);

router.get(
  "/me",
  auth(USER_ROLE.admin, USER_ROLE.seller),
  UserController.getMe
);

router.patch(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.seller),
  UserController.updateUser
);

router.patch(
  "/:id/status",
  auth(USER_ROLE.admin),
  UserController.updateUserStatus
);

router.patch("/:id/role", auth(USER_ROLE.admin), UserController.updateUserRole);

router.delete("/:id", auth(USER_ROLE.admin), UserController.deleteUser);

export const UserRoutes = router;
