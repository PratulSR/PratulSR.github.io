import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class GanttChart {
    private List<Task> tasks;

    public GanttChart(List<Task> tasks) {
        this.tasks = tasks;
    }

    // Getter and setter methods for the tasks list

    public List<Task> getTasks() {
        // Sort the tasks based on start dates before returning them
        Collections.sort(tasks, Comparator.comparing(Task::getStartDate));
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    // Additional methods for managing tasks in the Gantt chart
    public void addTask(Task task) {
        tasks.add(task);
    }

    public void removeTask(Task task) {
        tasks.remove(task);
    }
}
