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
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * TaskServices provides the business logic for managing tasks.
 * It includes methods for CRUD operations, filtering, sorting, pagination, and calculating statistics.
 */
@Service
public class TaskServices {

    @Autowired
    private final TaskRepository taskRepository = new TaskRepository(); // Repository for task persistence

    /**
     * Retrieves a list of tasks filtered by name, priority, and status, with pagination and sorting.
     *
     * @param nameFilter Optional filter for task names.
     * @param priorityFilter Optional filter for task priority levels.
     * @param statusFilter Optional filter for task status (e.g., Done/Undone).
     * @param page The page number for pagination (0-based index).
     * @param size The number of tasks per page.
     * @param sortPriority Sorting order for priority (asc, desc, or null).
     * @param sortDueDate Sorting order for due date (asc, desc, or null).
     * @return A paginated and sorted list of tasks matching the specified filters.
     */
    public List<TaskOUT> obtainTasks(String nameFilter, String priorityFilter, String statusFilter, int page, int size, String sortPriority, String sortDueDate) {
        List<TaskOUT> tasks = taskRepository.findAll();

        // Apply filtering
        if (nameFilter != null && !nameFilter.isEmpty()) {
            tasks = tasks.stream()
                    .filter(task -> task.getName().toLowerCase().contains(nameFilter.toLowerCase()))
                    .toList();
        }
        if (priorityFilter != null && !priorityFilter.equalsIgnoreCase("All")) {
            tasks = tasks.stream()
                    .filter(task -> task.getPriority().equalsIgnoreCase(priorityFilter))
                    .toList();
        }
        if (statusFilter != null && !statusFilter.equalsIgnoreCase("All")) {
            boolean isDone = statusFilter.equalsIgnoreCase("Done");
            tasks = tasks.stream()
                    .filter(task -> task.isFlag() == isDone)
                    .toList();
        }

        // Apply sorting
        if (sortPriority != null) {
            // Define a custom priority order: Low < Medium < High
            Comparator<TaskOUT> priorityComparator = Comparator.comparingInt(task -> {
                switch (task.getPriority().toLowerCase()) {
                    case "low": return 1;
                    case "medium": return 2;
                    case "high": return 3;
                    default: return Integer.MAX_VALUE; // Handle unexpected values
                }
            });

            // Apply ascending or descending order based on the sortPriority parameter
            tasks = sortPriority.equalsIgnoreCase("desc")
                    ? tasks.stream().sorted(priorityComparator.reversed()).toList()
                    : tasks.stream().sorted(priorityComparator).toList();
        }

        if (sortDueDate != null) {
            Comparator<TaskOUT> dueDateComparator = Comparator.comparing(TaskOUT::getDueDate, Comparator.nullsLast(String::compareTo));
            tasks = sortDueDate.equalsIgnoreCase("desc") ? tasks.stream().sorted(dueDateComparator.reversed()).toList() : tasks.stream().sorted(dueDateComparator).toList();
        }

        // Apply pagination
        int fromIndex = page * size;
        int toIndex = Math.min(fromIndex + size, tasks.size());
        if (fromIndex > tasks.size()) {
            return List.of(); // Return an empty list if the page is out of bounds
        }
        return tasks.subList(fromIndex, toIndex);
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

