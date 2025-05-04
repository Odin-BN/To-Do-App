import React from "react";
import { Task } from "../types/Task";

interface DeleteTaskModalProps {
    task: Task | null;
    isVisible: boolean;
    onClose: () => void;
    onDelete: () => void;
}

/**
 * DeleteTaskModal Component
 * 
 * A modal for confirming task deletion.
 */
const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ task, isVisible, onClose, onDelete }) => {
    if (!isVisible || !task) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
            }}
        >
            <div
                style={{
                    position: "fixed",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    width: "400px",
                    maxWidth: "90%",
                }}
            >
                <h2>Are you sure you want to delete this task?</h2>
                <p>
                    {task.name} {task.priority} {task.dueDate}
                </p>
                <div>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteTaskModal;
