const calendar = {
    template: calendarTpl.innerHTML,
    components: {
        calendarSelector,
    },
    data() {
        const currentDay = new Date()
        const month = currentDay.getMonth()
        const year = currentDay.getFullYear()
        const daysInMonth = getDaysOfMonth(month, year)
        const firstDayIndex = getFirstWeekday(month, year)
        const days = []
        for (let i = firstDayIndex; i < daysInMonth + firstDayIndex; i++) {
            days[i] = i + 1 - firstDayIndex
        }
        return {
            days,
        }
    },
    methods: {
        weekday(i) {
            return getWeekdayName(i)
        }
    }
}
