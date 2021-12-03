<template>
  <calendar-selector :date="date" class="uk-margin-small"></calendar-selector>
  <div class="uk-flex uk-flex-wrap calendar">
    <div v-for="(_, i) in 7" class="calendar-item uk-text-uppercase">
      {{ weekday(i) }}
    </div>
    <div v-for="day in days" class="calendar-item">
      <calendar-item :date="day" v-if="day" :tasks="taskIndex[getIndexKey(day)]"></calendar-item>
    </div>
  </div>
</template>

<script>
import CalendarItem from "./CalendarItem.vue";
import CalendarSelector from "./CalendarSelector.vue";
import {getDaysOfMonth, getFirstWeekday, getWeekdayName} from "../date-utils"

export default {
  props: ["date", "tasks"],
  components: { CalendarItem, CalendarSelector },
  watch: {
    tasks: {
      immediate: true,
      handler() {
        const taskIndex = {};
        for (let i = 0; i < this.tasks.length; i++) {
          const task = this.tasks[i];
          const key = this.getIndexKey(task.date);
          const tasksForDay = taskIndex[key] || [];
          tasksForDay.push(task);
          tasksForDay.sort(this.sortTasks);
          taskIndex[key] = tasksForDay;
        }

        this.taskIndex = taskIndex;
      },
    },
    date: {
      immediate: true,
      handler() {
        const currentDay = this.date;
        const month = currentDay.getMonth();
        const year = currentDay.getFullYear();
        const daysInMonth = getDaysOfMonth(month, year);
        const firstDayIndex = getFirstWeekday(month, year);
        const days = [];
        for (let i = firstDayIndex; i < daysInMonth + firstDayIndex; i++) {
          days[i] = new Date(year, month, i + 1 - firstDayIndex);
        }
        this.days = days;
      },
    },
  },
  methods: {
    weekday(i) {
      return getWeekdayName(i);
    },
    sortTasks(a, b) {
      return a.date.getTime() - b.date.getTime();
    },
    getIndexKey(date) {
      return date.toLocaleDateString();
    },
  },
};
</script>
