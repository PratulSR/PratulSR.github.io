package com.elec5619.gantt.controllers;

import com.elec5619.gantt.DTO.ganttDTO;
import com.elec5619.gantt.tables.ganttChart.GanttChart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.elec5619.gantt.services.ChartService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

@RestController
public class ChartController {
    
    @Autowired
    private ChartService chartService = new ChartService();

    @PostMapping(path = "/chart/add")
    @CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080" })
    public @ResponseBody Integer addNewChart(@RequestBody ganttDTO chartDetails) {
        return chartService.addChart(chartDetails);
    }

    @GetMapping(path = "/chart/all")
    @CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080" })
    public @ResponseBody Iterable<GanttChart> getAllCharts() {
        return chartService.getAllCharts();
    }

    @GetMapping(path = "/chart/{userId}")
    @CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080" })
    public @ResponseBody Iterable<GanttChart> getAllChartsByUser(@PathVariable Integer userId) {
        return chartService.getAllChartsByUser(userId);
    }

    @GetMapping(path = "/chart/{chartId}/getTasks")
    @CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080" })
    public @ResponseBody Iterable<String> getTasksOfChart(@PathVariable Integer chartId) {
        return chartService.getAllTasksToFrappe(chartId);
    }
    
}
