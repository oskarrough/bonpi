import print from './print.js'

// Allows you to do this: node cli-print-message.js "hello there"
try {
	const msg = process.argv[2]
	const url = process.argv[3]
	print({msg, url})
	process.exit()
} catch (err) {
	console.log('Could not print', err)
	process.exit(1)
}
