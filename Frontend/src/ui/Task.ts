/**
 * Task Interface
 * 
 * Represents a task in the to-do application with the following properties:
 * - `id`: A unique identifier for the task.
 * - `name`: The name or title of the task.
 * - `dueDate`: The due date for the task, represented as a string.
 * - `flag`: A boolean indicating whether the task is completed (true) or not (false).
 * - `priority`: The priority level of the task (e.g., "High", "Medium", "Low").
 * - `rowColor`: The background color for the task row in the UI, used for visual distinction.
 */
export interface Task {
    id: number; // Unique identifier for the task.
    name: string; // Name or title of the task.
    dueDate: string; // Due date of the task in string format.
    flag: boolean; // Completion status of the task.
    priority: string; // Priority level of the task.
    rowColor: string; // Background color for the task row in the UI.
}