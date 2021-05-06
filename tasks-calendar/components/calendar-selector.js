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
            state.updateCalendarDateYear(-1)
        },
        nextYear() {
            state.updateCalendarDateYear(1)
        }
    },
}