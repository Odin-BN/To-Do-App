package com.odincode.Backend.model;

//Model of the properties of the tasks that are being sent to the front-end to display them on the table

public class TaskOUT {
    private Long id;
    private String name;  //Limit to max 120 chars.
    private String DueDate; //Optional
    private boolean flag; //Done/Undone flag
    private String priority; //High, Medium and Low.
    private String rowColor;


    public TaskOUT(Long id, String name, String DueDate, boolean flag, String priority, String rowColor){

        this.name = name;
        this.priority = priority;
        this.DueDate = DueDate;
        this.id = id;
        this.flag = flag;
        this.rowColor = rowColor;
    }


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

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getRowColor() {
        return rowColor;
    }

    public void setRowColor(String rowColor) {
        this.rowColor = rowColor;
    }

}
