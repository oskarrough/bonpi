import {printer as ThermalPrinter} from 'node-thermal-printer'
import {types as PrinterTypes} from 'node-thermal-printer'

export async function getEpsonPrinter() {
	let printer = new ThermalPrinter({
		type: PrinterTypes.EPSON,
		interface: '/dev/usb/lp0',
		characterSet: 'ISO8859_2_LATIN2',
		//removeSpecialCharacters: false,
		//lineCharacter: "="
	})
	try {
		let isConnected = await printer.isPrinterConnected()
	} catch (err) {
		console.log('could not find printer')
	}
	return printer
}

async function printLinear({action, type, createdAt, data}) {
	if (action === 'update') return
	if (action === 'remove') return

	if (type === 'Comment') return printComment(data)
	if (type === 'Issue') return printIssue(data)
}

async function printIssue(data) {
	const printer = await getEpsonPrinter()
	printer.bold(true)
	printer.println(data.title)
	printer.bold(false)
	printer.newLine()
	printer.println(data.description)
	if (data.body) printer.println(data.body)
	if (data.team) {
		const url = `https://linear.app/unicornworkspaces/issue/${data.team.key}-${data.number}/`
		printer.printQR(url)
	}
	printer.cut()
	try {
		let execute = await printer.execute()
	} catch (err) {
		console.log('Print failed', err)
	}
}

async function printComment(data) {
	const printer = await getEpsonPrinter()
	printer.println(`New comment on `)
	printer.bold(true)
	printer.print(data.issue.title)
	printer.bold(false)
	printer.print(` from ${data.user.name} at ${data.createdAt}:`)
	printer.newLine()
	printer.println(data.body)
	try {
		let execute = await printer.execute()
	} catch (err) {
		console.log('Print failed', err)
	}
}

export default printLinear
