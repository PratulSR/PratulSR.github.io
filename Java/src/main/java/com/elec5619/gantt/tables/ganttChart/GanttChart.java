package com.elec5619.gantt.tables.ganttChart;

import java.util.ArrayList;
import java.util.List;

import com.elec5619.gantt.tables.task.Task;
import com.elec5619.gantt.tables.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "GanttChart")
public class GanttChart {
    @Id
    @GeneratedValue(generator = "chart_gen", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "chart_gen", sequenceName = "chart_sequence", initialValue = 1, allocationSize = 1)
    @Column(name = "chart_id", length = 10, nullable = false)
    private Integer chart_id;

    @Column(name = "chart_name", length = 50, nullable = false)
    private String chartName;

    @Column(name = "category", length = 50, nullable = false)
    private String category;

    @Column(name = "description")
    private String description;

    @JsonIgnore
    @ManyToMany(mappedBy = "ownedCharts")
    private List<User> userAccessList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "chart")
    private List<Task> associatedTasks = new ArrayList<>();

    public GanttChart() {

    }

    public GanttChart(String chart_name, String description, String category) {
        this.chartName = chart_name;
        this.description = description;
        this.category = category;
    }

    public Integer getChartId() {
        return chart_id;
    }


    public String getChartName() {
        return chartName;
    }

    public void setChartName(String chartName) {
        this.chartName = chartName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<Task> getAssociatedTasks() {
        return associatedTasks;
    }

    public List<User> getUserAccessList() {
        return userAccessList;
    }

    public void addTask(Task newTask) {
        associatedTasks.add(newTask);
    }

    public void addUser(User associatedUser) {
        userAccessList.add(associatedUser);
    }
}
