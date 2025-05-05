package com.odincode.Backend.repository;

import com.odincode.Backend.model.TaskAdd;
import com.odincode.Backend.model.TaskModel;
import com.odincode.Backend.model.TaskOUT;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class TaskRepositoryTest {

    @InjectMocks
    private TaskRepository taskRepository;

    @Test
    //Tests the function to save a task
    public void shouldSaveTask() {

        TaskAdd taskAdd = new TaskAdd("", "", "");
        taskAdd.setName("Test Task");
        taskAdd.setDeadline("2025-05-16");
        taskAdd.setPriority("High");

        taskRepository.save(taskAdd);
        List<TaskOUT> tasks = taskRepository.findAll();

        assertEquals(1, tasks.size());
        assertEquals("Test Task", tasks.get(0).getName());
    }

    @Test
    //Tests the function to find a task by the id
    public void shouldFindTaskById() {

        TaskAdd task = new TaskAdd("Test Task2", "", "");
        taskRepository.save(task);

        TaskModel foundTask = taskRepository.findById(1L);

        assertEquals("Test Task2", foundTask.getName());
    }

    @Test
    //Tests the function to obtain all the tasks
    public void shouldFindAllTasks() {

        taskRepository.save(new TaskAdd("Test Task3", "", null));
        taskRepository.save(new TaskAdd("Test Task4", "", null));
        taskRepository.save(new TaskAdd("Test Task5", "", null));

        List<TaskOUT> tasks = taskRepository.findAll();

        assertEquals(3, tasks.size());
        assertEquals("Test Task3", taskRepository.findById(1L).getName());
        assertEquals("Test Task4", taskRepository.findById(2L).getName());
        assertEquals("Test Task5", taskRepository.findById(3L).getName());
    }

}
