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

router.post(
  "/add-stock",
  auth(USER_ROLE.admin, USER_ROLE.staff),
  StockController.addStock
);

router.post(
  "/sell-stock",
  auth(USER_ROLE.admin, USER_ROLE.staff),
  StockController.sellStock
);

router.patch("/:id", auth(USER_ROLE.admin), StockController.updateStock);

router.patch(
  "/:id/accept-stock",
  auth(USER_ROLE.admin),
  StockController.acceptStock
);

router.delete("/:id", auth(USER_ROLE.admin), StockController.deleteStock);

export const StockRoutes = router;
