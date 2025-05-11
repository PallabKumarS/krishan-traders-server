import { Router } from "express";
import { StockController } from "./stock.controller";

const router = Router();

// Define routes
router.get("/", StockController.getAllStock);

export const StockRoutes = router;