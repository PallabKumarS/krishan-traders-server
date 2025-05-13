import { Router } from "express";
import { StockController } from "./stock.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

// Define routes
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.staff),
  StockController.getAllStock
);

router.patch("/:id", auth(USER_ROLE.admin), StockController.updateStock);

router.delete("/:id", auth(USER_ROLE.admin), StockController.deleteStock);

export const StockRoutes = router;
