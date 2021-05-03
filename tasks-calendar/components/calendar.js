const calendar = {
    template: calendarTpl.innerHTML,
    data() {
        const currentDay = new Date()
        const month = currentDay.getMonth()
        const year = currentDay.getFullYear()
        const days = getDaysOfMonth(month, year)
        return {
            days,
        }
    }
}
