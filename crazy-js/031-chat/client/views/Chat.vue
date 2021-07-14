<template>
  <div class="uk-flex uk-flex-column uk-width-1-1 uk-height-1-1">
    <div>
      <div class="uk-card uk-card-small uk-card-secondary uk-card-hover">
        <div class="uk-card-body">
          <router-link to="/" class="uk-float-right">
            <span uk-icon="sign-out"></span>
          </router-link>
          <div class="uk-width-1-2 username">
            {{ username }}
          </div>
        </div>
      </div>
    </div>
    <div class="messages uk-width-1-1 uk-height-1-1 uk-overflow-auto" ref="messages">
      <div class="uk-placeholder">
        <p v-if="!messages.length" class="uk-text-center">
          Пока никто не написал
        </p>
        <ul class="uk-list">
          <li v-for="(m, i) in messages" :key="i" class="uk-animation-shake">
            <div class="message-user uk-text-bold uk-text-capitalize">{{ m.username }}</div>
            <p class="message-text uk-margin-remove uk-text-default">{{ m.text }}</p>

            <span class="uk-text-meta uk-text-small">{{ new Date(m.date).toLocaleString() }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="uk-width-1-1">
      <form @submit.prevent="submit" uk-grid class="uk-grid-collapse">
        <div class="uk-width-5-6">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="comment"></span>
            <input class="uk-input"
                   id="form-message"
                   type="text"
                   v-model="message"
                   autofocus
                   required />
          </div>
        </div>
        <div class="uk-width-1-6">
          <button class="uk-button uk-button-primary uk-width-1-1">
            <span uk-icon="comment"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { addMessage, connect, disconnect } from '../store';

export default {
  created() {
    this.$store.dispatch(connect, this.username)
  },
  unmounted() {
    this.$store.dispatch(disconnect)
  },
  data() {
    return {
      username: this.$route.params.username,
      message: '',
    };
  },
  computed: mapState(['messages']),
  watch: {
    messages() {
      const el = this.$refs['messages']
      setTimeout(() => el.scrollTop = el.scrollHeight)
    }
  },
  methods: {
    submit() {
      this.$store.dispatch(addMessage, this.message)
      this.message = ''
    },
  },
}
</script>
