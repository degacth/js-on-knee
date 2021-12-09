<template>
  <form class="uk-flex uk-flex-column uk-height-1-1" @submit.prevent="save">
    <record-configuration :config="config" class="uk-flex uk-flex-column uk-height-1-1 uk-overflow-auto" />

    <div class="uk-margin-small">
      <button class="uk-button uk-button-small uk-button-primary" id="configuration-save">save</button>
      <router-link :to="{ name: 'main-menu' }" class="uk-button">cancel</router-link>
    </div>
  </form>
</template>

<script>
import RecordConfiguration from '../components/configuration/RecordConfiguration.vue'
import * as _ from 'lodash'
import {settings} from '../platform'

export default {
  components: {RecordConfiguration},
  data() {
    return {
      config: {}
    }
  },
  methods: {
    async save() {
      await settings.saveGlobalConfig(this.config)
      this.$router.push({name: 'main-menu'})
    }
  },
  async created() {
    this.config = _.cloneDeep(await settings.globalConfig())
  }
}
</script>