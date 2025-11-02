import express from 'express';
import { addTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/taskController.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.send(new Date().toLocaleString())
})

router.post("/add-task", addTask)
router.get("/get-tasks", getTasks)
router.get("/task/:id", getTask)
router.delete("/delete-task/:id", deleteTask)
router.patch("/update-task/:id", updateTask)

export default router