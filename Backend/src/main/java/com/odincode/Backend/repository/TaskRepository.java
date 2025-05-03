package com.odincode.Backend.repository;

import com.odincode.Backend.model.TaskAdd;
import com.odincode.Backend.model.TaskModel;
import com.odincode.Backend.model.TaskOUT;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

/**
 * TaskRepository simulates a database for storing and managing tasks in memory.
 * It provides methods for CRUD operations and task retrieval.
 */
@Repository
public class TaskRepository {

    private final List<TaskModel> taskModels = new ArrayList<>(); // In-memory storage for tasks
    private final AtomicLong idGenerator = new AtomicLong(1); // Generates unique IDs for tasks

    /**
     * Saves a new task to the repository.
     *
     * @param taskAdd The task details to be saved.
     * @return The saved TaskModel object.
     */
    public TaskModel save(TaskAdd taskAdd) {
        long generatedId = idGenerator.getAndIncrement(); // Generate a unique ID
        TaskModel newTaskModel = new TaskModel(
                generatedId,
                taskAdd.getName(),
                taskAdd.getDeadline(),
                false, // Default flag to false (Undone)
                null, // No done date initially
                taskAdd.getPriority(),
                LocalDateTime.now() // Set the creation timestamp
        );
        taskModels.add(newTaskModel); // Add the task to the in-memory list
        return newTaskModel;
    }

    /**
     * Retrieves all tasks and maps them to TaskOUT objects for front-end display.
     * Includes logic to determine the row color based on the task's due date.
     *
     * @return A list of TaskOUT objects representing all tasks.
     */
    public List<TaskOUT> findAll() {
        List<TaskOUT> taskOUTs = new ArrayList<>();
        String rowColor;

        for (TaskModel task : taskModels) {
            // Determine the row color based on the due date
            if (task.getDueDate() == null) {
                rowColor = "white"; // Default color for tasks without a due date
            } else {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate deadline = LocalDate.parse(task.getDueDate(), formatter);
                long daysUntilDeadline = ChronoUnit.DAYS.between(LocalDate.now(), deadline);

                if (daysUntilDeadline < 8) {
                    rowColor = "red"; // Urgent tasks
                } else if (daysUntilDeadline < 15) {
                    rowColor = "yellow"; // Approaching deadline
                } else {
                    rowColor = "green"; // Plenty of time remaining
                }
            }

            // Map TaskModel to TaskOUT
            taskOUTs.add(new TaskOUT(
                    task.getId(),
                    task.getName(),
                    task.getDueDate(),
                    task.getFlag(),
                    task.getPriority(),
                    rowColor
            ));
        }
        return taskOUTs;
    }

    /**
     * Finds a task by its unique ID.
     *
     * @param id The ID of the task to find.
     * @return The TaskModel object if found, or null if not found.
     */
    public TaskModel findById(Long id) {
        return taskModels.stream()
                .filter(task -> task.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    /**
     * Deletes a task from the repository by its ID.
     *
     * @param id The ID of the task to delete.
     */
    public void deleteById(Long id) {
        taskModels.removeIf(task -> task.getId().equals(id));
    }

    /**
     * Retrieves all tasks that are marked as completed (flag = true).
     *
     * @return A list of completed TaskModel objects.
     */
    public List<TaskModel> findByFlag() {
        List<TaskModel> completedTasks = new ArrayList<>();

        for (TaskModel task : taskModels) {
            if (task.getFlag()) {
                // Create a new TaskModel object to avoid modifying the original
                completedTasks.add(new TaskModel(
                        task.getId(),
                        task.getName(),
                        task.getDueDate(),
                        task.getFlag(),
                        task.getDoneDate(),
                        task.getPriority(),
                        task.getCreateDate()
                ));
            }
        }
        return completedTasks;
    }
}


