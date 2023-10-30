package com.elec5619.gantt.DTO;

import lombok.Data;

@Data
public class ganttDTO {
    private Integer user_id;
    private String chart_name;
    private String description;
    private String category;

    public ganttDTO(Integer user_id, String chart_name, String description, String category) {
        this.user_id = user_id;
        this.chart_name = chart_name;
        this.description = description;
        this.category = category;
    }

    public Integer getUserId() {
        return user_id;
    }

    public String getChartName() {
        return chart_name;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }


}
