package com.odincode.Backend.model;

/**
 * TaskOUT represents the model for tasks sent to the front-end for display.
 * It includes properties such as the task's name, priority, due date, completion status,
 * and additional display-related attributes like row color.
 */
public class TaskOUT {
    private Long id; // Unique identifier for the task
    private String name; // The name of the task (max 120 characters)
    private String dueDate; // Optional due date for the task
    private boolean flag; // Indicates whether the task is done (true) or undone (false)
    private String priority; // Priority level of the task (High, Medium, Low)
    private String rowColor; // Color used to visually differentiate rows in the front-end

    /**
     * Constructor to initialize a TaskOUT object with the given parameters.
     *
     * @param id The unique identifier for the task.
     * @param name The name of the task.
     * @param dueDate The optional due date for the task.
     * @param flag The completion status of the task (true for Done, false for Undone).
     * @param priority The priority level of the task.
     * @param rowColor The row color for front-end display.
     */
    public TaskOUT(Long id, String name, String dueDate, boolean flag, String priority, String rowColor) {
        this.id = id;
        this.name = name;
        this.dueDate = dueDate;
        this.flag = flag;
        this.priority = priority;
        this.rowColor = rowColor;
    }

    /**
     * Retrieves the unique identifier of the task.
     *
     * @return The task's ID.
     */
    public Long getId() {
        return id;
    }

    /**
     * Updates the unique identifier of the task.
     *
     * @param id The new ID for the task.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Retrieves the name of the task.
     *
     * @return The task's name.
     */
    public String getName() {
        return name;
    }

    /**
     * Updates the name of the task.
     *
     * @param name The new name for the task.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Retrieves the due date of the task.
     *
     * @return The task's due date.
     */
    public String getDueDate() {
        return dueDate;
    }

    /**
     * Updates the due date of the task.
     *
     * @param dueDate The new due date for the task.
     */
    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    /**
     * Retrieves the completion status of the task.
     *
     * @return True if the task is done, false otherwise.
     */
    public boolean isFlag() {
        return flag;
    }

    /**
     * Updates the completion status of the task.
     *
     * @param flag The new completion status (true for Done, false for Undone).
     */
    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    /**
     * Retrieves the priority level of the task.
     *
     * @return The task's priority level.
     */
    public String getPriority() {
        return priority;
    }

    /**
     * Updates the priority level of the task.
     *
     * @param priority The new priority level for the task.
     */
    public void setPriority(String priority) {
        this.priority = priority;
    }

    /**
     * Retrieves the row color for front-end display.
     *
     * @return The row color for the task.
     */
    public String getRowColor() {
        return rowColor;
    }

    /**
     * Updates the row color for front-end display.
     *
     * @param rowColor The new row color for the task.
     */
    public void setRowColor(String rowColor) {
        this.rowColor = rowColor;
    }
}
