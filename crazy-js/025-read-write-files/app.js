const fs = require('fs/promises')

const db = 'tasks.db'
const encoding = 'utf-8'
const mode = { read: 'a+', write: 'w' }
const withFile = async (fileName, mode, callback) => {
	const handler = await fs.open(fileName, mode)
	try {
		return await callback(handler)
	}
	finally {
		handler.close()
	}
}

/*
	parseArgs('search hello --all') === {args: ['search', 'hello'], options: {all: true}}
*/
const parseArgs = args => args.reduce((acc, item) => {
	if (item.startsWith('--')) {
		const [key, value] = item.split('=')
		acc.options[key.replace(/^-+/, '')] = value || true
		return acc
	}

	acc.args.push(item)
	return acc
}, { options: {}, args: []})

const tasksUI = {
	showTasks(tasks) {
		tasks.forEach(task => console.log('%s ' + this.showTaskFormat(task), task.id, task.task))
	},

	showTaskFormat(task) {
		if (!task.done) return '\x1b[31m%s\x1b[0m'
		return '\x1b[32m%s\x1b[0m'
	},

	shouldShow: all => t => !t.done || all,

	unknownIdError(id) {
		return new Error('Unknown task with id ' + id)
	},
}

const commands = {
	async add(tasks, {args: [task]}) {
		if (!task) throw new Error('Params has no task')

		const id = tasks.map(t => t.id).sort().reverse()[0] + 1 || 1
		tasks.push({task, id, done: false})
		return tasks
	},

	list(tasks, {options: {all}}) {
		tasksUI.showTasks(tasks.filter(tasksUI.shouldShow(all)))
	},

	done(tasks, {args: [id]}) {
		const task = tasks.find(t => t.id === +id)
		if (!task) throw tasksUI.unknownIdError(id)
		task.done = true
		return tasks
	},

	search(tasks, {args: [query], options: {all}}) {
		const actual = tasks.filter(tasksUI.shouldShow(all))
		const queryRegExp = new RegExp(query, 'ig')
		tasksUI.showTasks(actual.filter(t => t.task.match(query)))
	},

	rm(tasks, {args: [id]}) {
	},
}

const main = async commandArgs => {
	const commandName = commandArgs.args.shift()
	const command = commands[commandName] || (() => console.log(`Unknown command: ${commandName}`))
	const tasksData = await withFile(db, mode.read, async handler => await handler.readFile(encoding))
	const tasks = tasksData ? JSON.parse(tasksData) : []

	try {
		const newTasks = await command(tasks, commandArgs)
		if (newTasks) await withFile(db, mode.write, async handler => handler.write(
			JSON.stringify(newTasks, null, 2)
		))
	} catch (e) {
		console.error(e.message)
	}
}

main(parseArgs(process.argv.slice(2)))
