const calendarSelector = {
    template: calendarSelectorTpl.innerHTML,
    props: ['date'],
    methods: {
        getMonthTitle() {
            return getMonthName(this.date.getMonth())
        },
        nextMonth() {
            state.updateCalendarDateMonth(1)
        },
        prevMonth() {
            state.updateCalendarDateMonth(-1)
        },
        getYear() {
            return this.date.getFullYear()
        },
        prevYear() {
            const date = new Date(this.date)
            date.setFullYear(date.getFullYear() - 1)
            this.date = date
        },
        nextYear() {
            const date = new Date(this.date)
            date.setFullYear(date.getFullYear() + 1)
            this.date = date
        }
    },
}