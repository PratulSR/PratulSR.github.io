package com.elec5619.gantt.DTO;

import com.google.api.client.util.DateTime;
import lombok.Data;

@Data
public class taskDTO {

    private Integer chart_id;
    private Integer user_id;
    private String task_name;
    private String category;
    private String description;
    private Integer progress;
    private DateTime start;
    private DateTime end;

    public taskDTO(Integer chart_id, Integer user_id, String task_name, String category, String description, Integer progress, String start, String end) {
        this.chart_id = chart_id;
        this.user_id = user_id;
        this.task_name = task_name;
        this.category = category;
        this.description = description;
        this.progress = progress;
        this.start = new DateTime(start);
        this.end = new DateTime(end);
    }

    public Integer getChartId() {
        return chart_id;
    }

    public Integer getUserId() {
        return user_id;
    }

    public String getTaskName() {
        return task_name;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public Integer getProgress() {
        return progress;
    }

    public DateTime getStart() {
        return start;
    }

    public DateTime getEnd() {
        return end;
    }
}
