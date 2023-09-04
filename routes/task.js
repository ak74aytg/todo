import express from "express";
import {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
} from "../controller/task.js";
import { isAuthenticated } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/new", isAuthenticated, createTask);
router.get("/my", isAuthenticated, getAllTask);
router
  .route("/:id", isAuthenticated)
  .put(updateTask)
  .delete(deleteTask);

export default router;
