import { reactive } from 'vue'

export class Task {
  constructor(date) {
    this.date = date
    this.title = ''
    this.description = ''
    this.finished = false
  }
}

class TaskManager {
  constructor(url) {
    this.url = url
  }

  async loadTasks() {
    let tasks = []
    try {
      tasks = await (await fetch(tasksUrl)).json()
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

  addTask(task) {
    return this.changeState(task, 'POST')
  }

  updateTask(task) {
    return this.changeState(task, 'PUT', '/' + task.id)
  }

  deleteTask(task) {
    return this.changeState(null, 'DELETE', '/' + task.id)
  }

  changeState(entity, method, urlSuffix = '') {
    const init = {
      headers: {
        'content-type': 'application/json',
      },
      method,
    }
    if (entity) init.body = JSON.stringify(entity)

    return fetch(this.url + urlSuffix, init)
  }
}

const tasksUrl = "http://localhost:3000/tasks"
const manager = new TaskManager(tasksUrl)
manager
  .loadTasks()
  .then(tasks => state.tasks = tasks)

export const state = reactive({
  calendarDate: new Date(),
  newTask: null,
  editTask: null,
  showTasks: [],
  tasks: [],
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
  setEditTask(task) {
    this.editTask = { task }
  },
  async addTask(formModel) {
    const task = new Task(null)
    this.updateTaskWithData(formModel, task)
    await manager.addTask(task)
    this.tasks = await manager.loadTasks()
  },
  async updateTask(formModel, task) {
    this.updateTaskWithData(formModel, task)
    await manager.updateTask(task)
    this.tasks = await manager.loadTasks()
  },
  updateTaskWithData(formModel, task) {
    const taskDate = new Date(formModel.date)
    taskDate.setMinutes(formModel.minutes)
    taskDate.setHours(formModel.hours)

    task.date = taskDate
    task.title = formModel.title
    task.description = formModel.description
    task.finished = formModel.finished
  },
  async removeTask(task) {
    await manager.deleteTask(task)
    this.tasks = await manager.loadTasks()
  }
})
