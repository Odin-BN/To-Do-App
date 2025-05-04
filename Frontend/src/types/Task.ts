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
    id: number;
    name: string;
    dueDate: string;
    flag: boolean;
    priority: string;
    rowColor: string;
}
