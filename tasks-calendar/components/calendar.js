const calendar = {
    template: calendarTpl.innerHTML,
    props: ['date', 'tasks'],
    components: {
        calendarSelector,
        calendarItem,
    },
    watch: {
        tasks: {
            immediate: true,
            handler() {
                const taskIndex = {}
                for (let i = 0; i < this.tasks.length; i++) {
                    const task = this.tasks[i]
                    const key = this.getIndexKey(task.date)
                    const tasksForDay = taskIndex[key] || []
                    tasksForDay.push(task)
                    tasksForDay.sort(this.sortTasks)
                    taskIndex[key] = tasksForDay
                }

                this.taskIndex = taskIndex
            }
        },
        date: {
            immediate: true,
            handler() {
                const currentDay = this.date
                const month = currentDay.getMonth()
                const year = currentDay.getFullYear()
                const daysInMonth = getDaysOfMonth(month, year)
                const firstDayIndex = getFirstWeekday(month, year)
                const days = []
                for (let i = firstDayIndex; i < daysInMonth + firstDayIndex; i++) {
                    days[i] = new Date(year, month, i + 1 - firstDayIndex)
                }
                this.days = days
            }
        },
    },
    methods: {
        weekday(i) {
            return getWeekdayName(i)
        },
        sortTasks(a, b) {
            return a.date.getTime() - b.date.getTime()
        },
        getIndexKey(date) {
            return date.toLocaleDateString()
        }
    }
}
