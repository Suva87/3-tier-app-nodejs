import express from "express";
import { getTasks, createTask, deleteTask, markDone, markUndone } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);

// mark done/undone
router.patch("/:id/done", markDone);
router.patch("/:id/undone", markUndone);

export default router;
