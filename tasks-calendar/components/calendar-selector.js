const calendarSelector = {
    template: calendarSelectorTpl.innerHTML,
    data() {
        return {
            date: new Date()
        }
    },
    methods: {
        getMonthTitle() {
            return getMonthName(this.date.getMonth())
        },
        nextMonth() {
            const date = new Date(this.date)
            date.setMonth(date.getMonth() + 1)
            this.date = date
        },
        prevMonth() {
            const date = new Date(this.date)
            date.setMonth(date.getMonth() - 1)
            this.date = date
        }
    },
}