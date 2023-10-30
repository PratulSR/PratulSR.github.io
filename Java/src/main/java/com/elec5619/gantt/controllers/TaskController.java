package com.elec5619.gantt.controllers;


import com.elec5619.gantt.DTO.taskDTO;
import com.elec5619.gantt.services.TaskService;
import com.elec5619.gantt.tables.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class TaskController {

    @Autowired
    private TaskService taskService = new TaskService();


    @PostMapping(path = "/task/add")
    @CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080" })
    public @ResponseBody void addNewTask(@RequestBody taskDTO taskDetails) {
        taskService.addTask(taskDetails);
    }

    @GetMapping(path = "/task/all")
    @CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080" })
    public @ResponseBody Iterable<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping(path = "/task/chart/{chartId}")
    @CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080" })
    public @ResponseBody Iterable<Task> getAllTasksByChart(@PathVariable Integer chartId) {
        return taskService.getAllTasksByChart(chartId);
    }

    @GetMapping(path = "/task/user/{userId}")
    @CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080" })
    public @ResponseBody Iterable<Task> getAllTasksByUser(@PathVariable Integer userId) {
        return taskService.getAllTasksByUser(userId);
    }
}
