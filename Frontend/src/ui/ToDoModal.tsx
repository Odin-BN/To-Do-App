import React, { useState } from 'react';
import "./ToDoModal.css";

/**
 * ToDoModal Component
 * 
 * This component renders a modal for creating a new "To Do" task. It includes:
 * - Input fields for task name, priority, and deadline.
 * - Validation for task name length and non-empty input.
 * - A POST request to save the new task to the backend.
 * - Error handling for failed task creation.
 * 
 * @param {Object} props - Component props.
 * @param {() => void} props.onClose - Function to close the modal.
 * @returns {JSX.Element} A modal for creating a new task.
 */
interface ToDoModalProps {
    onClose: () => void; // Function to close the modal.
}

const ToDoModal: React.FC<ToDoModalProps> = ({ onClose }) => {
    // State for task name input.
    const [taskName, setTaskName] = useState("");
    // State for priority selection.
    const [taskPriority, setTaskPriority] = useState("Low");
    // State for deadline input.
    const [taskDeadline, setTaskDeadline] = useState("");
    // State for error messages.
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Handles the save action for creating a new task.
     * Validates the input and sends a POST request to the backend.
     * 
     * @param {React.FormEvent} e - The form submission event.
     */
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate task name.
        if (!taskName.trim()) {
            setErrorMessage("Task name cannot be empty.");
            return;
        }
        if (taskName.length > 120) {
            setErrorMessage("Task name cannot exceed 120 characters.");
            return;
        }

        setErrorMessage(""); // Clear any previous error messages.

        const newTask = {
            name: taskName,
            priority: taskPriority,
            deadline: taskDeadline || null, // Use null if no deadline is provided.
        };

        try {
            // Send a POST request to create the new task.
            const response = await fetch("http://localhost:9090/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error("Failed to save task");
            }

            // Reset form fields and close the modal on success.
            onClose();
            setTaskName("");
            setTaskDeadline("");
            setTaskPriority("Low");
        } catch (err) {
            console.error("Error saving task:", err);
            setErrorMessage("Failed to save task. Please try again.");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Create a New Task</h2>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <form onSubmit={handleSave}>
                    {/* Task Name Input */}
                    <div>
                        <label htmlFor="taskName">Task Name (max 120 characters)</label>
                        <input
                            type="text"
                            id="taskName"
                            maxLength={120}
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Priority Selection */}
                    <div>
                        <label htmlFor="taskPriority">Priority</label>
                        <select
                            id="taskPriority"
                            value={taskPriority}
                            onChange={(e) => setTaskPriority(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    {/* Deadline Input */}
                    <div>
                        <label htmlFor="taskDeadline">Deadline</label>
                        <input
                            type="date"
                            id="taskDeadline"
                            value={taskDeadline}
                            onChange={(e) => setTaskDeadline(e.target.value)}
                        />
                    </div>

                    {/* Save Button */}
                    <button type="submit">Save Task</button>
                </form>

                {/* Close Button */}
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ToDoModal;