const app = {
    components: {
        calendar,
        taskForm,
        tasksList,
    },
    data() {
        return state
    }
}
const vueApp = Vue.createApp(app)
vueApp.config.globalProperties.$state = state
vueApp.mount('#app')
