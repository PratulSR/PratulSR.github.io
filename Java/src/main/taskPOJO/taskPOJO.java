import java.util.Date;

public class Task {
    private int taskId;
    private String taskName;
    private String taskDescription;
    private Date startDate;
    private Date endDate;

    public Task(int taskId, String taskName, Date startDate, Date endDate) {
        this.taskId = taskId;
        this.taskName = taskName;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // Getter and setter methods for each field

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}