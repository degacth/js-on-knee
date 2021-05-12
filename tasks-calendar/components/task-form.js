const taskForm = {
    template: taskFormTpl.innerHTML,
    props: ['newTask', 'editTask'],
    data() {
        return {
            formModel: {},
            actionType: '',
            addType: 'add',
            editType: 'edit',
        }
    },
    watch: {
        newTask() {
            const date = new Date(this.newTask.initDate)
            const currentDate = new Date()
            date.setMinutes(currentDate.getMinutes())
            date.setHours(currentDate.getHours())
            const emptyTask = new Task(date)
            this.openFormForModel(this.addType, emptyTask)
        },
        editTask() {
            this.openFormForModel(this.editType, this.editTask.task)
        }
    },
    mounted() {
        this.form = UIkit.modal('#task-form')
    },
    methods: {
        save() {
            switch (this.actionType) {
                case this.addType:
                    state.addTask(this.formModel)
                    break
                case this.editType:
                    state.updateTask(this.formModel, this.editTask.task)
                    break
                default:
                    console.error('unsupported form mode: ' + this.actionType)
            }
            this.form.hide()
        },
        isEditMode() {
            return this.actionType === this.editType
        },
        initFormModel(model) {
            this.formModel = {
                title: model.title,
                description: model.description,
                finished: model.finished,
                date: getISODate(model.date),
                hours: model.date.getHours(),
                minutes: model.date.getMinutes(),
            }
        },
        async openFormForModel(actionType, model) {
            this.actionType = actionType
            this.initFormModel(model)
            this.form.show()
            await this.$nextTick()
            this.$forceUpdate()
        },
        removeTask() {
            state.removeTask(this.editTask.task)
            this.form.hide()
        }
    }
}