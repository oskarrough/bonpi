import {getEpsonPrinter} from './index.js'

async function printMessage(msg) {
	if (!msg || typeof msg !== 'String') return
	const printer = await getEpsonPrinter()
	printer.println(msg)
	printer.cut()		
	await printer.execute()                      
	process.exit()
}

try {
	const msg = process.argv[2]
	printMessage(msg || false)
} catch (err) {
	console.log('nop', err)
}

