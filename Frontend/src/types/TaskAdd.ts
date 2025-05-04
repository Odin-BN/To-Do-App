/**
 * TaskAdd Interface
 * 
 * Represents the structure of the JSON body expected by the backend for updating or adding a task.
 * - `name`: The name of the task.
 * - `priority`: The priority level of the task (e.g., "Low", "Medium", "High").
 * - `deadline`: The deadline for the task in a string format.
 */
export interface TaskAdd {
    name: string; // The name of the task.
    priority: string; // The priority level of the task.
    deadline: string | null; // The deadline for the task (nullable).
}
