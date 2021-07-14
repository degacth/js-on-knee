<template>
  <form class="uk-width-1-2" @submit.prevent="submit">
    <label class="uk-form-label" for="form-username">
      <h4>Ваше имя</h4>
    </label>

    <div class="uk-form-controls">
      <div class="uk-inline">
        <span class="uk-form-icon" uk-icon="icon: user"></span>
        <input class="uk-input" type="text" id="form-username" v-model="username" autofocus required />
      </div>

      <button class="uk-button uk-button-primary">
        <span uk-icon="sign-in"></span>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {username: ''}
  },
  methods: {
    submit() {
      this.$router.push(`/${this.username}`)
    },
  },
}
</script>
