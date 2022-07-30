//@ts-check
import getEpsonPrinter from './printer.js'

/**
 * Print a message and/or a QR code to a url.
 * @param {object} config 
 * @property {string} msg - the message string to be printed
 * @property {string} url - the url string to be printed as a QR code
 */
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
