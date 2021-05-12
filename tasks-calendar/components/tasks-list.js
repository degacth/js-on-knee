const tasksList = {
    template: tasksListTpl,
    props: ['tasks'],
    mounted() {
        this.modal = UIkit.modal('#tasks-list')
    },
    watch: {
        tasks() {
            this.modal.show()
        }
    }
}