//@ts-check
import {printer as ThermalPrinter} from 'node-thermal-printer'
import {types as PrinterTypes} from 'node-thermal-printer'

/**
 * Sets up a connection to a specific Epson thermal printer.
 * @returns a new instance of ThermalPrinter
 */

export default async function getEpsonPrinter() {
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
		console.log('Could not connect to printer', err.message)
	}

	return printer
}
