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
    const d = new Date('2021-04-05')
    d.setDate(d.getDate() + index)
    return d.toLocaleDateString('ru-RU', {weekday: 'long'})
}

assertEquals(getWeekdayName(0), 'понедельник')
assertEquals(getWeekdayName(1), 'вторник')
assertEquals(getWeekdayName(6), 'воскресенье')

function getMonthName(index) {
    const d = new Date(2020, index, 1)
    return d.toLocaleDateString('ru-RU', {month: 'long'})
}

assertEquals(getMonthName(0), 'январь')
assertEquals(getMonthName(1), 'февраль')
assertEquals(getMonthName(11), 'декабрь')

function getISODate(date) {
    const d = new Date(date)
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
    return d.toISOString().split('T')[0]
}

assertEquals(getISODate(new Date(2020, 1, 29)), '2020-02-29')
assertEquals(getISODate(new Date(2021, 4, 1)), '2021-05-01')

function what(date) {

}

assertEquals(what(new Date(2020, 0, 1)), '00:00:00')
assertEquals(what(new Date(2020, 0, 1, 1)), '01:00:00')
assertEquals(what(new Date(2020, 0, 1, 1, 33)), '01:33:00')
assertEquals(what(new Date(2020, 0, 1, 22, 33, 44)), '22:33:44')
