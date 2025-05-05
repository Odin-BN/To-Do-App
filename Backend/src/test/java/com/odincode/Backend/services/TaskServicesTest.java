package com.odincode.Backend.services;

import com.odincode.Backend.model.TaskAdd;
import com.odincode.Backend.model.TaskFlag;
import com.odincode.Backend.model.TaskModel;
import com.odincode.Backend.model.TaskOUT;
import com.odincode.Backend.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServicesTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServices taskServices;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldReturnFilteredTasksByName() {
        // Arrange
        TaskAdd task1 = new TaskAdd("Task A", "High", "2025-12-30");
        TaskAdd task2 = new TaskAdd("Task B", "Medium", "2025-12-02");
        taskRepository.save(task1);
        taskRepository.save(task2);
        //when(taskRepository.findAll()).thenReturn(List.of(task1, task2));

        // Act
        List<TaskOUT> result = taskServices.obtainTasks("Task A", "All", "All", 0, 10, null, null);

        TaskOUT task3 = new TaskOUT(1L, "Task A", "High", "2025-12-30", false);
        // Assert
        assertThat(result).hasSize(1).contains(task3);

        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void shouldSaveNewTask() {
        // Arrange
        TaskAdd taskAdd = new TaskAdd("New Task", "Low", "2025-12-31");
        TaskModel savedTask = new TaskModel(1L, "New Task", "Low", LocalDateTime.now(), null, null, false);
        when(taskRepository.save(taskAdd)).thenReturn(savedTask);

        // Act
        TaskModel result = taskServices.saveTask(taskAdd);

        // Assert
        assertThat(result).isEqualTo(savedTask);
        verify(taskRepository, times(1)).save(taskAdd);
    }

    @Test
    void shouldUpdateTaskFlagToDone() {
        // Arrange
        TaskModel task = new TaskModel(1L, "Task A", "High", LocalDateTime.now(), null, null, false);
        when(taskRepository.findById(1L)).thenReturn(task);

        // Act
        taskServices.updateTaskFlag(1L, new TaskFlag(true));

        // Assert
        assertThat(task.isFlag()).isTrue();
        assertThat(task.getDoneDate()).isNotNull();
        verify(taskRepository, times(1)).findById(1L);
    }

    @Test
    void shouldCalculateAverageCompletionTime() {
        // Arrange
        TaskModel task1 = new TaskModel(1L, "Task A", "High", LocalDateTime.now().minusDays(2), LocalDateTime.now(), null, true);
        TaskModel task2 = new TaskModel(2L, "Task B", "Low", LocalDateTime.now().minusDays(1), LocalDateTime.now(), null, true);
        when(taskRepository.findByFlag()).thenReturn(List.of(task1, task2)); // Mock the repository to return completed tasks

        // Act
        Map<String, String> averages = taskServices.calculateAverages();

        // Assert
        assertThat(averages).containsKeys("total", "low", "medium", "high");
        assertThat(averages.get("total")).isNotNull();
        verify(taskRepository, times(1)).findByFlag(); // Verify that the repository method was called
    }
}
