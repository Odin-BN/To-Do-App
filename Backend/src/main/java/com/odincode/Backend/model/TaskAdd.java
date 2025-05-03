package com.odincode.Backend.model;

/**
 * TaskAdd represents the model for tasks that are created or edited.
 * It contains the task's name, priority, and deadline.
 */
public class TaskAdd {
    private String name; // The name of the task
    private String priority; // The priority level of the task (e.g., Low, Medium, High)
    private String deadline; // The deadline for the task in a string format

    /**
     * Constructor to initialize a TaskAdd object with the given parameters.
     *
     * @param name The name of the task.
     * @param priority The priority level of the task.
     * @param deadline The deadline for the task.
     */
    public TaskAdd(String name, String priority, String deadline) {
        this.name = name;
        this.priority = priority;
        this.deadline = deadline;
    }

    /**
     * Retrieves the name of the task.
     *
     * @return The name of the task.
     */
    public String getName() {
        return name;
    }

    /**
     * Updates the name of the task.
     *
     * @param name The new name of the task.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Retrieves the priority level of the task.
     *
     * @return The priority level of the task.
     */
    public String getPriority() {
        return priority;
    }

    /**
     * Updates the priority level of the task.
     *
     * @param priority The new priority level of the task.
     */
    public void setPriority(String priority) {
        this.priority = priority;
    }

    /**
     * Retrieves the deadline of the task.
     *
     * @return The deadline of the task.
     */
    public String getDeadline() {
        return deadline;
    }

    /**
     * Updates the deadline of the task.
     *
     * @param deadline The new deadline of the task.
     */
    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }
}
