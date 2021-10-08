<template>
  <form class="uk-form-stacked" @submit.prevent="rec">
    <fieldset class="uk-fieldset">
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

      <button class="uk-button uk-button-danger uk-button-small uk-width-1-4">rec</button>
      <button @click="cancel" class="uk-button uk-button-default uk-button-small uk-width-1-4" type="button">cancel</button>
    </fieldset>
  </form>
</template>

<script>
import {clipboard} from '../platform'

const urlPattern = 'http(s)?://.+'
const urlRegex = new RegExp(urlPattern)

export default {
  data() {
    const clipboardText = clipboard.readText()
    const startUrl = urlRegex.test(clipboardText) ? clipboardText : ''

    return {startUrl, urlPattern}
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

    }
  }
}
</script>
