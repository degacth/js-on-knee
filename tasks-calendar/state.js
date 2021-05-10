class Task {
    title = ''
    description = ''
    finished = false

    constructor(date) {
        this.date = date
    }
}

function saveTasksToStore(tasks) {
    const tasksString = JSON.stringify(tasks)
    localStorage.setItem('tasks', tasksString)
}

function loadTasksFromStore() {
    let tasks = []
    try {
        tasks = JSON.parse(localStorage.getItem('tasks')) || []
    }
    catch (e) {
        console.error(e)
    }

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i]
        task.date = new Date(task.date)
    }

    return tasks
}

const state = Vue.reactive({
    calendarDate: new Date(),
    newTask: null,
    tasks: loadTasksFromStore(),
    updateCalendarDateMonth(diff) {
        const date = new Date(this.calendarDate)
        date.setMonth(date.getMonth() + diff)
        this.calendarDate = date
    },
    updateCalendarDateYear(diff) {
        const date = new Date(this.calendarDate)
        date.setFullYear(date.getFullYear() + diff)
        this.calendarDate = date
    },
    addTask(formModel) {
        const date = new Date(formModel.date)
        date.setHours(formModel.hours)
        date.setMinutes(formModel.minutes)

        const task = new Task(date)
        task.title = formModel.title
        task.description = formModel.description
        task.finished = formModel.finished

        this.tasks = this.tasks.concat([task])
        saveTasksToStore(this.tasks)
    }
})