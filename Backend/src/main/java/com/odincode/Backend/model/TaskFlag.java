package com.odincode.Backend.model;

//Model with the property of flag (true/false -> Done/Undone(

public class TaskFlag {
    //private Long id;
    private boolean flag;

    /*public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }*/

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public TaskFlag(Long id, boolean flag) {

        //this.id = id;
        this.flag = flag;
    }



}
