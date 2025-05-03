package com.odincode.Backend.controller;

import com.odincode.Backend.model.TaskModel;
import com.odincode.Backend.model.TaskOUT;
import com.odincode.Backend.model.TaskFlag;
import com.odincode.Backend.services.TaskServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.odincode.Backend.model.TaskAdd;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * TaskController handles HTTP requests for managing tasks.
 * It provides endpoints for CRUD operations and task-related statistics.
 */
@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/todos")
public class TaskController {

    @Autowired
    TaskServices taskServices; // Service layer for task operations

    /**
     * Retrieves a list of tasks filtered by name, priority, and status.
     *
     * @param nameFilter Optional filter for task names.
     * @param priorityFilter Optional filter for task priority levels.
     * @param statusFilter Optional filter for task status (e.g., Done/Undone).
     * @return A list of tasks matching the specified filters.
     */
    @GetMapping()
    public List<TaskOUT> obtainTasks(
            @RequestParam(required = false) String nameFilter,
            @RequestParam(required = false) String priorityFilter,
            @RequestParam(required = false) String statusFilter
    ) {
        // Log the received filter parameters for debugging
        System.out.println("Received parameters - NameFilter: " + nameFilter + 
                           ", PriorityFilter: " + priorityFilter + 
                           ", StatusFilter: " + statusFilter);
        return taskServices.obtainTasks(nameFilter, priorityFilter, statusFilter);
    }

    /**
     * Saves a new task.
     *
     * @param newTask The task details to be saved.
     * @return The saved task object.
     */
    @PostMapping()
    public TaskModel saveTask(@RequestBody TaskAdd newTask) {
        return this.taskServices.saveTask(newTask);
    }

    /**
     * Updates the details of an existing task.
     *
     * @param taskId The ID of the task to be updated.
     * @param updatedTask The updated task details.
     * @return A ResponseEntity indicating the operation's success.
     */
    @PutMapping("/{taskId}")
    public ResponseEntity<Void> updateTask(@PathVariable Long taskId, @RequestBody TaskAdd updatedTask) {
        // If the deadline is empty, set it to null to avoid invalid data
        if (updatedTask == null || updatedTask.getDeadline().isEmpty()) {
            updatedTask.setDeadline(null);
        }
        taskServices.updateTask(taskId, updatedTask);
        return ResponseEntity.ok().build();
    }

    /**
     * Deletes a task by its ID.
     *
     * @param taskId The ID of the task to be deleted.
     * @return A ResponseEntity indicating the operation's success.
     */
    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        taskServices.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Updates the completion status (flag) of a task.
     *
     * @param taskId The ID of the task to be updated.
     * @param taskFlag The new flag status (e.g., Done/Undone).
     * @return A ResponseEntity indicating the operation's success.
     */
    @PutMapping("/{taskId}/flag")
    public ResponseEntity<Void> updateTaskFlag(@PathVariable("taskId") Long taskId, @RequestBody TaskFlag taskFlag) {
        taskServices.updateTaskFlag(taskId, taskFlag);
        return ResponseEntity.ok().build();
    }

    /**
     * Calculates and retrieves task-related averages, such as total tasks
     * and counts of tasks by priority levels (low, medium, high).
     *
     * @return A map containing the calculated averages.
     */
    @GetMapping("/averages")
    public ResponseEntity<Map<String, String>> getAverages() {
        return ResponseEntity.ok(taskServices.calculateAverages());
    }
}