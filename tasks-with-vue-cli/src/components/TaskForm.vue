<template>
  <form id="task-form" uk-modal ref="form" @submit.prevent="save">
    <div class="uk-modal-dialog" uk-overflow-auto>
      <div class="uk-modal-header">
        <h2 class="uk-modal-title" v-if="isEditMode()">Редактировать задачу</h2>
        <h2 class="uk-modal-title" v-else>Добавить задачу</h2>
      </div>
      <div class="uk-modal-body">
        <div class="uk-form-horizontal uk-margin-small">
          <div class="uk-margin">
            <label class="uk-form-label" for="task-title"
              >Заголовок задачи</label
            >
            <div class="uk-form-controls">
              <input
                type="text"
                class="uk-input"
                id="task-title"
                required
                v-model="formModel.title"
              />
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label" for="task-description"
              >Описание задачи</label
            >
            <div class="uk-form-controls">
              <textarea
                class="uk-textarea"
                id="task-description"
                v-model="formModel.description"
              ></textarea>
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label" for="task-date">Дата исполнения</label>
            <div class="uk-form-controls">
              <input
                type="date"
                class="uk-input uk-width-1-2"
                id="task-date"
                required
                v-model="formModel.date"
              />
              <input
                type="number"
                min="0"
                max="23"
                class="uk-input uk-width-1-4"
                required
                v-model="formModel.hours"
              />
              <input
                type="number"
                min="0"
                max="59"
                class="uk-input uk-width-1-4"
                required
                v-model="formModel.minutes"
              />
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label">Закончена</label>
            <div class="uk-form-controls uk-form-controls-text">
              <label
                ><input
                  type="radio"
                  class="uk-radio"
                  name="finished"
                  v-model="formModel.finished"
                  :value="true"
                />
                Да</label
              >
              <br />
              <label
                ><input
                  type="radio"
                  class="uk-radio"
                  name="finished"
                  v-model="formModel.finished"
                  :value="false"
                />
                Нет</label
              >
            </div>
          </div>
        </div>
      </div>

      <div class="uk-modal-footer uk-text-right">
        <button
          class="uk-button uk-button-default uk-modal-close"
          type="button"
        >
          Отмена
        </button>
        <button
          class="uk-button uk-button-danger"
          type="button"
          v-if="isEditMode()"
          @click="removeTask()"
        >
          Удалить
        </button>
        <button
          class="uk-button uk-button-primary"
          type="submit"
          :disabled="$refs.form && !$refs.form.checkValidity()"
        >
          Сохранить
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import {modal} from 'uikit'
import {Task, state} from "../state"
import {getISODate} from "../date-utils"

export default {
  props: ["newTask", "editTask"],
  data() {
    return {
      formModel: {},
      actionType: "",
      addType: "add",
      editType: "edit",
    };
  },
  watch: {
    newTask() {
      const date = new Date(this.newTask.initDate);
      const currentDate = new Date();
      date.setMinutes(currentDate.getMinutes());
      date.setHours(currentDate.getHours());
      const emptyTask = new Task(date);
      this.openFormForModel(this.addType, emptyTask);
    },
    editTask() {
      this.openFormForModel(this.editType, this.editTask.task);
    },
  },
  mounted() {
    this.form = modal("#task-form");
  },
  methods: {
    save() {
      switch (this.actionType) {
        case this.addType:
          state.addTask(this.formModel);
          break;
        case this.editType:
          state.updateTask(this.formModel, this.editTask.task);
          break;
        default:
          console.error("unsupported form mode: " + this.actionType);
      }
      this.form.hide();
    },
    isEditMode() {
      return this.actionType === this.editType;
    },
    initFormModel(model) {
      this.formModel = {
        title: model.title,
        description: model.description,
        finished: model.finished,
        date: getISODate(model.date),
        hours: model.date.getHours(),
        minutes: model.date.getMinutes(),
      };
    },
    async openFormForModel(actionType, model) {
      this.actionType = actionType;
      this.initFormModel(model);
      this.form.show();
      await this.$nextTick();
      this.$forceUpdate();
    },
    removeTask() {
      state.removeTask(this.editTask.task);
      this.form.hide();
    },
  },
};
</script>
