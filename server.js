const express = require("express")
const bodyParser = require("body-parser")
const printLinear = require("./index.js")

const app = express()
const port = 3000

// Parse the request body
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send('hello')
})

// Receive HTTP POST requests
app.post("/my-linear-webhook", (req, res) => {
	const payload = req.body
	const { action, data, type, createdAt } = payload

	// Do something neat with the data received!
	console.log(action, type, createdAt, data)
	printLinear({action, type, createdAt, data})

	// Finally, respond with a HTTP 200 to signal all good
	res.sendStatus(200)
})

app.listen(port, () => console.log(`My webhook consumer listening on port ${port}!`))
