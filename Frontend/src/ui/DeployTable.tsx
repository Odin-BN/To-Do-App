import React, { useContext, useState, useEffect } from 'react';
import SearchContext from '../context/SearchContext';
import { Task } from './Task';
import AverageTimeContext from '../context/AverageTimeContext';
import AveragesBox from './AveragesBox';

/**
 * DeployTable Component
 * 
 * This component displays a table of tasks with features for:
 * - Sorting tasks by priority or due date.
 * - Pagination to navigate through tasks.
 * - Editing and deleting tasks via modals.
 * - Toggling task completion status using checkboxes.
 * - Displaying average task completion times.
 * 
 * It consumes `SearchContext` for task data and `AverageTimeContext` for average completion times.
 * 
 * @returns {JSX.Element} A table with task management features.
 */
const DeployTable: React.FC = () => {
    const { fetchTasks, tasks } = useContext(SearchContext) ?? { tasks: [] };
    const { fetchAverages } = useContext(AverageTimeContext);

    // State for sorting tasks.
    const [sortPriority, setSortPriority] = useState<"asc" | "desc" | null>(null);
    const [sortDueDate, setSortDueDate] = useState<"asc" | "desc" | null>(null);

    // State for managing modals and task editing.
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editedTask, setEditedTask] = useState({ name: "", priority: "", deadline: "" });

    // State for pagination.
    const [currentPage, setCurrentPage] = useState<number>(0); // Backend uses 0-based indexing
    const itemsPerPage = 10;

    /**
     * Fetches tasks whenever sorting or pagination parameters change.
     */
    useEffect(() => {
        fetchTasks(currentPage, itemsPerPage, sortPriority, sortDueDate);
    }, [currentPage, sortPriority, sortDueDate, tasks]);

    /**
     * Opens the edit modal for a specific task.
     * @param {Task} task - The task to be edited.
     */
    const handleEditClick = (task: Task) => {
        setSelectedTask(task);
        setEditedTask({ name: task.name, priority: task.priority, deadline: task.dueDate || "" });
        setIsEditModalOpen(true);
    };

    /**
     * Opens the delete confirmation modal for a specific task.
     * @param {Task} task - The task to be deleted.
     */
    const handleRemoveClick = (task: Task) => {
        setSelectedTask(task);
        setIsDeleteModalOpen(true);
    };

    /**
     * Updates a task using a PUT request.
     * Closes the edit modal and refreshes the task list.
     */
    const updateTask = async () => {
        if (!selectedTask) return;
        try {
            await fetch(`http://localhost:9090/todos/${selectedTask.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedTask),
            });
            fetchTasks(currentPage, itemsPerPage, sortPriority, sortDueDate);
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    /**
     * Deletes a task using a DELETE request.
     * Closes the delete modal and refreshes the task list.
     */
    const deleteTask = async () => {
        if (!selectedTask) return;
        try {
            await fetch(`http://localhost:9090/todos/${selectedTask.id}`, { method: "DELETE" });
            fetchTasks(currentPage, itemsPerPage, sortPriority, sortDueDate);
            fetchAverages();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    /**
     * Toggles the completion status of a task using a PUT request.
     * @param {number} taskId - The ID of the task to update.
     * @param {boolean} taskFlag - The new completion status of the task.
     */
    const handleCheckboxChange = async (taskId: number, taskFlag: boolean) => {
        try {
            await fetch(`http://localhost:9090/todos/${taskId}/flag`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ flag: taskFlag }),
            });
            fetchTasks(currentPage, itemsPerPage, sortPriority, sortDueDate);
            fetchAverages();
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    /**
     * Handles sorting tasks by a specific field.
     * @param {"priority" | "duedate"} field - The field to sort by.
     */
    const handleSort = (field: "priority" | "duedate") => {
        if (field === "priority") {
            setSortPriority(sortPriority === "asc" ? "desc" : "asc");
        } else if (field === "duedate") {
            setSortDueDate(sortDueDate === "asc" ? "desc" : "asc");
        }
    };

    /**
     * Toggles the completion status of all tasks on the current page.
     */
    const handleFlagAllTasks = async () => {
        try {
            const tasksToUpdate = tasks.filter(task => task.flag === areAllTasksCompleted);
            await Promise.all(tasksToUpdate.map(task => handleCheckboxChange(task.id, !areAllTasksCompleted)));
            fetchTasks(currentPage, itemsPerPage, sortPriority, sortDueDate);
            fetchAverages();
        } catch (error) {
            console.error("Error updating task statuses:", error);
        }
    };

    // Check if all tasks on the current page are completed.
    const areAllTasksCompleted = tasks.length > 0 && tasks.every(task => task.flag);

    return (
        <div>
            {/* Task table */}
            <table
                style={{
                    width: "97%",
                    borderCollapse: "collapse",
                    position: "relative",
                    top: "54px",
                    border: "1px solid black",
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: "rgb(209, 204, 204)" }}>
                        <th style={{ width: "5%", border: "1px solid black", padding: "10px" }}>
                            <input 
                                type="checkbox"
                                checked={areAllTasksCompleted}
                                onChange={handleFlagAllTasks}
                                
                            />
                        </th>
                        <th style={{ width: "20%", border: "1px solid black", padding: "10px" }}>
                            Name
                        </th>
                        <th
                            onClick={() => handleSort("priority")}
                            style={{ width: "20%", border: "1px solid black", padding: "10px", cursor: "pointer" }}
                        >
                            Priority {sortPriority ? (sortPriority === "asc" ? "<" : ">") : ""}
                        </th>
                        <th
                            onClick={() => handleSort("duedate")}
                            style={{ width: "10%", border: "1px solid black", padding: "10px", cursor: "pointer" }}
                        >
                            Due Date {sortDueDate ? (sortDueDate === "asc" ? "<" : ">") : ""}
                        </th>
                        <th style={{ width: "10%", border: "1px solid black", padding: "10px" }}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task: Task) => {
                        return (
                            <tr key={task.id}
                                style={{
                                    backgroundColor: task.flag ? "white" : task.rowColor,
                                    textDecoration: task.flag ? "line-through" : "none",
                                }}
                            >   
                                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center"}}>
                                    <input
                                        type="checkbox"
                                        checked={task.flag}
                                        onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                                    />
                                </td>
                                <td style={{ border: "1px solid black", padding: "10px" }}>{task.name}</td>
                                <td style={{ border: "1px solid black", padding: "10px" }}>{task.priority}</td>
                                <td style={{ border: "1px solid black", padding: "10px" }}>{task.dueDate}</td>
                                <td style={{ border: "1px solid black", padding: "10px" }}>
                                    {!task.flag && (
                                        <>
                                            <button onClick={() => handleEditClick(task)}>Edit</button>
                                            <button onClick={() => handleRemoveClick(task)}>Remove</button>
                                        </>
                                    )}
                                </td>  
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Edit task modal */}
            {isEditModalOpen && (
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
                            value={editedTask.deadline}
                            onChange={(e) => setEditedTask({ ...editedTask, deadline: e.target.value })}
                        />
                        <div>
                            <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                            <button onClick={updateTask}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete task confirmation modal */}
            {isDeleteModalOpen && (
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
                            {selectedTask?.name} {selectedTask?.priority} {selectedTask?.dueDate}
                        </p>
                        <div>
                            <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                            <button onClick={deleteTask}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pagination controls */}
            <div style={{ top: "930px", left: "800px", textAlign: "center", position: "absolute" }}>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>
                    Previous
                </button>
                <span style={{ margin: "0 10px" }}>Page {currentPage + 1}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={tasks.length < itemsPerPage}>
                    Next
                </button>
            </div>

            {/* Averages box */}
            <AveragesBox />
        </div>
    );
};

export default DeployTable;
