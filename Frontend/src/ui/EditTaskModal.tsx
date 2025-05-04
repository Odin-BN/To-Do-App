import React, { useState, useEffect } from "react";

interface EditTaskModalProps {
    task: { name: string; priority: string; dueDate: string | undefined } | null;
    isVisible: boolean;
    onClose: () => void;
    onSave: (name: string, priority: string, dueDate: string | null) => void;
}

/**
 * EditTaskModal Component
 * 
 * A modal for editing a task's details.
 */
const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, isVisible, onClose, onSave }) => {
    const [editedTask, setEditedTask] = useState<{ name: string; priority: string; dueDate: string | null }>({
        name: "",
        priority: "High",
        dueDate: null,
    });

    // Reinitialize the state whenever the `task` prop changes.
    useEffect(() => {
        if (task) {
            setEditedTask({
                name: task.name,
                priority: task.priority,
                dueDate: task.dueDate || null,
            });
        }
    }, [task]);

    if (!isVisible || !task) return null;

    const handleSave = () => {
        if (editedTask.name && editedTask.priority) {
            onSave(editedTask.name, editedTask.priority, editedTask.dueDate); // Send the updated task back to the parent.
        } else {
            alert("Please fill out the required fields before saving.");
        }
    };

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
                <h2>Edit Task</h2>
                <input
                    type="text"
                    value={editedTask.name}
                    onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
                    placeholder="Name"
                />
                <select
                    value={editedTask.priority}
                    onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <input
                    type="date"
                    value={editedTask.dueDate || ""}
                    onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value || null })}
                />
                <div>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;
