import express from "express"
import { addTask, deleteTask, getTask, singleTask, updateTask } from "../controllers/todo.controller.js";

const router = express.Router()

//Route for Add Task
router.post("/addtask", addTask)

//Route for get task
router.get("/get", getTask)

//Route for update task
router.put("/update:id", updateTask)

//Route for delete task
router.delete("/delete:id", deleteTask)

//Route for single task
router.get("/single:id", singleTask)

export default router;