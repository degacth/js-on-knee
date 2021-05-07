const app = {
    components: {
        calendar,
        taskForm,
    },
    data() {
        return state
    }
}
Vue.createApp(app).mount('#app')
