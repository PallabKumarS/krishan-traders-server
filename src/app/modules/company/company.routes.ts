import { Router } from "express";
import { CompanyController } from "./company.controller";

const router = Router();

// Define routes
router.get("/", CompanyController.getAllCompany);

router.post("/", CompanyController.createCompany);

router.patch("/:id", CompanyController.updateCompany);

router.delete("/:id", CompanyController.deleteCompany);

router.get("/:id/products", CompanyController.getProductsNameByCompany);

export const CompanyRoutes = router;
