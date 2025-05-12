import { Router } from "express";
import { RecordController } from "./record.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

// Define routes
router.get("/", auth(USER_ROLE.admin), RecordController.getAllRecord);

export const RecordRoutes = router;
