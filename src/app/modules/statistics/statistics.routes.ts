import { Router } from "express";
import { StatisticsController } from "./statistics.controller";

const router = Router();

// Define routes
router.get("/", StatisticsController.getAllStatistics);

export const StatisticsRoutes = router;