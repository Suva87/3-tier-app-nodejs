import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [200, "Title must be at most 200 characters"],
    },
    dueDate: {
      // store as Date (we’ll use "YYYY-MM-DD" from UI and convert)
      type: Date,
      required: [true, "Due date is required"],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    doneAt: {
      // when marked done, store timestamp; when undone, set null
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export const Task = mongoose.model("Task", taskSchema);
