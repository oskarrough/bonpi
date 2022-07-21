import getEpsonPrinter from './printer.js'
import dayjs from 'dayjs'

export function formatDate(date) {
	return dayjs(date).format('DD.MM.YYYY HH:mm')
}

// Called by the Linear webhook.
// Depending on the data, it attempts to print something useful.
async function printLinear({action, type, createdAt, data}) {
	if (action === 'update') return
	if (action === 'remove') return
	if (type === 'Issue') return printIssue(data)
	if (type === 'Comment') return printComment(data)
}

export async function printIssue(data) {
	const printer = await getEpsonPrinter()
	printer.println(`New issue ${data.team.key}-${data.number}`)
	printer.bold(true)
	printer.println(data.title)
	printer.bold(false)
	printer.println(`${formatDate(data.createdAt)}`)
	printer.println(data.description)
	if (data.body) printer.println(data.body)
	if (data.team) {
		const url = `https://linear.app/unicornworkspaces/issue/${data.team.key}-${data.number}/`
		printer.newLine()
		printer.printQR(url)
	}
	printer.cut()
	try {
		let execute = await printer.execute()
	} catch (err) {
		console.log('Print failed', err)
	}
}

export async function printComment(data) {
	const printer = await getEpsonPrinter()
	printer.print(`New comment on `)
	printer.bold(true)
	printer.print(data.issue.title)
	printer.bold(false)
	printer.newLine()
	printer.print(`${data.user.name} at ${formatDate(data.createdAt)}`)
	printer.newLine()
	printer.println(data.body)
	printer.cut()
	try {
		let execute = await printer.execute()
	} catch (err) {
		console.log('Print failed', err)
	}
}

export default printLinear
