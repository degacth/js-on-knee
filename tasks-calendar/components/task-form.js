const taskForm = {
    template: taskFormTpl.innerHTML,
    props: ['newTask'],
    data() {
        return {
            formModel: {},
        }
    },
    watch: {
        newTask() {
            this.form.show()
        }
    },
    mounted() {
        this.form = UIkit.modal('#task-form')
    }
}