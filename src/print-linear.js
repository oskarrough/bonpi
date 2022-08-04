//@ts-check
import getEpsonPrinter from './printer.js'
import dayjs from 'dayjs'

/**
 * Prints either an issue or a comment from a linear webhook.
 * There is only one hook, so we check the action and type to decide what to print.
 * @param {object} data Linear webhook data
 * @returns void
 */
export default async function printLinear({action, type, createdAt, data}) {
	if (action === 'update') return
	if (action === 'remove') return
	if (type === 'Issue') return printIssue(data)
	if (type === 'Comment') return printComment(data)
}

/**
 * Prints a Linear issue
 * @param {object} data Linear webhook data
 * @returns void
 */
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

/**
 * Prints a Linear comment
 * @param {object} data Linear webhook data
 * @returns void
 */
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
	const x = 'hey'
	formatDate
	try {
		let execute = await printer.execute()
	} catch (err) {
		console.log('Print failed', err)
	}
}

/**
 * Formats a date into a readable string.
 * @param {string} date - any type of date is accepted
 * @returns string - readable date
 */
export function formatDate(date) {
	return dayjs(date).format('DD.MM.YYYY HH:mm')
}
