package com.odincode.Backend.model;

/**
 * TaskFlag represents the model for the flag property of a task.
 * The flag indicates whether a task is completed (Done) or not (Undone).
 */
public class TaskFlag {
    private boolean flag; // Indicates the task's completion status (true = Done, false = Undone)

    /**
     * Constructor to initialize a TaskFlag object with the given flag status.
     *
     * @param flag The completion status of the task (true for Done, false for Undone).
     */
    public TaskFlag(boolean flag) {
        this.flag = flag;
    }

    /**
     * Retrieves the completion status of the task.
     *
     * @return The flag indicating the task's completion status.
     */
    public boolean isFlag() {
        return flag;
    }

    /**
     * Updates the completion status of the task.
     *
     * @param flag The new completion status of the task.
     */
    public void setFlag(boolean flag) {
        this.flag = flag;
    }
}
