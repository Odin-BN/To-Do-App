import { useContext, useState } from "react";
import { fetchTasks, updateTask, deleteTask, toggleTaskFlag, toggleAllTaskFlags } from "../services/taskService";
import SearchContext from "../context/SearchContext";
import { Task } from "../types/Task";
import { TaskAdd } from "../types/TaskAdd";
import AverageTimeContext from '../context/AverageTimeContext';

/**
 * Custom hook for task-related actions.
 * Provides functions to fetch, update, delete, toggle tasks, and handle sorting.
 */
export const useTaskActions = () => {
    const { setTasks, nameSearch, prioritySearch, flagSearch } = useContext(SearchContext);

    const { fetchAverages } = useContext(AverageTimeContext);

    // State for sorting tasks.
    const [sortPriority, setSortPriority] = useState<"asc" | "desc" | null>(null);
    const [sortDueDate, setSortDueDate] = useState<"asc" | "desc" | null>(null);

    const fetchAndSetTasks = async (page: number, size: number, sortPriority: string | null, sortDueDate: string | null) => {
        const tasks = await fetchTasks(page, size, sortPriority, sortDueDate, {
            name: nameSearch,
            priority: prioritySearch,
            status: flagSearch,
        });
        setTasks(tasks);
    };

    const updateTaskById = async (taskId: number, updatedTask: { name: string; priority: string; dueDate: string | undefined }) => {
        const taskAdd: TaskAdd = {
            name: updatedTask.name,
            priority: updatedTask.priority,
            deadline: updatedTask.dueDate || null, // Convert undefined to null for the backend.
        };
        await updateTask(taskId, taskAdd);
        await fetchAndSetTasks(0, 10, sortPriority, sortDueDate); // Refresh tasks
    };

    const deleteTaskById = async (taskId: number) => {
        await deleteTask(taskId);
        await fetchAndSetTasks(0, 10, sortPriority, sortDueDate); // Refresh tasks
    };

    const toggleTaskCompletion = async (taskId: number, flag: boolean) => {
        await toggleTaskFlag(taskId, flag);
        await fetchAverages(); // Fetch updated averages
        await fetchAndSetTasks(0, 10, sortPriority, sortDueDate); // Refresh tasks
    };

    const toggleAllTasksCompletion = async (tasks: Task[], areAllTasksCompleted: boolean) => {
        await toggleAllTaskFlags(tasks, areAllTasksCompleted);
        await fetchAverages(); // Fetch updated averages
        await fetchAndSetTasks(0, 10, sortPriority, sortDueDate); // Refresh tasks
    };

    /**
     * Handles sorting tasks by a specific field.
     * Cycles the sorting order through `null`, `"asc"`, and `"desc"`.
     * @param {"priority" | "duedate"} field - The field to sort by.
     */
    const handleSort = (field: "priority" | "duedate") => {
        if (field === "priority") {
            setSortPriority((prev) => (prev === null ? "asc" : prev === "asc" ? "desc" : null));
        } else if (field === "duedate") {
            setSortDueDate((prev) => (prev === null ? "asc" : prev === "asc" ? "desc" : null));
        }
        fetchAndSetTasks(0, 10, field === "priority" ? sortPriority : null, field === "duedate" ? sortDueDate : null);
    };

    return { 
        fetchAndSetTasks, 
        updateTaskById, 
        deleteTaskById, 
        toggleTaskCompletion, 
        toggleAllTasksCompletion, 
        handleSort, 
        sortPriority, 
        sortDueDate 
    };
};
