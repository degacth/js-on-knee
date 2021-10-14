<template>
  <form class="uk-flex uk-flex-column uk-height-1-1" @submit.prevent="save">
    <legend class="uk-legend">Record in progress</legend>

    <div class="uk-height-1-1 uk-width-1-1 uk-flex uk-flex-middle uk-flex-center">
      <div uk-spinner v-if="!currentRecord"></div>
      <ul class="uk-iconnav uk-flex uk-flex-nowrap uk-width-1-1" v-else>
        <li>
          <button class="uk-text-primary"
                  type="button"
                  :hidden="currentRecord.stopped"
                  @click="record.stop"
                  uk-icon="check"></button>

          <button class="uk-text-danger"
                  type="button"
                  :hidden="!currentRecord.stopped"
                  @click="cancel"
                  uk-icon="ban"></button>
        </li>
        <li class="uk-width-1-1">
          <input class="uk-input uk-form-small" v-model="fileName" />
        </li>
        <li><button class="uk-text-primary" uk-icon="pull" :disabled="!currentRecord.stopped"></button></li>
      </ul>
    </div>
  </form>
</template>

<script>
import {record} from '../platform'

export default {
  data() {
    const startUrl = this.$route.params.startUrl
    const fileName = startUrl.replace(/\w+:\/\/([^\/]+).*/g, '$1')

    return {startUrl, fileName, record, currentRecord: null}
  },
  async created() {
    this.currentRecord = await record.start(this.startUrl)
    record.watch(this.onRecordStopped)
  },
  methods: {
    onRecordStopped() {
      this.currentRecord.stopped = true
    },
    async cancel() {
      await record.cancel()
      this.$router.push({name: 'main-menu'})
    },
    async save() {
      const path = await record.save(this.fileName)
      if (!path) return
      this.$router.push({name: 'main-menu'})
    }
  }
}
</script>