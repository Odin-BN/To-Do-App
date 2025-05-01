package com.odincode.Backend.services;
//GenAi update

//import com.odincode.TasksManagement.model.TaskAdd;
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


@Service
public class TaskServices {
    @Autowired
    private final TaskRepository taskRepository = new TaskRepository();

    //It obtains the list of tasks filter bye name, priority, and status
    public List<TaskOUT> obtainTasks(String NameSearch, String PrioritySearch, String FlagSearch){
        List<TaskOUT> tasks = taskRepository.findAll();

        //It filters by name
        if (NameSearch != null && !NameSearch.isEmpty()){
            tasks = tasks.stream()
                    .filter(task -> task.getName().toLowerCase().contains(NameSearch.toLowerCase()))
                    .toList();
        }

        //It filters by priority
        if (PrioritySearch != null && !PrioritySearch.equalsIgnoreCase("All")) {
            tasks = tasks.stream()
                    .filter(task -> task.getPriority().equalsIgnoreCase(PrioritySearch))
                    .toList();
        }

        //It filters by flag of done/undone
        if (FlagSearch != null && !FlagSearch.equalsIgnoreCase("All")) {
            boolean isDone = FlagSearch.equalsIgnoreCase("Done"); //revisar esta linea para revisar el status
            tasks = tasks.stream()
                    .filter(task -> task.isFlag() == isDone)
                    .toList();
        }

        return tasks;
    }

    //Saves a task
    public TaskModel saveTask(TaskAdd taskAdd){
        //TaskModel newTask = new TaskModel(null, name, DueDate, flag, DoneDate, priority, CreateDate);
        return taskRepository.save(taskAdd); //Guarda una nueva task
    }

    //It updates the name, priority and due date of a task define on the edit modal
    public void updateTask(Long id, TaskAdd updatedTask) {
        TaskModel task = taskRepository.findById(id);

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

    //It deletes a task through the id of the task related to the remove button click
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    //It changes the state of a task (Done/Undone) when the checkbox is click
    public void updateTaskFlag(Long id, TaskFlag taskFlag) {
        TaskModel task = taskRepository.findById(id);
        task.setFlag(taskFlag.isFlag());

        if (taskFlag.isFlag()) {
            task.setDoneDate(LocalDateTime.now());
        } else {
            task.setDoneDate(null);
        }
    }

    //Calculates the averages to display (total, low, medium and high)
    public Map<String, String> calculateAverages() {
        List<TaskModel> completedTasks = taskRepository.findByFlag();

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

    //It filters the list of tasks by priority for the averages per priority
    private List<TaskModel> filterByPriority(List<TaskModel> tasks, String priority) {
        return tasks.stream()
                .filter(task -> priority.equals(task.getPriority()))
                .collect(Collectors.toList());
    }

    //Gets the average time completion of the tasks by priority, using the built-in Duration.between of the two date of type LocalDateTime
    private Duration getAverageCompletionTime (List<TaskModel> tasks) {
        if (tasks.isEmpty()) {
            return Duration.ZERO;
        }
        long totalSeconds = tasks.stream()
                .mapToLong(task -> Duration.between(task.getCreateDate(), task.getDoneDate()).getSeconds())
                .sum();
        return Duration.ofSeconds(totalSeconds / tasks.size());
    }

    //Transforms the result in string to send it back to the front-end without problems
    private String formatDuration(Duration duration) {
        long days = duration.toDays();
        long hours = duration.toHours() % 24;
        long minutes = duration.toMinutes() % 60;
        return String.format("%d days, %d hours, %d minutes", days, hours, minutes);
    }

}
