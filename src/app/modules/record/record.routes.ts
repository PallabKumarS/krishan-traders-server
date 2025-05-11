import { Router } from "express";
import { RecordController } from "./record.controller";

const router = Router();

// Define routes
router.get("/", RecordController.getAllRecord);

export const RecordRoutes = router;