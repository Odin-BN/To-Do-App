package com.odincode.Backend.model;

//Model for the tasks that are created or edit

public class TaskAdd {
    private String name;
    private String priority;
    private String deadline;


    public TaskAdd(String name, String priority, String deadline){

        this.name = name;
        this.priority = priority;
        this.deadline = deadline;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }






}
