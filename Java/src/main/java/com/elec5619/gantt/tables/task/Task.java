package com.elec5619.gantt.tables.task;

import java.util.ArrayList;
import java.util.List;

import com.elec5619.gantt.tables.ganttChart.GanttChart;
import com.elec5619.gantt.tables.user.User;
import com.google.api.client.util.DateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "Task")
public class Task {
    @Id
    @GeneratedValue(generator = "task_gen", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "task_gen", sequenceName = "task_sequence", initialValue = 1, allocationSize = 1)
    @Column(name = "task_id")
    private Integer task_id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "chart_id", referencedColumnName = "chart_id")
    private GanttChart chart;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "task_user", joinColumns = @JoinColumn(name = "task_id"), inverseJoinColumns = @JoinColumn(name = "user_email"))
    private List<User> associatedUsers = new ArrayList<>();

    // when working with these, persist the entities to the repository first before
    // creating associations.
    @ManyToOne
    private Task dependent;
    @OneToMany(mappedBy = "dependent")
    private List<Task> dependencies = new ArrayList<>();

    @Column(name = "task_name")
    private String name;

    public Task() {

    }

    public Task(String name, String category, String description, Integer priority, DateTime start_time, DateTime end_time) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.priority = priority;
        this.start_time = start_time;
        this.end_time = end_time;
    }

    public Integer getId() {
        return task_id;
    }

    public GanttChart getChart() {
        return chart;
    }

    public void setChart(GanttChart chart) {
        this.chart = chart;
    }

    public List<User> getAssociatedUsers() {
        return associatedUsers;
    }

    public void setAssociatedUsers(List<User> associatedUsers) {
        this.associatedUsers = associatedUsers;
    }

    public Task getDependent() {
        return dependent;
    }

    public void setDependent(Task dependent) {
        this.dependent = dependent;
    }

    public List<Task> getDependencies() {
        return dependencies;
    }

    public void setDependencies(List<Task> dependencies) {
        this.dependencies = dependencies;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public Integer getPriority() {
        return priority;
    }

    public DateTime getStart_time() {
        return start_time;
    }

    public DateTime getEnd_time() {
        return end_time;
    }

    @Column(name = "task_category")
    private String category;

    @Column(name = "task_description")
    private String description;

    //change column name through JPA annotation because i dont want to redo the entire schema
    @Column(name = "task_progress")
    private Integer priority;

    @Column(name = "task_start_time")
    private DateTime start_time;

    @Column(name = "task_end_time")
    private DateTime end_time;


    public void addUser(User associatedUser) {
        associatedUsers.add(associatedUser);
    }
}
