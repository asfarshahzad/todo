import taskModel from "../models/taskModel.js";

// add new task 
export const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Basic validation
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        const task = await taskModel.create({ title, description });
        res.status(201).json({ message: "Task added successfully", data: task });
    } catch (err) {
        console.error("Error adding task:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


// READ all tasks 
export const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find();
        res.status(201).json(tasks);
    } catch (err) {
        console.error("Error get all task:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// READ one task by id
export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskModel.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (err) {
        console.error("Error fetching task by ID:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


// delete task by id
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await taskModel.findByIdAndDelete(id);
        if (!deletedTask) return res.status(404).json({ message: "Task not found" });
        res.status(201).json({ message: "Task deleted Successfully", deletedTask: deletedTask });
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


// update task by id 
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        const updatedTask = await taskModel.findByIdAndUpdate(id, { title, description }, { new: true })
        res.status(201).json({ message: "Task updated Successfully", updatedTask: updatedTask });
    } catch (error) {
        console.error("Error deleting task:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}