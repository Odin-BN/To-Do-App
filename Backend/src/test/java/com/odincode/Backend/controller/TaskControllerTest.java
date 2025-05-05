package com.odincode.Backend.controller;

import com.odincode.Backend.model.TaskAdd;
import com.odincode.Backend.model.TaskOUT;
import com.odincode.Backend.services.TaskServices;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskServices taskServices;

    

    @Test
    void shouldSaveNewTask() throws Exception {
        // Arrange
        //TaskAdd taskAdd = new TaskAdd("New Task", "Low", "2025-12-31");
        when(taskServices.saveTask(Mockito.any(TaskAdd.class))).thenReturn(null);

        // Act & Assert
        mockMvc.perform(post("/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"New Task\",\"priority\":\"Low\",\"deadline\":\"2025-12-31\"}"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldReturnTasksWithFilters() throws Exception {
        // Arrange
        TaskOUT task = new TaskOUT(1L, "Task A", "High", "2025-12-01", false);
        taskServices.saveTask(new TaskAdd("Task A", "High", "2025-12-01"));
        when(taskServices.obtainTasks(Mockito.anyString(), Mockito.anyString(), Mockito.anyString(), Mockito.anyInt(), Mockito.anyInt(), Mockito.anyString(), Mockito.anyString()))
                .thenReturn(List.of(task));

        // Act & Assert
        mockMvc.perform(get("/todos")
                        .param("nameFilter", "Task A")
                        .param("priorityFilter", "High")
                        .param("statusFilter", "Undone"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Task A"))
                .andExpect(jsonPath("$[0].priority").value("High"))
                .andExpect(jsonPath("$[0].dueDate").value("2025-12-01"))
                .andExpect(jsonPath("$[0].flag").value(false));
    }
}
