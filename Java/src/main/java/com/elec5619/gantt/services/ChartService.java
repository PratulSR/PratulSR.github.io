package com.elec5619.gantt.services;


import com.elec5619.gantt.DTO.frappeDTO;
import com.elec5619.gantt.tables.task.Task;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.elec5619.gantt.DTO.ganttDTO;
import com.elec5619.gantt.tables.ganttChart.GanttChart;
import com.elec5619.gantt.tables.ganttChart.GanttChartRepository;
import com.elec5619.gantt.tables.user.User;
import com.elec5619.gantt.tables.user.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChartService {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private GanttChartRepository ganttChartRepository;

  public ChartService() {

  }

  public Iterable<GanttChart> getAllCharts() {
    return ganttChartRepository.findAll();
  }

  public Integer addChart(ganttDTO chartDetails) {
    User found = userRepository.findById(chartDetails.getUserId()).get();
    GanttChart newChart = new GanttChart(chartDetails.getChartName(), chartDetails.getDescription(), chartDetails.getCategory());

    newChart.addUser(found);
    ganttChartRepository.save(newChart);
    found.addChart(newChart);
    userRepository.save(found);

    return newChart.getChartId();
  }

  public Iterable<GanttChart> getAllChartsByUser(Integer userId) {
    User found = userRepository.findById(userId).get();

    return found.getOwnedCharts();
  }

  public Iterable<String> getAllTasksToFrappe(Integer chartId) {
    GanttChart found = ganttChartRepository.findById(chartId).get();

    List<frappeDTO> dtoList = new ArrayList<>();
    List<Task> chartTasks = found.getAssociatedTasks();

    for (Task task : chartTasks) {
      frappeDTO dtoRep = new frappeDTO(task.getId().toString(), task.getName(),task.getStart_time().toStringRfc3339(),
        task.getEnd_time().toStringRfc3339(), task.getPriority());

      dtoList.add(dtoRep);
    }


    // Create an ObjectMapper
    ObjectMapper objectMapper = new ObjectMapper();
    List<String> jsonList = new ArrayList<>();

    for (frappeDTO dto: dtoList) {
      try {
        // Serialize the DTO to a JSON string
        String json = objectMapper.writeValueAsString(dto);
        jsonList.add(json);
      } catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    }

    return jsonList;
    

  }


}
