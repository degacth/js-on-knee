const calendarItem = {
    template: calendarItemTpl,
    props: ['date', 'tasks'],
    data() {
        return {
            maxTasks: 2,
        }
    },
    computed: {
        itemClasses() {
            const isCurrentDate = getISODate(new Date()) === getISODate(this.date)
            return {
                'uk-card-primary': isCurrentDate,
                'uk-card-default': !isCurrentDate,
            }
        }
    },
    methods: {
        addTask() {
            state.newTask = {initDate: this.date}
        },
        limitTasks() {
            return this.tasks && this.tasks.slice(0, this.maxTasks)
        }
    }
}