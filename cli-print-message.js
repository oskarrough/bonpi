async function printMessage(msg) {
	if (typeof process.argv[2] === 'String') msg = process.argv[2]
	const printer = await getEpsonPrinter()
	printer.println(msg)
	printer.cut()		
	return await printer.execute()                      
}

module.exports = printMessage

