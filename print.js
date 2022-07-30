import getEpsonPrinter from './printer.js'

export default async function print({msg, url}) {
	console.log('print', msg, url)
	const p = await getEpsonPrinter()
	// await p.printImage('./radiooskar.png')
	if (msg) p.print(msg)
	if (url) {
		p.newLine()
		p.printQR(url)
	}
	p.cut()
	await p.execute()
}
