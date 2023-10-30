package com.elec5619.gantt.DTO;

import lombok.Data;

@Data
public class frappeDTO {

    private String id;
    private String name;
    private String start;
    private String end;
    private Integer progress;

    public frappeDTO(String id, String name, String start, String end, Integer progress) {
        this.id = id;
        this.name = name;
        this.start = start;
        this.end = end;
        this.progress = progress;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }
}
