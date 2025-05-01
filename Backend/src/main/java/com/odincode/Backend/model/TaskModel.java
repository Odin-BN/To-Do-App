package com.odincode.Backend.model;

import java.time.LocalDateTime;

//Model for the properties of the tasks

public class TaskModel {

    private Long id;

    private String name;  //Limit to max 120 chars.
    private String DueDate; //Optional
    private boolean flag; //Done/Undone flag
    private LocalDateTime DoneDate; //When the "to do" is marked as done this date is set.
    private String priority; //High, Medium and Low.
    private LocalDateTime CreateDate; //The date the task was created

    // Constructor
    public TaskModel(Long id, String name, String DueDate, boolean flag, LocalDateTime DoneDate, String priority, LocalDateTime CreateDate){
        this.id = id;
        this.name = name;
        this.DueDate = DueDate;
        this.flag = flag;
        this.DoneDate = DoneDate;
        this.priority = priority;
        this.CreateDate = CreateDate;
    }


    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDueDate() {
        return DueDate;
    }

    public void setDueDate(String dueDate) {
        DueDate = dueDate;
    }

    public boolean getFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public LocalDateTime getDoneDate() {
        return DoneDate;
    }

    public void setDoneDate(LocalDateTime doneDate) {
        DoneDate = doneDate;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public LocalDateTime getCreateDate() {
        return CreateDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        CreateDate = createDate;
    }
}

