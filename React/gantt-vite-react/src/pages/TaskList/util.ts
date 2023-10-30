const TASKS_KEY = "tasks"

interface I_taskItem { name: string, type: "milestone" | "task", time: Date | string, isEdit: boolean, form: { start: Date | string, finish: Date | string, catgory: string, description: string, progress: string }, isSelect: boolean, }

// default values
const defaultTask = [
    {
        name: "Task 2",
        type: "task",
        isEdit: false,
        form: {
            start: "",
            finish: "",
            catgory: "",
            description: "",
            progress: ""
        },
        isSelect: false,
    },
    {
        name: "Task 1",
        type: "task",
        isEdit: false,
        form: {
            start: "",
            finish: "",
            catgory: "",
            description: "",
            progress: ""
        },
        isSelect: false,
    }
]

const readTasks = (): I_taskItem[] => {
    const res = JSON.parse(window.localStorage.getItem(TASKS_KEY) || 'null')
    if (res) {
        return res
    }
    return defaultTask as I_taskItem[]
}

const saveTasks = (tasks: I_taskItem[]) => window.localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))

export {
    readTasks, saveTasks
}
//interface
export type {
    I_taskItem
}