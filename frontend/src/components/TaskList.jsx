import React, { useState, useEffect } from "react";
import "../style/TaskList.css";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskList = () => {
    const [taskData, setTaskData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        readAllTasks();
    }, []);

    // ✅ Fetch all tasks
    const readAllTasks = async () => {
        setLoading(true);
        try {
            let tasks = await fetch("http://localhost:3000/api/get-tasks");
            tasks = await tasks.json();
            setTaskData(tasks || []);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            toast.error("Failed to fetch tasks!", {
                position: "top-center",
                style: {
                    backgroundColor: "#fff",
                    color: "red",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    fontWeight: "600",
                },
            });
        }
        setLoading(false);
    };

    // ✅ Delete a task with SweetAlert + Toast
    const deleteTodo = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this task?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:3000/api/delete-task/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    toast.success("Task successfully deleted!", {
                        position: "top-center",
                        autoClose: 2000,
                        className: "custom-toast success-toast",
                    });
                    readAllTasks();
                } else {
                    toast.error("Failed to delete task!", {
                        position: "top-center",
                        className: "custom-toast error-toast",
                    });
                }
            } catch (err) {
                console.error("Error deleting task:", err);
                toast.error("Something went wrong! Try again.", {
                    position: "top-center",
                    className: "custom-toast error-toast",
                });
            }
        }
    };


    return (
        <div className="task-container">
            <h1 className="tasklist-heading">To Do List</h1>

            <table className="task-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                                <Loader size={28} />
                            </td>
                        </tr>
                    ) : taskData.length === 0 ? (
                        <tr style={{ textAlign: "center" }}>
                            <td colSpan="4" className="empty-text">
                                🚀 No tasks yet — <span>Add your first task!</span>
                            </td>
                        </tr>
                    ) : (
                        taskData.map((task, index) => (
                            <tr key={task._id}>
                                <td>{`${index + 1})`}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td className="action-btns">
                                    <NavLink
                                        className="icon-btn edit"
                                        to={`/update/${task._id}`}
                                    >
                                        <Pencil size={18} className="icon" />
                                        Edit
                                    </NavLink>
                                    <button
                                        className="icon-btn delete"
                                        onClick={() => deleteTodo(task._id)}
                                    >
                                        <Trash2 size={18} className="icon" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

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

export default TaskList;