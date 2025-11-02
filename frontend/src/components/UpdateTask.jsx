import { useEffect, useState } from "react";
import "../style/UpdateTask.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const UpdateTask = () => {
    const [task, setTask] = useState({ title: "", description: "" });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getTodo();
    }, []);

    const getTodo = async () => {
        setLoading(true);
        try {
            let todo = await fetch(`http://localhost:3000/api/task/${id}`);
            todo = await todo.json();
            if (todo) setTask(todo);
        } catch (err) {
            console.error("Error fetching task:", err);
            toast.error("Error fetching task!", {
                position: "top-center",
                className: "custom-toast error-toast",
            });
        }
        setLoading(false);
    };

    const updateTodo = async () => {
        if (!task.title || !task.description) {
            toast.error("Title and Description required!", {
                position: "top-center",
                className: "custom-toast error-toast",
            });
            return;
        }

        setUpdating(true);
        try {
            let result = await fetch(`http://localhost:3000/api/update-task/${id}`, {
                method: "PATCH",
                body: JSON.stringify(task),
                headers: { "Content-Type": "application/json" },
            });
            result = await result.json();

            if (result) {
                toast.success("🎉 Task updated successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    className: "custom-toast success-toast",
                });

                setTimeout(() => {
                    navigate("/tasks");
                    setUpdating(false);
                    setTask({ title: "", description: "" });
                }, 1500);
            }
        } catch (err) {
            console.error("Error updating task:", err);
            toast.error("Failed to update task!", {
                position: "top-center",
                className: "custom-toast error-toast",
            });
            setUpdating(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div>
            <div className="container">
                <h1 className="tas-heading">Update Task</h1>

                <label className="sub-heading">Title</label>
                <input
                    value={task?.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    className="title-inp"
                    type="text"
                    placeholder="Enter title"
                    disabled={updating}
                />

                <label className="sub-heading">Description</label>
                <textarea
                    value={task?.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    name="description"
                    className="description"
                    placeholder="Enter task description"
                    disabled={updating}
                ></textarea>

                <div className="btn-group">
                    <button
                        className="update-btn"
                        onClick={updateTodo}
                        disabled={updating}
                    >
                        {updating ? <span className="spinner"></span> : "Update Task"}
                    </button>

                    <button
                        className="cancel-btn"
                        onClick={() => navigate("/tasks")}
                        disabled={updating}
                    >
                        Cancel
                    </button>
                </div>
            </div>

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

export default UpdateTask;