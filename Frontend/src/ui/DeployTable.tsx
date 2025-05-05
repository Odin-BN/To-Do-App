import React, { useState, useContext, useEffect } from "react";
import { useTaskActions } from "../hooks/useTaskActions";
import { Task } from "../types/Task";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import SearchContext from "../context/SearchContext";
import AveragesBox from "./AveragesBox";


/**
 * DeployTable Component
 * 
 * Displays a table of tasks with sorting, pagination, and modals for editing/deleting tasks.
 */
const DeployTable: React.FC = () => {
    const { tasks, nameSearch, prioritySearch, flagSearch } = useContext(SearchContext) ?? { tasks: [] };
    const { fetchAndSetTasks, updateTaskById, deleteTaskById, 
        toggleTaskCompletion, toggleAllTasksCompletion, handleSort, sortPriority, sortDueDate } = useTaskActions();

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // State for pagination.
    const [currentPage, setCurrentPage] = useState<number>(0); // Backend uses 0-based indexing
    const itemsPerPage = 10;

    /**
     * Fetches tasks whenever sorting or pagination parameters change.
     */
    useEffect(() => {
        fetchAndSetTasks(currentPage, itemsPerPage, sortPriority, sortDueDate);
    }, [sortPriority, sortDueDate, tasks, currentPage, nameSearch, prioritySearch, flagSearch]); // Ensure these dependencies are included


    const handleEditClick = (task: Task) => {
        setSelectedTask(task);
        //setEditedTask({ name: task.name, priority: task.priority, deadline: task.dueDate ? task.dueDate : ""});
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (task: Task) => {
        setSelectedTask(task);
        setIsDeleteModalOpen(true);
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
                                onChange={() => toggleAllTasksCompletion(tasks, areAllTasksCompleted)}
                                
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
                                        onChange={(e) => toggleTaskCompletion(task.id, e.target.checked)}
                                    />
                                </td>
                                <td style={{ border: "1px solid black", padding: "10px" }}>{task.name}</td>
                                <td style={{ border: "1px solid black", padding: "10px" }}>{task.priority}</td>
                                <td style={{ border: "1px solid black", padding: "10px" }}>{task.dueDate}</td>
                                <td style={{ border: "1px solid black", padding: "10px" }}>
                                    {!task.flag && (
                                        <>
                                            <button onClick={() => handleEditClick(task)}>Edit</button>
                                            <button onClick={() => handleDeleteClick(task)}>Remove</button>
                                        </>
                                    )}
                                </td>  
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Modals */}
            <EditTaskModal
                task={selectedTask}
                isVisible={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={(name, priority, dueDate) => {
                    if (selectedTask) {
                        updateTaskById(selectedTask.id, { 
                            name, 
                            priority, 
                            dueDate: dueDate || undefined // Convert null to undefined for compatibility.
                        });
                    }
                    setIsEditModalOpen(false);
                }}
            />
            <DeleteTaskModal
                task={selectedTask}
                isVisible={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => {
                    if (selectedTask) deleteTaskById(selectedTask.id);
                    setIsDeleteModalOpen(false);
                }}
            />

            {/* Pagination controls */}
            <div style={{ top: "930px", left: "800px", textAlign: "center", position: "absolute" }}>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>
                    Previous
                </button>
                <span style={{ margin: "0 10px" }}>Page {currentPage + 1}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={tasks.length < itemsPerPage }>
                    Next
                </button>
            </div>

            {/* Averages box */}
            <AveragesBox />
        </div>
    );
};

export default DeployTable;
