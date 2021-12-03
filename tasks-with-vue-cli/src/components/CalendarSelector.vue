<template>
  <div class="uk-width-1-3 uk-margin-small-top">
    <a class="uk-icon-button uk-margin-small-right"
       uk-icon="list"
       @click.prevent="$state.showTasks = [...$state.tasks]"></a>

    <button class="uk-margin-small-right"
            uk-icon="chevron-left"
            @click="prevMonth"></button>
    <span class="uk-text-bold uk-text-center uk-text-uppercase uk-width-1-6 uk-inline-block">
      {{ getMonthTitle() }}
    </span>
    <button class="uk-margin-small-left"
            uk-icon="chevron-right"
            @click="nextMonth"></button>

    <button class="uk-margin-small-right"
            uk-icon="chevron-left"
            @click="prevYear"></button>
    <span class="uk-text-bold uk-text-center uk-text-uppercase uk-width-1-6 uk-inline-block">
      {{ getYear() }}
    </span>
    <button class="uk-margin-small-left"
            uk-icon="chevron-right"
            @click="nextYear"></button>
  </div>
</template>

<script>
import {getMonthName} from "../date-utils"
import {state} from "../state"

export default {
  props: ["date"],
  methods: {
    getMonthTitle() {
      return getMonthName(this.date.getMonth());
    },
    nextMonth() {
      state.updateCalendarDateMonth(1);
    },
    prevMonth() {
      state.updateCalendarDateMonth(-1);
    },
    getYear() {
      return this.date.getFullYear();
    },
    prevYear() {
      state.updateCalendarDateYear(-1);
    },
    nextYear() {
      state.updateCalendarDateYear(1);
    },
  },
};
</script>