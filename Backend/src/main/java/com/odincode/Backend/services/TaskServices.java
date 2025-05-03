package com.odincode.Backend.services;

import com.odincode.Backend.model.TaskAdd;
import com.odincode.Backend.model.TaskFlag;
import com.odincode.Backend.model.TaskModel;
import com.odincode.Backend.model.TaskOUT;
import com.odincode.Backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * TaskServices provides the business logic for managing tasks.
 * It includes methods for CRUD operations, filtering tasks, and calculating statistics.
 */
@Service
public class TaskServices {

    @Autowired
    private final TaskRepository taskRepository = new TaskRepository(); // Repository for task persistence

    /**
     * Retrieves a list of tasks filtered by name, priority, and status.
     *
     * @param nameFilter Optional filter for task names.
     * @param priorityFilter Optional filter for task priority levels.
     * @param statusFilter Optional filter for task status (e.g., Done/Undone).
     * @return A list of tasks matching the specified filters.
     */
    public List<TaskOUT> obtainTasks(String nameFilter, String priorityFilter, String statusFilter) {
        List<TaskOUT> tasks = taskRepository.findAll();

        // Filter tasks by name
        if (nameFilter != null && !nameFilter.isEmpty()) {
            tasks = tasks.stream()
                    .filter(task -> task.getName().toLowerCase().contains(nameFilter.toLowerCase()))
                    .toList();
        }

        // Filter tasks by priority
        if (priorityFilter != null && !priorityFilter.equalsIgnoreCase("All")) {
            tasks = tasks.stream()
                    .filter(task -> task.getPriority().equalsIgnoreCase(priorityFilter))
                    .toList();
        }

        // Filter tasks by completion status (flag)
        if (statusFilter != null && !statusFilter.equalsIgnoreCase("All")) {
            boolean isDone = statusFilter.equalsIgnoreCase("Done");
            tasks = tasks.stream()
                    .filter(task -> task.isFlag() == isDone)
                    .toList();
        }

        return tasks;
    }

    /**
     * Saves a new task.
     *
     * @param taskAdd The task details to be saved.
     * @return The saved task object.
     */
    public TaskModel saveTask(TaskAdd taskAdd) {
        return taskRepository.save(taskAdd); // Save a new task
    }

    /**
     * Updates the details of an existing task.
     *
     * @param taskId The ID of the task to be updated.
     * @param updatedTask The updated task details.
     */
    public void updateTask(Long taskId, TaskAdd updatedTask) {
        TaskModel task = taskRepository.findById(taskId);

        if (task != null) {
            if (updatedTask.getName() != null) {
                task.setName(updatedTask.getName());
            }
            if (updatedTask.getPriority() != null) {
                task.setPriority(updatedTask.getPriority());
            }
            task.setDueDate(updatedTask.getDeadline());
        }
    }

    /**
     * Deletes a task by its ID.
     *
     * @param taskId The ID of the task to be deleted.
     */
    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }

    /**
     * Updates the completion status (flag) of a task.
     *
     * @param taskId The ID of the task to be updated.
     * @param taskFlag The new flag status (true for Done, false for Undone).
     */
    public void updateTaskFlag(Long taskId, TaskFlag taskFlag) {
        TaskModel task = taskRepository.findById(taskId);
        task.setFlag(taskFlag.isFlag());

        // Set the done date if the task is marked as done, otherwise clear it
        if (taskFlag.isFlag()) {
            task.setDoneDate(LocalDateTime.now());
        } else {
            task.setDoneDate(null);
        }
    }

    /**
     * Calculates task-related averages, such as total completion time and
     * average completion times by priority levels.
     *
     * @return A map containing the calculated averages.
     */
    public Map<String, String> calculateAverages() {
        List<TaskModel> completedTasks = taskRepository.findByFlag();

        // Return "N/A" if no completed tasks are found
        if (completedTasks.isEmpty()) {
            return Map.of(
                    "total", "N/A",
                    "low", "N/A",
                    "medium", "N/A",
                    "high", "N/A"
            );
        }

        return Map.of(
                "total", formatDuration(getAverageCompletionTime(completedTasks)),
                "low", formatDuration(getAverageCompletionTime(filterByPriority(completedTasks, "Low"))),
                "medium", formatDuration(getAverageCompletionTime(filterByPriority(completedTasks, "Medium"))),
                "high", formatDuration(getAverageCompletionTime(filterByPriority(completedTasks, "High")))
        );
    }

    /**
     * Filters the list of tasks by priority.
     *
     * @param tasks The list of tasks to filter.
     * @param priority The priority level to filter by.
     * @return A list of tasks matching the specified priority.
     */
    private List<TaskModel> filterByPriority(List<TaskModel> tasks, String priority) {
        return tasks.stream()
                .filter(task -> priority.equals(task.getPriority()))
                .collect(Collectors.toList());
    }

    /**
     * Calculates the average completion time for a list of tasks.
     *
     * @param tasks The list of tasks to calculate the average for.
     * @return The average completion time as a Duration.
     */
    private Duration getAverageCompletionTime(List<TaskModel> tasks) {
        if (tasks.isEmpty()) {
            return Duration.ZERO;
        }
        long totalSeconds = tasks.stream()
                .mapToLong(task -> Duration.between(task.getCreateDate(), task.getDoneDate()).getSeconds())
                .sum();
        return Duration.ofSeconds(totalSeconds / tasks.size());
    }

    /**
     * Formats a Duration object into a human-readable string.
     *
     * @param duration The duration to format.
     * @return A string representation of the duration (e.g., "X days, Y hours, Z minutes").
     */
    private String formatDuration(Duration duration) {
        long days = duration.toDays();
        long hours = duration.toHours() % 24;
        long minutes = duration.toMinutes() % 60;
        return String.format("%d days, %d hours, %d minutes", days, hours, minutes);
    }
}
