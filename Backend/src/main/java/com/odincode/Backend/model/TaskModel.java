package com.odincode.Backend.model;

import java.time.LocalDateTime;

/**
 * TaskModel represents the properties of a task.
 * It includes details such as the task's name, priority, due date, creation date,
 * completion status, and timestamps for when the task was created or marked as done.
 */
public class TaskModel {

    private Long id; // Unique identifier for the task
    private String name; // The name of the task (max 120 characters)
    private String dueDate; // Optional due date for the task
    private boolean flag; // Indicates whether the task is done (true) or undone (false)
    private LocalDateTime doneDate; // Timestamp when the task was marked as done
    private String priority; // Priority level of the task (High, Medium, Low)
    private LocalDateTime createDate; // Timestamp when the task was created

    /**
     * Constructor to initialize a TaskModel object with the given parameters.
     *
     * @param id The unique identifier for the task.
     * @param name The name of the task.
     * @param dueDate The optional due date for the task.
     * @param flag The completion status of the task (true for Done, false for Undone).
     * @param doneDate The timestamp when the task was marked as done.
     * @param priority The priority level of the task.
     * @param createDate The timestamp when the task was created.
     */
    public TaskModel(Long id, String name, String dueDate, boolean flag, LocalDateTime doneDate, String priority, LocalDateTime createDate) {
        this.id = id;
        this.name = name;
        this.dueDate = dueDate;
        this.flag = flag;
        this.doneDate = doneDate;
        this.priority = priority;
        this.createDate = createDate;
    }

    /**
     * Constructor to initialize a TaskModel object with the given parameters.
     *
     * @param id The unique identifier for the task.
     * @param name The name of the task.
     * @param priority The priority level of the task.
     * @param createDate The timestamp when the task was created.
     * @param doneDate The timestamp when the task was marked as done.
     * @param dueDate The optional due date for the task.
     * @param flag The completion status of the task (true for Done, false for Undone).
     */
    public TaskModel(Long id, String name, String priority, LocalDateTime createDate, LocalDateTime doneDate, String dueDate, boolean flag) {
        this.id = id;
        this.name = name;
        this.priority = priority;
        this.createDate = createDate;
        this.doneDate = doneDate;
        this.dueDate = dueDate;
        this.flag = flag;
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
    public boolean getFlag() {
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
     * Retrieves the completion status of the task.
     *
     * @return True if the task is done, false otherwise.
     */
    public boolean isFlag() {
        return flag;
    }

    /**
     * Retrieves the timestamp when the task was marked as done.
     *
     * @return The timestamp of task completion.
     */
    public LocalDateTime getDoneDate() {
        return doneDate;
    }

    /**
     * Updates the timestamp when the task was marked as done.
     *
     * @param doneDate The new timestamp for task completion.
     */
    public void setDoneDate(LocalDateTime doneDate) {
        this.doneDate = doneDate;
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
     * Retrieves the timestamp when the task was created.
     *
     * @return The task's creation timestamp.
     */
    public LocalDateTime getCreateDate() {
        return createDate;
    }

    /**
     * Updates the timestamp when the task was created.
     *
     * @param createDate The new creation timestamp for the task.
     */
    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }
}

