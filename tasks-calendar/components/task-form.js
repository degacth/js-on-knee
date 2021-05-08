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
            const currentDate = new Date()
            this.formModel = {
                title: '',
                description: '',
                date: getISODate(this.newTask.initDate),
                hours: currentDate.getHours(),
                minutes: currentDate.getMinutes(),
                finished: false,
            }
            this.form.show()
        }
    },
    mounted() {
        this.form = UIkit.modal('#task-form')
    },
    methods: {
        save() {
            state.addTask(this.formModel)
            this.form.hide()
        }
    }
}