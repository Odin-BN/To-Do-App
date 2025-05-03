import React, { useContext, useState } from 'react';
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
    // Access task-related functions and data from SearchContext.
    const { fetchTasks, tasks } = useContext(SearchContext) ?? { tasks: [] };

    // Access average-related functions from AverageTimeContext.
    const { fetchAverages } = useContext(AverageTimeContext);

    // State for sorting tasks.
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    // State for managing modals and task editing.
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editedTask, setEditedTask] = useState({ name: "", priority: "", deadline: "" });

    // State for pagination.
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

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
            fetchTasks();
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
            fetchTasks();
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
            fetchTasks();
            fetchAverages();
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    /**
     * Toggles the completion status of all tasks on the current page.
     */
    const handleFlagAllTasks = async () => {
        try {
            const tasksToUpdate = paginatedTasks.filter(task => task.flag === areAllTasksCompleted);
            await Promise.all(tasksToUpdate.map(task => handleCheckboxChange(task.id, !areAllTasksCompleted)));
            fetchTasks();
            fetchAverages();
        } catch (error) {
            console.error("Error updating task statuses:", error);
        }
    };

    /**
     * Handles sorting tasks by a specific field.
     * @param {"priority" | "duedate"} field - The field to sort by.
     */
    const handleSort = (field: "priority" | "duedate") => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    /**
     * Converts priority levels to numeric values for sorting.
     * @param {string} priority - The priority level (High, Medium, Low).
     * @returns {number} The numeric value of the priority.
     */
    const getPriorityValue = (priority: string) => {
        const priorityMap: { [key: string]: number } = { High: 3, Medium: 2, Low: 1 };
        return priorityMap[priority] || 0;
    };

    // Sort tasks based on the selected field and order.
    const sortedTasks: Task[] = (sortField
        ? [...tasks].sort((a, b) => {
            let comparison = 0;
            if (sortField === "priority") {
                comparison = getPriorityValue(a.priority) - getPriorityValue(b.priority);
            } else if (sortField === "duedate") {
                const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
                const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
                comparison = dateA - dateB;
            }
            return sortOrder === "asc" ? comparison : -comparison;
        })
        : tasks) as Task[];

    // Calculate the total number of pages.
    const totalPages = Math.ceil(sortedTasks.length / itemsPerPage);

    // Paginate tasks for the current page.
    const paginatedTasks = sortedTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Check if all tasks on the current page are completed.
    const areAllTasksCompleted = paginatedTasks.length > 0 && paginatedTasks.every(task => task.flag);

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
                            Priority {sortField === "priority" ? (sortOrder === "asc" ? "<" : ">") : ""}
                        </th>
                        <th
                            onClick={() => handleSort("duedate")}
                            style={{ width: "10%", border: "1px solid black", padding: "10px", cursor: "pointer" }}
                        >
                            Due Date {sortField === "duedate" ? (sortOrder === "asc" ? "<" : ">") : ""}
                        </th>
                        <th style={{ width: "10%", border: "1px solid black", padding: "10px" }}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedTasks.map((task: Task) => {
                        const isCompleted = task.flag;
                        return (
                            <tr
                                key={task.id}
                                style={{
                                    backgroundColor: isCompleted ? "white" : task.rowColor,
                                    textDecoration: isCompleted ? "line-through" : "none",
                                }}
                            >
                                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>
                                    <input
                                        type="checkbox"
                                        checked={isCompleted}
                                        onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                                    />
                                </td>
                                <td style={{ border: "1px solid black", padding: "10px" }}>{task.name}</td>
                                <td style={{ border: "1px solid black", padding: "10px" }}>{task.priority}</td>
                                <td style={{ border: "1px solid black", padding: "10px" }}>{task.dueDate}</td>
                                <td style={{ border: "1px solid black", padding: "10px" }}>
                                    {!isCompleted && (
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
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span style={{ margin: "0 10px" }}>
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

            {/* Averages box */}
            <AveragesBox />
        </div>
    );
};

export default DeployTable;
