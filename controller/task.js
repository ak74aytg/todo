import { Tasks } from "../models/task.js";
import errorHandler from "../middleware/error.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.user;
    await Tasks.create({
      title,
      description,
      user,
    });

    res.send({
      success: true,
      message: "task added successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const getAllTask = async (req, res) => {
  try {
    const user = req.user;
    const task = await Tasks.find({ user });
    res.send({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};


export const updateTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    const task = await Tasks.findById(id);
    if (!task) return next(new errorHandler("Task not found", 404));
    task.title = title;
    task.description = description;
    await task.save();
    res.send({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);

    if (!task) return next(new errorHandler("Task not found", 404));
    await Tasks.deleteOne(task);
    res.send({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
