import { useState } from "react";
import "../style/AddTask.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = () => {
    const [task, setTask] = useState({ title: "", description: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAddTask = async () => {
        if (!task.title || !task.description) {
            toast.error("All fields are required!", {
                position: "top-center",
                className: "custom-toast error-toast",
            });
            return;
        }

        setLoading(true);
        try {
            let result = await fetch("http://localhost:3000/api/add-task", {
                method: "POST",
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            result = await result.json();

            if (result) {
                toast.success("🎉 New task added successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    className: "custom-toast success-toast",
                });

                setTimeout(() => {
                    navigate("/tasks");
                    setTask({ title: "", description: "" });
                    setLoading(false);
                }, 1500);
            }
        } catch (error) {
            console.error("Error adding task:", error);
            toast.error("Failed to add task. Please try again!", {
                position: "top-center",
                className: "custom-toast error-toast",
            });
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="container">
                <h1 className="task-heading">Add New Task</h1>

                <label htmlFor="" className="sub-heading">
                    Title
                </label>
                <input
                    value={task.title}
                    onChange={(e) =>
                        setTask({ ...task, title: e.target.value })
                    }
                    className="title-inp"
                    type="text"
                    placeholder="Enter title"
                    disabled={loading}
                />

                <label htmlFor="" className="sub-heading">
                    Description
                </label>
                <textarea
                    value={task.description}
                    onChange={(e) =>
                        setTask({ ...task, description: e.target.value })
                    }
                    name="description"
                    className="description"
                    placeholder="Enter task description"
                    disabled={loading}
                ></textarea>

                <button
                    className="add-btn"
                    onClick={handleAddTask}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="spinner"></span>
                    ) : (
                        "Create Task"
                    )}
                </button>
            </div>

            {/* Toast container */}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover={false}
                draggable
                theme="light"
            />
        </div>
    );
};

export default AddTask;