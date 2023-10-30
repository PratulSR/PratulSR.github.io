package com.elec5619.gantt.tables.task;

import com.elec5619.gantt.tables.task.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Integer> {
}
