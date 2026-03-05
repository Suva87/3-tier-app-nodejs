import { Task } from "../models/Task.js";

/**
 * Utility: normalize date-only string (YYYY-MM-DD) into a Date.
 * We’ll treat it as local date at midnight.
 */
function parseDateOnly(dateStr) {
  // Expecting "YYYY-MM-DD"
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

export async function getTasks(req, res, next) {
  try {
    // Show newest first
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ data: tasks });
  } catch (err) {
    next(err);
  }
}

export async function createTask(req, res, next) {
  try {
    const { title, dueDate } = req.body;

    const parsed = parseDateOnly(dueDate);
    if (!parsed) {
      return res.status(400).json({ message: "Invalid dueDate. Use YYYY-MM-DD." });
    }

    const task = await Task.create({
      title,
      dueDate: parsed,
    });

    res.status(201).json({ data: task });
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
}

export async function markDone(req, res, next) {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (!task.isDone) {
      task.isDone = true;
      task.doneAt = new Date(); // store completion timestamp
      await task.save();
    }

    res.json({ data: task });
  } catch (err) {
    next(err);
  }
}

export async function markUndone(req, res, next) {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // If user confirms, we remove all done-mark info
    task.isDone = false;
    task.doneAt = null;
    await task.save();

    res.json({ data: task });
  } catch (err) {
    next(err);
  }
}
