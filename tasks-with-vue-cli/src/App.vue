<template>
  <calendar :date="calendarDate" :tasks="tasks" />
  <task-form :new-task="newTask" :edit-task="editTask" />
  <task-list :tasks="showTasks" />
</template>

<script>
import Calendar from "./components/Calendar.vue";
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";
import { state } from "./state";

export default {
  data() {
    return state;
  },
  components: { Calendar, TaskForm, TaskList },
};
</script>

<style src="uikit/dist/css/uikit.min.css"></style>
<style lang="stylus">
.calendar-item
  width: calc((100% / 7));

.show-all-tasks
  position: absolute;
  top: 38px;
  left: 20px;

.text-line-through
  text-decoration: line-through;
</style>
