<template>
  <form class="uk-form-stacked uk-height-1-1" @submit.prevent="rec">
    <fieldset class="uk-fieldset uk-height-1-1 uk-flex uk-flex-column">
      <legend class="uk-legend">Create new record</legend>

      <div class="uk-margin">
        <label class="uk-form-label" for="record-start-url">Start url</label>
        <div class="uk-form-controls">
           <input class="uk-input uk-form-small"
                  v-model="startUrl"
                  :pattern="urlPattern"
                  ref="startUrl"
                  :class="getValidateClassOfStartUrl()"
                  id="record-start-url"
                  type="text"
                  required
                  placeholder="https://start.url" />
        </div>
      </div>

      <record-configuration :config="config" class="uk-height-1-1 uk-overflow-auto" />

      <div class="uk-margin">
        <button class="uk-button uk-button-danger uk-button-small uk-width-1-4" id="new-record-start">rec</button>
        <button @click="cancel" class="uk-button uk-button-default uk-button-small uk-width-1-4" type="button">cancel</button>
      </div>
    </fieldset>
  </form>
</template>

<script>
import RecordConfiguration from '../components/configuration/RecordConfiguration.vue'
import {clipboard, settings} from '../platform'
import * as _ from 'lodash'

const urlPattern = '[a-z]{2,10}://.+'
const urlRegex = new RegExp(urlPattern)

export default {
  components: {RecordConfiguration},
  data() {
    const clipboardText = clipboard.readText()
    const startUrl = urlRegex.test(clipboardText) ? clipboardText : ''

    return {startUrl, urlPattern, config: {}}
  },
  methods: {
    getValidateClassOfStartUrl() {
      return {
        'uk-form-danger': this.$refs.startUrl && !this.$refs.startUrl.checkValidity()
      }
    },
    cancel() {
      this.$router.go(-1)
    },
    rec() {
      this.$router.push({
        name: 'progress-record',
        params: {startUrl: this.startUrl},
        query: {config: JSON.stringify(this.config)},
      })
    }
  },
  async created() {
    this.config = _.cloneDeep(await settings.globalConfig())
  }
}
</script>
