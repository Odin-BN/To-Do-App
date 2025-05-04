import { Task } from "../types/Task";
import { TaskAdd } from "../types/TaskAdd";

/**
 * Fetches tasks from the backend API based on search criteria.
 * @param page - The current page number (0-based).
 * @param size - The number of tasks per page.
 * @param sortPriority - Sorting order for priority ("asc" or "desc").
 * @param sortDueDate - Sorting order for due date ("asc" or "desc").
 * @param filters - Additional filters for name, priority, and status.
 * @returns A promise resolving to an array of tasks.
 */
export const fetchTasks = async (
    page: number,
    size: number,
    sortPriority: string | null,
    sortDueDate: string | null,
    filters: { name?: string; priority?: string; status?: string }
): Promise<Task[]> => {
    let searchUrl = `http://localhost:9090/todos?page=${page}&size=${size}`;

    if (filters.name) searchUrl += `&nameFilter=${encodeURIComponent(filters.name)}`;
    if (filters.priority && filters.priority !== "All") searchUrl += `&priorityFilter=${encodeURIComponent(filters.priority)}`;
    if (filters.status && filters.status !== "All") searchUrl += `&statusFilter=${encodeURIComponent(filters.status)}`;
    if (sortPriority) searchUrl += `&sortPriority=${sortPriority}`;
    if (sortDueDate) searchUrl += `&sortDueDate=${sortDueDate}`;

    const response = await fetch(searchUrl, { method: "GET", headers: { "Content-Type": "application/json" } });
    if (!response.ok) throw new Error("Error fetching tasks");
    return response.json();
};

/**
 * Updates a task by ID.
 * @param taskId - The ID of the task to update.
 * @param updatedTask - The updated task data in the `TaskAdd` format.
 */
export const updateTask = async (taskId: number, updatedTask: TaskAdd): Promise<void> => {
    const response = await fetch(`http://localhost:9090/todos/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
    });
    if (!response.ok) throw new Error("Error updating task");
};

/**
 * Deletes a task by ID.
 * @param taskId - The ID of the task to delete.
 */
export const deleteTask = async (taskId: number): Promise<void> => {
    const response = await fetch(`http://localhost:9090/todos/${taskId}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error deleting task");
};

/**
 * Toggles the completion status of a task.
 * @param taskId - The ID of the task to update.
 * @param flag - The new completion status.
 */
export const toggleTaskFlag = async (taskId: number, flag: boolean): Promise<void> => {
    const response = await fetch(`http://localhost:9090/todos/${taskId}/flag`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flag }),
    });
    if (!response.ok) throw new Error("Error toggling task flag");
};

/**
 * Toggles the completion status of all tasks on the current page.
 * @param tasks - The list of tasks on the current page.
 * @param areAllTasksCompleted - A boolean indicating if all tasks are currently completed.
 */
export const toggleAllTaskFlags = async (tasks: Task[], areAllTasksCompleted: boolean): Promise<void> => {
    const tasksToUpdate = tasks.filter(task => task.flag === areAllTasksCompleted);

    await Promise.all(
        tasksToUpdate.map(task =>
            toggleTaskFlag(task.id, !areAllTasksCompleted)
        )
    );
};
