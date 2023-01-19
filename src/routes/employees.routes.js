import { Router } from "express";
import {
  getEmployee,
  getEmployees,
  createEmployees,
  putEmployees,
  patchEmployees,
  deleteEmployees,
} from "../controllers/employees.controller.js";

const router = Router();

router.get("/employees", getEmployees);

router.get("/employees/:id", getEmployee);

router.post("/employees", createEmployees);

router.put("/employees/:id", putEmployees);

router.patch("/employees/:id", patchEmployees);

router.delete("/employees/:id", deleteEmployees);

export default router;
