package com.elec5619.gantt.services;

import com.elec5619.gantt.DTO.taskDTO;
import com.elec5619.gantt.tables.ganttChart.GanttChart;
import com.elec5619.gantt.tables.ganttChart.GanttChartRepository;
import com.elec5619.gantt.tables.task.Task;
import com.elec5619.gantt.tables.task.TaskRepository;
import com.elec5619.gantt.tables.user.User;
import com.elec5619.gantt.tables.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private GanttChartRepository ganttChartRepository;

    public TaskService() {

    }

    public Iterable<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public void addTask(taskDTO taskDetails) {
        Task newTask = new Task(taskDetails.getTaskName(), taskDetails.getCategory(), taskDetails.getDescription(), taskDetails.getProgress(), taskDetails.getStart(), taskDetails.getEnd());
        User associatedUser = userRepository.findById(taskDetails.getUserId()).get();
        GanttChart associatedChart = ganttChartRepository.findById(taskDetails.getChartId()).get();

        newTask.addUser(associatedUser);
        newTask.setChart(associatedChart);
        taskRepository.save(newTask);


        associatedUser.addTask(newTask);
        associatedChart.addTask(newTask);

        userRepository.save(associatedUser);
        ganttChartRepository.save(associatedChart);

    }

    public Iterable<Task> getAllTasksByUser(Integer userId) {
        User found = userRepository.findById(userId).get();
        return found.getAssociatedTasks();
    }

    public Iterable<Task> getAllTasksByChart(Integer chartId) {
        GanttChart found = ganttChartRepository.findById(chartId).get();
        return found.getAssociatedTasks();
    }
}
