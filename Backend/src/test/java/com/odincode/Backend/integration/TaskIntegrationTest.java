package com.odincode.Backend.integration;

import com.odincode.Backend.model.TaskAdd;
import com.odincode.Backend.model.TaskModel;
import com.odincode.Backend.model.TaskOUT;
import com.odincode.Backend.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class TaskIntegrationTest {

    @Autowired
    private TaskRepository taskRepository;

    @Test
    void shouldPersistAndRetrieveTask() {
        // Arrange
        TaskAdd task = new TaskAdd("Task A", "High", null);
        taskRepository.save(task);

        // Act
        List<TaskOUT> tasks = taskRepository.findAll();

        // Assert
        assertThat(tasks).hasSize(1);
        assertThat(tasks.get(0).getName()).isEqualTo("Task A");
    }
}
