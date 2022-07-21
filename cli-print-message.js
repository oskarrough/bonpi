import getEpsonPrinter from './printer.js'

// Prints a string.
// usage: node ./cli-send-message.js "hello there"
async function printMessage(msg) {
	if (!msg || typeof msg !== 'string') throw new Error('Missing a string message to print')
	const p = await getEpsonPrinter()
	p.print(msg)
	p.cut()		
	await p.execute()                      
	process.exit()
}

// Call it.
try {
	const msg = process.argv[2]
	printMessage(msg || false)
} catch (err) {
	console.log('Could not print', err)
}

