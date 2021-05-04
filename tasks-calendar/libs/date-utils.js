function assertEquals(actual, expected) {
    console.assert(actual === expected, 'Ошибка проверки: значения не равны ' + actual + ' != ' + expected)
}

function getDaysOfMonth(month, year) {
    return new Date(year, month + 1, 0).getDate()
}

assertEquals(getDaysOfMonth(0, 2021), 31)
assertEquals(getDaysOfMonth(1, 2021), 28)
assertEquals(getDaysOfMonth(3, 2021), 30)
assertEquals(getDaysOfMonth(2, 2021), 31)
assertEquals(getDaysOfMonth(1, 2020), 29)
assertEquals(getDaysOfMonth(11, 1200), 31)

function getFirstWeekday(month, year) {
    return new Date(year, month, 1).getUTCDay()
}

assertEquals(getFirstWeekday(4, 2021), 5)
assertEquals(getFirstWeekday(5, 2021), 1)
assertEquals(getFirstWeekday(10, 2021), 0)
assertEquals(getFirstWeekday(7, 2021), 6)

function getWeekdayName(index) {

}

assertEquals(getWeekdayName(0), 'понедельник')
assertEquals(getWeekdayName(1), 'вторник')
assertEquals(getWeekdayName(6), 'воскресенье')