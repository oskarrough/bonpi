import express from 'express'
import bodyParser from 'body-parser'
import printLinear from './index.js'
import print from './print.js'

const app = express()
const port = 3000

// Parse the request body
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send('hello')
})

// Receive HTTP POST requests
app.post('/my-linear-webhook', (req, res) => {
	const payload = req.body
	const {action, data, type, createdAt} = payload

	// Do something neat with the data received
	console.log(action, type, createdAt, data)
	printLinear({action, type, createdAt, data})

	// Finally, respond with a HTTP 200 to signal all good
	res.sendStatus(200)
})

app.post('/print', async (req, res) => {
	if (req.method !== 'POST') return res.sendStatus(400)
	const {msg, url} = req.body
	if (!msg && !url)
		return res
			.status(400)
			.send({error: 'Missing "msg" or "url" in body to print'})
	print({msg, url})
	res.sendStatus(200)
})

app.listen(port, () => console.log(`My server is listening on port ${port}`))
