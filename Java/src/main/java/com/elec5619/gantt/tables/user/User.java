package com.elec5619.gantt.tables.user;

import java.util.ArrayList;
import java.util.List;

import com.elec5619.gantt.tables.credentials.Credentials;
import com.elec5619.gantt.tables.ganttChart.GanttChart;
import com.elec5619.gantt.tables.task.Task;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;

@Entity // This tells Hibernate to make a table out of this class
@Transactional
@Data
@Table(name = "User")
public class User {

    @Id
    @GeneratedValue(generator = "user_gen", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "user_gen", sequenceName = "user_sequence", initialValue = 1, allocationSize = 1)
    @Column(name = "user_id")
    private Integer user_id;

    @Column(name = "user_name")
    private String name;

    @Column(name = "user_email")
    private String email;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_credentials_id")
    private Credentials credential;


    //JSONIgnore means that if you fetch the user json, the list wont be visible.
    //If you fetch Chart or Task, you will see an array of Users still. Move annotations around to switch behaviour

    @JsonIgnoreProperties("userAccessList")
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_chart", joinColumns = @JoinColumn(name = "user_email"), inverseJoinColumns = @JoinColumn(name = "chart_id"))
    private List<GanttChart> ownedCharts = new ArrayList<>();

    @JsonIgnoreProperties("associatedUsers")
    @ManyToMany(mappedBy = "associatedUsers")
    private List<Task> associatedTasks = new ArrayList<>();

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public User() {
    }

    public Integer getId() {
        return user_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<GanttChart> getOwnedCharts() {
        return ownedCharts;
    }

    public List<Task> getAssociatedTasks() {
        return associatedTasks;
    }

    public void addTask(Task newTask) {
        associatedTasks.add(newTask);
    }

    public void addChart(GanttChart newChart) {
        ownedCharts.add(newChart);
    }
}