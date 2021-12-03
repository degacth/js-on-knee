<template>
  <div class="uk-card uk-card-small uk-card-hover uk-margin-small-top" :class="itemClasses">
    <div class="uk-card-header">
      <div class="uk-card-title">
        <button class="uk-icon-link" uk-icon="plus-circle" @click="addTask"></button>
        <span class="uk-float-right uk-text-bold">{{ date.getDate() }}</span>
      </div>
    </div>
    <div class="uk-card-body" v-if="tasks && tasks.length">
      <ul class="uk-list">
        <li v-for="task in limitTasks()">
          <div class="uk-text-truncate">
            <a
              :title="task.title"
              :class="getTitleClasses(task)"
              @click.prevent="state.setEditTask(task)"
              >{{ task.title }}</a>
          </div>
        </li>
        <li class="show-all-tasks" v-if="tasks.length > maxTasks">
          <a class="uk-badge" @click.prevent="showTasks">{{ tasks.length }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {state} from "../state"
import {getISODate} from "../date-utils"

export default {
  props: ["date", "tasks"],
  data() {
    return {
      state,
      maxTasks: 2,
      taskFinishedTitle: {
        "uk-text-muted": true,
        "text-line-through": true,
      },
    };
  },
  computed: {
    itemClasses() {
      const isCurrentDate = getISODate(new Date()) === getISODate(this.date);
      return {
        "uk-card-primary": isCurrentDate,
        "uk-card-default": !isCurrentDate,
      };
    },
  },
  methods: {
    addTask() {
      state.newTask = { initDate: this.date };
    },
    limitTasks() {
      return this.tasks && this.tasks.slice(0, this.maxTasks);
    },
    getTitleClasses(task) {
      if (task.finished) {
        return this.taskFinishedTitle;
      }
    },
    showTasks() {
      state.showTasks = this.tasks.concat([]);
    },
  },
};
</script>
